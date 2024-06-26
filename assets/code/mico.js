function initializePeerConnection() {
    backupdb();
    const customId = gen(4); // Set your desired custom ID here
    const peer = new Peer(customId); // Pass the custom ID when creating the Peer instance
    let connection;
    let myid = undefined;

    peer.on('open', (id) => {
        myid = id;
        document.getElementById('codemig').innerText = id;
    });

    peer.on('connection', (conn) => {
        document.getElementById('lobotomy').innerHTML = "Migrating, please wait..."
        conn.on('data', (data) => {
            console.log('Received:', data);
            backupDataVariable = data;
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
            connection.send(backupDataVariable, function () {
                mkw('<p>Migrated successfully.</p><p>Everything should be just how you had it!</p><button class="b1">Erase This WebDesk</button>', 'Migration Complete', '250px');
            });
        });

        newConnection.on('error', (err) => {
            console.error('Error connecting to peer:', err);
            mkw(`<p>Couldn't connect to other WebDesk.</p><p>Check your ID, and make sure you're on the same network as the other WebDesk.</p>`, 'Error', '300px');
        });
    });
}

// Call this function whenever you want to initialize the Peer connection
initializePeerConnection();
