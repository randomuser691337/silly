function iwa(path, name, width, height) {
    const jsonData = JSON.stringify({ path, width, height, name });
    writevar(`app_${name}`, jsonData);
}

function createappw(src, title, width, height) {
    const windowId = gen(6);
    const windowContainer = document.createElement('div');
    windowContainer.className = 'window';
    windowContainer.id = windowId;
    windowContainer.style.display = "block";
    windowContainer.style.zIndex = 2;
    windowContainer.style.width = width;
    if (height) {
        windowContainer.style.height = height;
    }
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = title + ` <button class="winb wc" onclick="showf('fucker');dest('${windowId}');">Close</button>`;
    const contentContainer = document.createElement('div');
    contentContainer.className = 'content';
    contentContainer.innerHTML = `<embed src="${src}" height="${height}" class="embed"></embed>`;
    windowContainer.appendChild(titleBar);
    windowContainer.appendChild(contentContainer);
    document.getElementById('nest').appendChild(windowContainer);
    opapp();
    hidef('mainmenu'); ib(); return windowId;
}


async function loadapps() {
    const db = await initDB();
    const transaction = db.transaction('settings', 'readonly');
    const objectStore = transaction.objectStore('settings');
    const request = objectStore.getAllKeys();

    request.onsuccess = async (event) => {
        let anyKeyFound = false;
        const keys = event.target.result;
        keys.forEach(async key => {
            if (key.startsWith('app_')) {
                anyKeyFound = true;
                const appData = await readvar(key);
                const { path, name, width, height } = appData;
                const appmenu = document.getElementById('appmenu');
                const appButton = document.createElement('button')
                appButton.className = "b1";
                appButton.onclick = function() {
                    createappw(path, name, width, height);
                };
                appButton.innerText = name; 
                appmenu.appendChild(appButton);
                
            }
        });

        if (!anyKeyFound) {
            ib();
            console.log('<i> Apps loaded');
        }
    };

    request.onerror = (event) => {
        console.error('<i> loadapps: oopsies');
    };
}
