// Function to generate random text
function generateRandomText(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function isFileTooLarge(file) {
    // Convert file size to megabytes
    const fileSizeInMB = file.size / (1024 * 1024);
    return fileSizeInMB > 12;
}

// Event listener for file drag and drop
document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.body;

    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    dropArea.addEventListener('dragleave', (event) => {
        event.preventDefault();
    });

    dropArea.addEventListener('drop', async (event) => {
        try {
            event.preventDefault();
            const files = event.dataTransfer.files;

            // Upload files into locker variables
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (isFileTooLarge(file)) {
                    snack('File size exceeds 12MB limit. Skipping upload.', '4000');
                    return;
                }
                const reader = new FileReader();
                reader.onload = async () => {
                    const fileName = 'locker_' + file.name;
                    const content = reader.result; // Generate random file name
                    await writevar(fileName, content);
                    window.updateLockerList(); // Call updateLockerList to update the locker list
                };
                reader.readAsDataURL(file);
                snack('Uploaded file successfully! WebDesk might have frozen if the file was large, wait for it to unfreeze.', '3000');
            }
        } catch (error) {
            snack(`Locker error: ${error}`, '3500');
            console.log(error);
        }
    });
});

// Function to update locker list (accessible from anywhere)
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

                let valuesToCheck = [".jpg", ".png"];
                let found = valuesToCheck.some(value => key.includes(value));
                const viewBtn = document.createElement('button');
                if (found) {
                    viewBtn.textContent = "View";
                    viewBtn.className = "winb";
                    viewBtn.addEventListener('click', async () => {
                        const content = await readvar(key);
                        viewimg(content);
                    });
                }

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
                });

                const p = document.createElement('p');

                // Add both buttons to the list item
                listItem.appendChild(p);
                p.appendChild(downloadButton);
                if (found) { p.appendChild(viewBtn); }
                p.appendChild(deleteButton);
                lockerList.appendChild(listItem);
            }
        });
    };


    request.onerror = (event) => {
        console.error("[ERR] Error fetching locker variables: " + event.target.errorCode);
    };
};

function viewimg(val) {
    if (!val.startsWith("data:image/")) {
        console.error("Invalid image data format");
        return;
    }

    const win = `<img class="embed" src="${val}"></img>`
    mkw(win, 'Image Viewer', '300px');
}

window.updateLockerList();
