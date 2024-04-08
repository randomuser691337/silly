// huge pile of shit mixed with decent code
// if you have any optimizations/better code for this pls dm me: @randomuser691337 on discord
const DB_NAME = "WebDeskStore";
const STORE_NAME = "WebDeskDB";
let NTName = "database"; // Default value
let dbPromise = null;
let pass = "def"; // Default password

// Open IndexedDB
function initDB() {
    if (dbPromise) {
        return dbPromise;
    }

    dbPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const request = indexedDB.open(NTName, 1);

            request.onerror = (event) => {
                reject(`<!> Couldn't open IDB! Run fuck() for details.`);
                panic(event.target.errorCode);
            };

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore('settings', { keyPath: 'name' });
            };
        }, 200);
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

// Write a variable to the database
async function writevar(varName, value, op) {
    try {
        const wr = await readpb('enc');
        const db = await initDB();
        const transaction = db.transaction('settings', 'readwrite');
        const objectStore = transaction.objectStore('settings');
        if (wr === "no") {
            objectStore.put({ name: varName, value: value });
            console.log('<i> mode = decryped!');
        } else {
            const value2 = encrypt(value);
            objectStore.put({ name: varName, value: value2 });
        }

        transaction.oncomplete = function () {
            if (op == "r") {
                reboot();
            }
        };
    } catch (error) {
        console.error("[ERR] Error writing variable: " + error.message);
    }
}

// Read a variable from the database
async function readvar(varName) {
    try {
        const wr = await readpb('enc');
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
                    if (wr === "no") {
                        resolve(encryptedData);
                        console.log('<i> mode = decryped!');
                    } else {
                        const decryptedData = decrypt(encryptedData);
                        resolve(decryptedData);
                    }
                } catch (error) {
                    reject("<!> Error decrypting variable: " + error.message);
                }
            };

            request.onerror = (event) => {
                reject("<!> Error reading variable: " + event.target.errorCode);
            };
        });
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

// Delete a variable from the database
async function delvar(varName) {
    try {
        const db = await initDB();
        const transaction = db.transaction('settings', 'readwrite');
        const objectStore = transaction.objectStore('settings');
        objectStore.delete(varName);
    } catch (error) {
        console.error("<!> Error deleting variable: " + error.message);
    }
}

// Encrypt data
function encrypt(value) {
    if (pass === "def") {
        console.log(`<!> STOP: Password is unset. Attempted write: ${value}`);
        return;
    }

    return CryptoJS.AES.encrypt(value, pass).toString();
}

// Decrypt data
function decrypt(value) {
    if (pass === "def") {
        console.log(`<!> STOP: Password is unset. Attempted read: ${value}`);
        return;
    }

    try {
        return CryptoJS.AES.decrypt(value, pass).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Decryption error:', error.message);
        return null;
    }
}

// Change password
async function passchange(newpass) {
    const en = await readpb('enc');
    if (en === "no") {
       wal(`<p>WebDesk is unencrypted, therefor you cannot set a password.</p>`, undefined, 'Okay');
       return;
    } 
    snack('Changing pass, DO NOT RELOAD!', '4000');
    try {
        const db = await initDB();
        const transaction = db.transaction('settings', 'readwrite');
        const objectStore = transaction.objectStore('settings');
        const request = objectStore.getAll();

        request.onsuccess = async (event) => {
            const variables = event.target.result || [];

            // Decrypt variables using the current password
            const decryptedVariables = variables.map(variable => ({
                name: variable.name,
                value: decrypt(variable.value)
            }));

            // Change the password
            pass = newpass;

            // Encrypt variables using the new password
            const encryptedVariables = decryptedVariables.map(variable => ({
                name: variable.name,
                value: encrypt(variable.value)
            }));

            // Clear the current database
            objectStore.clear();

            // Write the encrypted variables with the new password to the database
            encryptedVariables.forEach(variable => {
                objectStore.put(variable);
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

async function enableenc() {
    const gen1 = gen(8);
    mkw(`<p>Enter an encryption password.</p><p>Note: This will take a while, depending on the size of files.</p><input class="i1" placeholder="Password" id="${gen1}"></input><button class="b1 b2" onclick="toencrypt(document.getElementById('${gen1}').value);">Encrypt!</button>`);
}

async function toencrypt(password) {
    const en = await readpb('enc');
    if (en !== "no" || password == "") {
        wal(`<p>WebDesk is already encrypted, or your password field is empty.</p>`, undefined, 'Okay');
        return;
    } 
    pass = password;
    snack('Encrypting, DO NOT RELOAD!', '4000');
    try {
        const db = await initDB();
        const transaction = db.transaction('settings', 'readwrite');
        const objectStore = transaction.objectStore('settings');
        const request = objectStore.getAll();

        request.onsuccess = async (event) => {
            const variables = event.target.result || [];

            variables.forEach(async (variable) => {
                const encryptedValue = encrypt(variable.value);
                objectStore.put({ name: variable.name, value: encryptedValue });
            });

            writepb('enc', 'yes');

            snack('Encryption completed successfully!', '3500');
            console.log('Database encrypted successfully.');
        };

        request.onerror = (event) => {
            console.error("[ERR] Error fetching variables: " + event.target.errorCode);
        };
    } catch (error) {
        console.error(error);
    }
}

async function unenc() {
    const en = await readpb('enc');
    if (en === "no") {
        wal(`<p>WebDesk is already unencrypted.</p>`, undefined, 'Okay');
        return;
    } else {
        passp('Enter password to decrypt WebDesk, this might take a while.', 'unencrypt()');
    }
}

async function unencrypt() {
    snack('Decrypting, DO NOT RELOAD!', '4000');
    try {
        const db = await initDB();
        const transaction = db.transaction('settings', 'readwrite');
        const objectStore = transaction.objectStore('settings');
        const request = objectStore.getAll();

        request.onsuccess = async (event) => {
            const variables = event.target.result || [];

            variables.forEach(async (variable) => {
                const decryptedValue = decrypt(variable.value);
                objectStore.put({ name: variable.name, value: decryptedValue });
            });

            writepb('enc', 'no');

            snack('Decryption completed successfully!', '3500');
            console.log('Database decrypted successfully.');
        };

        request.onerror = (event) => {
            console.error("[ERR] Error fetching variables: " + event.target.errorCode);
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

const dbParam = urlParams.get("db");

if (dbParam) {
    NTName = dbParam;
} else {
    console.log(`<i> No database variable defined (?db=)`);
}
