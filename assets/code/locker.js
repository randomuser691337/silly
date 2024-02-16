// Function to generate random text
function generateRandomText(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Event listener for file drag and drop
document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.body;

    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    dropArea.addEventListener('drop', async (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        
        // Upload files into locker variables
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = async () => {
                const content = reader.result;
                const fileName = 'locker_' + generateRandomText(8); // Generate random file name
                await writevar(fileName, content);
                window.updateLockerList(); // Call updateLockerList to update the locker list
            };
            reader.readAsDataURL(file);
        }
    });
});

// Function to update locker list (accessible from anywhere)
window.updateLockerList = async function() {
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
                const listItem = document.createElement('li');
                listItem.textContent = fileName;
                listItem.addEventListener('click', async () => {
                    const content = await readvar(key);
                    const a = document.createElement('a');
                    a.href = content;
                    a.download = fileName;
                    a.click();
                });
                lockerList.appendChild(listItem);
            }
        });
    };

    request.onerror = (event) => {
        console.error("[ERR] Error fetching locker variables: " + event.target.errorCode);
    };
};

window.updateLockerList();
