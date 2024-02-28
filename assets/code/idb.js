// huge pile of shit mixed with decent code
// if you have any optimizations/better code for this pls dm me: @illchangethislater on discord
const DB_NAME = "WebDeskStore";
const STORE_NAME = "WebDeskDB";
let NTName = "database"; // Default value
let dbPromise = null;
let pass = "def"; // Default password

async function initDB() {
    if (dbPromise) {
        return dbPromise;
    }

    dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(NTName, 1);

        request.onerror = (event) => {
            reject(`Couldn't open IDB! Error: ${event.target.errorCode}`);
            panic(`Couldn't open IDB, which is a critical part of WebDesk.`);
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore('settings', { keyPath: 'name' });
        };
    });

    return dbPromise;
}

// The three following functions are the db to get WebDesk on it's feet before decryption

function writepb(key, value) {
    localStorage.setItem(key, value);
}

function readpb(key) {
    return localStorage.getItem(key);
}

function delpb(key) {
    localStorage.removeItem(key);
}

function erasepb() {
    localStorage.clear();
}

function encrypt(value) {
    if (pass === "def") {
        console.log(`<!> STOP: Password is unset. Attempted write: ${value}`);
        return;
    }

    const encrypted = CryptoJS.AES.encrypt(value, pass).toString();
    return encrypted;
}

function decrypt(value) {
    if (pass === "def") {
        console.log(`<!> STOP: Password is unset. Attempted read: ${value}`);
        return;
    }

    try {
        const decrypted = CryptoJS.AES.decrypt(value, pass).toString(CryptoJS.enc.Utf8);
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error.message);
        return null;
    }
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
                const encryptedData = event.target.result ? event.target.result.value : undefined;
                if (!encryptedData) {
                    resolve(undefined); // No data found
                    return;
                }

                try {
                    const decryptedData = decrypt(encryptedData);
                    resolve(decryptedData);
                } catch (error) {
                    reject("[ERR] Error decrypting variable: " + error);
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
// finally killing security theater????
var cleartowr = true;
// Write a variable to the database
async function writevar(varName, value, op) {
    try {
        const db = await initDB();
        const transaction = db.transaction('settings', 'readwrite');
        const objectStore = transaction.objectStore('settings');
        const value2 = encrypt(value);
        const request = objectStore.put({ name: varName, value: value2 });

        request.onerror = (event) => {
            console.error("[ERR] Error writing variable: " + event.target.errorCode);
        };

        transaction.oncomplete = function () {
            if (op === "r") {
                reboot();
            }
        };
    } catch (error) {
        console.error(error);
    }
}

async function delvar(varName) {
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

async function renvar(variable, newname) {
    try {
        const value = await readvar(variable);
        if (value !== undefined) {
            await delvar(variable);
            await writevar(newname, value);
        }
    } catch (error) {
        console.error(error);
    }
}

async function eraseall() {
    try {
        if (crashed == true) { console.log('Rejected FS action: crashed!'); return; }
        indexedDB.deleteDatabase(NTName);
        // Don't forget the little one!
        erasepb();
        console.log('<i> Erased container successfully.');
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

async function passchange(newpass) {
    snack('Changing pass, DO NOT RELOAD!', '4000');
    try {
        const db = await initDB();
        const transaction = db.transaction('settings', 'readonly');
        const objectStore = transaction.objectStore('settings');
        const request = objectStore.getAll();

        request.onsuccess = async (event) => {
            const variables = event.target.result;
            const decryptedVariables = variables.map(variable => ({
                name: variable.name,
                value: decrypt(variable.value)
            }));

            pass = newpass;

            const clearTransaction = db.transaction('settings', 'readwrite');
            const clearObjectStore = clearTransaction.objectStore('settings');
            clearObjectStore.clear();

            const writeTransaction = db.transaction('settings', 'readwrite');
            const writeObjectStore = writeTransaction.objectStore('settings');
            decryptedVariables.forEach(variable => {
                writeObjectStore.put({
                    name: variable.name,
                    value: encrypt(variable.value)
                });
            });
            snack('Pass changed successfully!', '3500');
            console.log('Database password changed successfully.');
        };

        request.onerror = (event) => {
            console.error("[ERR] Error fetching variables: " + event.target.errorCode);
        };
    } catch (error) {
        console.error(error);
    }
}

function fsfucker() { mkw(`<p>Are you sure you want to run fsfucker?</p><p>It purposefully hammers the DB with data, and fills it up. WebDesk may crash, and your computer's resources will be used.</p><p>Note: A reset is required to undo fsfucker!</p><button class="b1" onclick="fsfuckerfinal();">Yes, fuck my FS</button>`, 'fsfucker', '300px')}
async function fsfuckerfinal() {
    for (let i = 0; i < 10000; i++) { console.log('<i> fsfucker: still alive'); await writevar(`locker_${i}`, 'x'.repeat(10 * 1024 * 50)); } 
}
const dbParam = urlParams.get("db");

if (dbParam) {
    NTName = dbParam;
} else {
    console.log(`<i> No database variable defined (?db=)`);
}
