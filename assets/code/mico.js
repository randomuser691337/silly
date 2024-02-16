function initializePeerConnection() {
    console.log('<i> Starting PeerJS migrator...');
    backupdb();
    const customId = gen(5); // Set your desired custom ID here
    const peer = new Peer(customId); // Pass the custom ID when creating the Peer instance
    let connection;
    let myid = undefined;

    peer.on('open', (id) => {
        myid = id;
        document.getElementById('codemig').innerText = id;
        console.log('<i> Opened PeerJS migrator! Waiting...');
    });

    peer.on('connection', (conn) => {
        const lobotomi = document.getElementById('lobotomy');
        if (lobotomi) {
            lobotomi.innerHTML = "Migrating, please wait..."
        }
        console.log('<i> Connection started.');
        conn.on('data', (data) => {
            console.log('Received data:', data); // Log the received data
            const receivedData = JSON.parse(data.chunk); // Parse the received data
            console.log('<i> Database:', receivedData);
            backupDataVariable = receivedData;
            console.log('<i> Migration data received!');
            restoredb();
        });
    
        connection = conn;
    });    

    document.getElementById('connectButton').addEventListener('click', () => {
        const peerIdInput = document.getElementById('peerIdInput');
        const otherPeerId = peerIdInput.value;
        if (!otherPeerId) {
            mkw('<p>Missing ID! Please enter one.</p>', 'Error')
            return;
        }
    
        // Attempt to connect to the other peer
        const newConnection = peer.connect(otherPeerId);
        newConnection.on('open', () => {
            console.log('Connected to peer:', otherPeerId);
            connection = newConnection;
    
            // Pass the connection object to sendChunks function
            sendChunks(backupDataVariable, CHUNK_SIZE, connection);
        });
    
        newConnection.on('error', (err) => {
            console.error('Error connecting to peer:', err);
            mkw(`<p>Couldn't connect to other WebDesk.</p><p>Check your ID, and make sure you're on the same network as the other WebDesk.</p>`, 'Error', '300px');
        });
    });
    
}

const CHUNK_SIZE = 1024 * 1024; // Chunk size in bytes (1MB)

async function sendChunks(data, chunkSize, connection) {
    const totalChunks = Math.ceil(data.length / chunkSize);
    for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = (i + 1) * chunkSize;
        const chunk = data.substring(start, end);
        console.log('Sending chunk:', chunk); // Log the chunk before sending
        try {
            await connection.send({ chunk, index: i, totalChunks }); // Remove JSON.stringify
            console.log(`Sent chunk ${i + 1}/${totalChunks}`);
        } catch (error) {
            console.error(`Error sending chunk ${i + 1}/${totalChunks}: ${error}`);
            // Handle retry or other error handling mechanisms
        }
    }
}

let backupDataVariable;

async function backupdb() {
    if (crashed == true) { console.log('Rejected FS action: crashed!'); return; } else {
        try {
            const db = await initDB();
            const transaction = db.transaction('settings', 'readonly');
            const objectStore = transaction.objectStore('settings');
            const request = objectStore.getAll();

            request.onsuccess = (event) => {
                const variables = event.target.result;
                backupDataVariable = JSON.stringify(variables); // Store backup data in a variable
            };

            request.onerror = (event) => {
                console.error("[ERR] Error fetching variables: " + event.target.errorCode);
            };
        } catch (error) {
            console.error(error);
        }
    }
}

async function restoredb() {
    if (crashed == true) { console.log('Can not finish restore: Panic!'); return; } else {
        try {
            console.log('<i> Restoring database!');
            const variables = JSON.parse(backupDataVariable);

            const db = await initDB();
            const transaction = db.transaction('settings', 'readwrite');
            const objectStore = transaction.objectStore('settings');
            objectStore.clear();
            for (const variable of variables) {
                objectStore.put(variable);
            }

            fesw('mig', 'mdone');
            const rec = await readvar('recovery');
            if (rec === "y") {
                // Don't copy the same issue if migrated from recovery, see recovery() and the onload in index.html.
                console.log(`<i> Avoid copying WebAIDS to the new WebDesk.`);
                delvar('recovery'); delvar('bootload'); delvar('auto-open'); delvar('cache'); delvar('panic');
            }
            console.log('<i> Restored successfully.');
        } catch (error) {
            console.error(`<!> ${error}`);
        }
    }
}
