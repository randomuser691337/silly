// huge pile of shit mixed with decent code
// if you have any optimizations/better code for this pls dm me: @illchangethislater on discord

const DB_NAME = "WebDeskStore";
const STORE_NAME = "WebDeskDB";
let NTName = "database"; // Default value
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
                reject(`<!> Couldn't open IDB! Run fuck() for details.`);
                mostrecerr = event.target.errorCode;
                panic(`Coudn't open IDB, which is a critical part of WebDesk.`);
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
    if (crashed == true) { console.log('Rejected FS action: Panic!'); return; } else {
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
}

// was an actual security attempt, now it's just security theater lmao

var cleartowr = false;

// Write a variable to the database
async function writevar(name, val, o) {
    if (sandParam) {
        cleartowr = true;
        writevarok(name, val, o);
    } else {
        const words = ["whatever"];
        for (const wordToDetect of words) {
            if (name === wordToDetect) {
                mkw(`<p>You tried to write to a system variable.</p><p>If you didn't cause this, you <a onclick="recovery();">should erase</a> or <a onclick="reboot();">reboot</a>, as someone has access to your WebDesk.</p>`, 'WebDesk Security', '340px');
                cleartowr = false;
            } else {
                cleartowr = true;
                writevarok(name, val, o);
            }
        }
    }
}

async function writevarok(varName, value, op) {
    try {
        if (crashed == true) {
            console.log('Rejected FS action: Panic!'); return;
        } else if (cleartowr == false) {
            panic('Attempted write without authorization. Boot load variable has been destroyed.');
            return;
        } else {
            cleartowr = false;
            const db = await initDB();
            const transaction = db.transaction('settings', 'readwrite');
            const objectStore = transaction.objectStore('settings');
            const request = objectStore.put({ name: varName, value });

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
            const transaction = db.transaction('settings', 'readwrite');
            const objectStore = transaction.objectStore('settings');
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
        indexedDB.deleteDatabase(NTName);
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
        } else if (er = "justreload") {
            window.location.reload();
        } else {
            stm(`<p>Erase completed. Auto-rebooting in 4s...</p><p>Reason: ${er}</p><button class="b1" onclick="window.location.reload();">Reboot</button>`, 'Erase Assistant', '200px');
            setTimeout(reboot, 4000);
        }
        console.log('[OK] All data has been destroyed.');
    } catch (error) {
        console.log('[CRT] Erase failed! Details: ' + error);
        mkw('<p>Erase may have failed! Reload, chances are that it succeded.</p><button class="b1" onclick="window.location.reload();">Reload</button>', 'Reset Error', '450px');
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
const dbParam = urlParams.get("db");

if (dbParam) {
    NTName = dbParam;
} else {
    console.log(`<i> No database variable defined (?db=)`);
}