function isFileTooLarge(file) {
    // Convert file size to megabytes
    const fileSizeInMB = file.size / (1024 * 1024);
    return fileSizeInMB > 12;
}

var valuesToCheck = [".jpg", ".png"];

// Function to handle file upload
async function handleFileUpload(file) {
    try {
        if (isFileTooLarge(file)) {
            snack('File size exceeds 12MB limit. Skipping upload.', '4000');
            return;
        }
        const reader = new FileReader();
        reader.onload = async () => {
            const fileName = 'locker_' + file.name;
            const content = reader.result;
            await writevar(fileName, content);
            window.updateLockerList();
        };
        reader.readAsDataURL(file);
        snack('Uploaded file successfully! WebDesk might have frozen if the file was large, wait for it to unfreeze.', '3000');
    } catch (error) {
        snack(`Locker error: ${error}`, '3500');
        console.log(error);
    }
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
        event.preventDefault();
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            await handleFileUpload(files[i]);
        }
    });
});

// Manual upload function
function upload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Adjust file types as needed
    input.onchange = async (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            await handleFileUpload(files[i]);
        }
    };
    input.click();
}


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

                const renButton = document.createElement('button');
                renButton.textContent = "Rename";
                renButton.className = "winb";
                renButton.addEventListener('click', () => {
                    const boxId = gen(7);
                    const win = `<p>Enter a name that isn't already used</p>
                    <input class="i1" id="${boxId}" placeholder="Name here"/><button class="b1" onclick="renlocker('${key}', '${boxId}');$(this).parent().parent().fadeOut('150', function() {$(this).remove();});">Rename</button>`;
                    mkw(win, 'Locker - Rename', '300px');
                });

                const p = document.createElement('p');

                // Add both buttons to the list item
                listItem.appendChild(p);
                p.appendChild(downloadButton);
                if (found) { p.appendChild(viewBtn); }
                p.appendChild(deleteButton);
                p.appendChild(renButton);
                lockerList.appendChild(listItem);
            }
        });
    };


    request.onerror = (event) => {
        console.error("[ERR] Error fetching locker variables: " + event.target.errorCode);
    };
};

async function renlocker(name, box) {
    const inputValue = document.getElementById(box).value;
    const sillyExtension = valuesToCheck.find(ext => name.endsWith(ext));
    if (sillyExtension) {
        const newName = `${inputValue}${sillyExtension}`;
        await renvar(name, `locker_${newName}`);
    } else {
        await renvar(name, `locker_${inputValue}`);
    }
    await window.updateLockerList();
    snack(`Renamed to ${inputValue} successfully`, '3500');
}



function viewimg(val) {
    if (!val.startsWith("data:image/")) {
        console.error("Invalid image data format");
        return;
    }

    const win = `<img class="embed" src="${val}"></img>`
    mkw(win, 'Image Viewer', '300px');
}

window.updateLockerList();
