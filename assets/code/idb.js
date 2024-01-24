// huge pile of shit mixed with decent code
// if you have any optimizations/better code for this pls dm me: @illchangethislater on discord

const DB_NAME = "WebDeskStore";
const STORE_NAME = "WebDeskDB";
let NTName = "database"; // Default value

// Check if the "db" URL parameter is present
const urlParams = new URLSearchParams(window.location.search);
const dbParam = urlParams.get("db");

if (dbParam) {
    NTName = dbParam;
} else {
    console.log(`[NTE] In the database utility or WebDesk doesn't have a db variable defined.`);
}
// Open IndexedDB
// Initialize the IndexedDB
let dbPromise = null;

function initDB() {
    if (dbPromise) {
        return dbPromise;
    }

    dbPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const request = indexedDB.open(NTName, 1);

            request.onerror = (event) => {
                reject("[CRT] Error opening the database: " + event.target.errorCode);
                panic('Database could not be opened, crash!');
            };

            request.onsuccess = (event) => {
                const db = event.target.result;
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                const objectStore = db.createObjectStore('settings', { keyPath: 'name' });
                objectStore.transaction.oncomplete = () => {
                    resolve(db);
                };
            };
        }, 500);
    });

    return dbPromise;
}


// Read a variable from the database
async function readvar(varName) {
    try {
        const db = await initDB();
        const transaction = db.transaction('settings', 'readonly');
        const objectStore = transaction.objectStore('settings');
        const request = objectStore.get(varName);

        return new Promise((resolve, reject) => {
            request.onsuccess = (event) => {
                resolve(event.target.result ? event.target.result.value : undefined);
            };

            request.onerror = (event) => {
                reject("[ERR] Error reading variable: " + event.target.errorCode);
            };
        });
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

// Write a variable to the database
async function writevar(varName, value) {
    try {
        const db = await initDB();
        const transaction = db.transaction('settings', 'readwrite');
        const objectStore = transaction.objectStore('settings');
        objectStore.put({ name: varName, value });
        transaction.onerror = (event) => {
            console.error("[ERR] Error writing variable: " + event.target.errorCode);
        };
    } catch (error) {
        console.error(error);
    }
}

async function deletevar(varName) {
    try {
        const db = await initDB();
        const transaction = db.transaction('settings', 'readwrite');
        const objectStore = transaction.objectStore('settings');
        objectStore.delete(varName);
        transaction.onerror = (event) => {
            console.error("[ERR] Error deleting variable: " + event.target.errorCode);
        };
    } catch (error) {
        console.error(error);
    }
}

async function eraseall() {
    try {
        const db = await initDB();
        indexedDB.deleteDatabase(NTName);
        console.log('[OK] Erased container successfully.');
    } catch (error) {
        console.error(error);
    }
}

async function burnitall() {
    try {
        await eraseall();
        stm('<p>Erase completed. Auto-rebooting in 3s...</p><button class="b1" onclick="window.location.reload();">Reboot</button>', 'Erase Assistant', '200px');
        setTimeout(reboot, 3000);
        console.log('[OK] All data has been destroyed.');
    } catch (error) {
        console.log('[CRT] Erase failed! Details: ' + error);
        mkw('<p>Erase may have failed! Reload, chances are that it succeded.</p><button class="b1" onclick="window.location.reload();">Reload</button>', 'Reset Error', '450px');
    }
}

let backupDataVariable; // Variable to store the backup data

// Function to backup variables to a variable
async function backupdb() {
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

// Function to restore variables from a variable
async function restoredb() {
    try {
        const variables = JSON.parse(backupDataVariable);

        const db = await initDB();
        const transaction = db.transaction('settings', 'readwrite');
        const objectStore = transaction.objectStore('settings');

        // Clear existing variables before restoring
        objectStore.clear();

        // Restore variables from the backup
        for (const variable of variables) {
            objectStore.put(variable);
        }

        fesw('mig', 'mdone');
    } catch (error) {
        console.error(error);
    }
}
