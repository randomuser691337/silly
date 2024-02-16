const DB_NAME = "WebDeskStore";
const STORE_NAME = "WebDeskDB";
let NTName = "database"; // Default value
let mostrecerr = null; // Declare mostrecerr variable
let crashed = false; // Declare crashed variable
let cleartowr = true; // Declare cleartowr variable
let promptreboot = true; // Declare promptreboot variable

// Open IndexedDB
// Initialize the IndexedDB
let dbPromise = null;

function initDB() {
    if (dbPromise) {
        return dbPromise;
    }

    dbPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const request = indexedDB.open(DB_NAME, 1); // Use DB_NAME instead of NTName

            request.onerror = (event) => {
                reject(`<!> Couldn't open IDB! Run fuck() for details.`);
                mostrecerr = event.target.errorCode;
                panic(`Couldn't open IDB, which is a critical part of WebDesk.`);
            };

            request.onsuccess = (event) => {
                const db = event.target.result;
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'name' }); // Use STORE_NAME instead of 'settings'
                objectStore.transaction.oncomplete = () => {
                    resolve(db);
                };
            };
        }, 500);
    });

    return dbPromise;
}

// Encryption and decryption functions using Crypto API
async function encryptData(data, password) {
    const encoder = new TextEncoder();
    const encodedPassword = encoder.encode(password);
    const key = await crypto.subtle.importKey("raw", encodedPassword, "PBKDF2", false, ["encrypt"]);
    const encodedData = encoder.encode(data);
    const encryptedData = await crypto.subtle.encrypt({ name: "AES-GCM", iv: new Uint8Array(12) }, key, encodedData);
    return encryptedData;
}

async function decryptData(encryptedData, password) {
    const encoder = new TextEncoder();
    const encodedPassword = encoder.encode(password);
    const key = await crypto.subtle.importKey("raw", encodedPassword, "PBKDF2", false, ["decrypt"]);
    const decryptedData = await crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(12) }, key, encryptedData);
    return new TextDecoder().decode(decryptedData);
}

// Prompt user for password on startup
async function promptForPassword() {
    const password = prompt("Enter your password:");
    if (!password) {
        // Handle empty password or cancellation
        return null;
    }
    return password;
}

// Read a variable from the database
async function readvar(varName) {
    if (crashed == true) { console.log('Rejected FS action: Panic!'); return; } else {
        try {
            const db = await initDB();
            const transaction = db.transaction(STORE_NAME, 'readonly'); // Use STORE_NAME instead of 'settings'
            const objectStore = transaction.objectStore(STORE_NAME); // Use STORE_NAME instead of 'settings'
            const request = objectStore.get(varName);

            return new Promise(async (resolve, reject) => {
                request.onsuccess = async (event) => {
                    const encryptedValue = event.target.result ? event.target.result.value : undefined;
                    const password = await promptForPassword();
                    if (password) {
                        try {
                            const decryptedValue = await decryptData(encryptedValue, password);
                            resolve(decryptedValue);
                        } catch (error) {
                            reject("Decryption error: " + error);
                        }
                    } else {
                        reject("Password not provided.");
                    }
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
}

// Write a variable to the database
async function writevar(name, val, o) {
    try {
        const password = await promptForPassword();
        if (password) {
            const encryptedValue = await encryptData(val, password);
            await writevarok(name, encryptedValue, o);
        } else {
            console.log("Password not provided.");
        }
    } catch (error) {
        console.error(error);
    }
}

async function writevarok(varName, encryptedValue, op) {
    try {
        if (crashed == true) {
            console.log('Rejected FS action: Panic!'); return;
        } else if (cleartowr == false) {
            panic('Attempted write without authorization. Boot load variable has been destroyed.');
            return;
        } else {
            cleartowr = false;
            const db = await initDB();
            const transaction = db.transaction(STORE_NAME, 'readwrite'); // Use STORE_NAME instead of 'settings'
            const objectStore = transaction.objectStore(STORE_NAME); // Use STORE_NAME instead of 'settings'
            const request = objectStore.put({ name: varName, value: encryptedValue });

            request.onerror = (event) => {
                console.error("[ERR] Error writing variable: " + event.target.errorCode);
            };

            transaction.oncomplete = function () {
                if (op == "r") {
                    reboot();
                }
            };
        }
    } catch (error) {
        console.error(error);
    }
}

async function delvar(varName) {
    try {
        if (crashed == true) { console.log('Rejected FS action: Panic!'); } else {
            const db = await initDB();
            const transaction = db.transaction(STORE_NAME, 'readwrite'); // Use STORE_NAME instead of 'settings'
            const objectStore = transaction.objectStore(STORE_NAME); // Use STORE_NAME instead of 'settings'
            objectStore.delete(varName);
            transaction.onerror = (event) => {
                console.error("[ERR] Error deleting variable: " + event.target.errorCode);
            };
        }
    } catch (error) {
        console.error(error);
    }
}

async function eraseall() {
    try {
        if (crashed == true) { console.log('Rejected FS action: crashed!'); return; }
        indexedDB.deleteDatabase(DB_NAME); // Use DB_NAME instead of NTName
        console.log('[OK] Erased container successfully.');
    } catch (error) {
        console.error(error);
    }
}

async function burnitall(er) {
    try {
        await eraseall();
        promptreboot = false;
        if (er === undefined || er === "") {
            stm('<p>Erase completed. Auto-rebooting in 3s...</p><button class="b1" onclick="window.location.reload();">Reboot</button>', 'Erase Assistant', '200px');
            setTimeout(reboot, 3000);
        } else if (er == "justreload") { // Use == instead of =
            window.location.reload();
        } else {
            stm(`<p>Erase completed. Auto-rebooting in 4s...</p><p>Reason: ${er}</p><button class="b1" onclick="window.location.reload();">Reboot</button>`, 'Erase Assistant', '200px');
            setTimeout(reboot, 4000);
        }
        console.log('[OK] All data has been destroyed.');
    } catch (error) {
        console.log('[CRT] Erase failed! Details: ' + error);
        mkw('<p>Erase may have failed! Reload, chances are that it succeeded.</p><button class="b1" onclick="window.location.reload();">Reload</button>', 'Reset Error', '450px');
    }
}

let backupDataVariable;

async function backupdb() {
    if (crashed == true) { console.log('Rejected FS action: crashed!'); return; } else {
        try {
            const db = await initDB();
            const transaction = db.transaction(STORE_NAME, 'readonly'); // Use STORE_NAME instead of 'settings'
            const objectStore = transaction.objectStore(STORE_NAME); // Use STORE_NAME instead of 'settings'
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
            const transaction = db.transaction(STORE_NAME, 'readwrite'); // Use STORE_NAME instead of 'settings'
            const objectStore = transaction.objectStore(STORE_NAME); // Use STORE_NAME instead of 'settings'
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

const urlParams = new URLSearchParams(window.location.search);
const dbParam = urlParams.get("db");

if (dbParam) {
    NTName = dbParam;
} else {
    console.log(`<i> No database variable defined (?db=)`);
}
