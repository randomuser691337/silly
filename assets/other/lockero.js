window.updateLockerList = async function () {
    const lockerList = document.getElementById('locker-list');
    lockerList.innerHTML = ''; // Clear existing list

    // Read all variables with name starting with 'locker_'
    const db = await initDB();
    const transaction = db.transaction('settings', 'readonly');
    const objectStore = transaction.objectStore('settings');
    const request = objectStore.getAllKeys();

    request.onsuccess = async (event) => {
        const keys = event.target.result;
        keys.forEach(key => {
            if (key.startsWith('locker_')) {
                const fileName = key.slice(7); // Remove 'locker_' prefix
                const listItem = document.createElement('div');
                listItem.textContent = fileName;
                listItem.className = "list";
                const downloadButton = document.createElement('button');
                downloadButton.textContent = "Grab";
                downloadButton.className = "winb";
                downloadButton.addEventListener('click', async () => {
                    const content = await readvar(key);
                    const a = document.createElement('a');
                    a.href = content;
                    a.download = fileName;
                    a.click();
                    snack('Started file download!', '2500');
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = "Delete";
                deleteButton.className = "winb";
                deleteButton.addEventListener('click', () => {
                    listItem.parentNode.removeChild(listItem);
                    delvar(key);
                    snack('Deleted file successfully!', '2500');
                    window.updateLockerList();
                });

                const p = document.createElement('p');

                // Add both buttons to the list item
                listItem.appendChild(p);
                p.appendChild(downloadButton);
                p.appendChild(deleteButton);
                lockerList.appendChild(listItem);
                ib();
            }
        });
    };


    request.onerror = (event) => {
        console.error("[ERR] Error fetching locker variables: " + event.target.errorCode);
    };
};

window.updateLockerList();
