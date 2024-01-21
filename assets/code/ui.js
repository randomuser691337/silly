function mkw(content, title, width, m) {
    const windowId = gen(6);
    const windowContainer = document.createElement('div');
    windowContainer.className = 'window';
    windowContainer.id = windowId;
    windowContainer.style.display = "block";
    windowContainer.style.zIndex = 2;
    windowContainer.style.width = width;
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = title + ` <button class="winb" onclick="dest('${windowId}');">Close</button>`;
    const contentContainer = document.createElement('div');
    contentContainer.className = 'content';
    contentContainer.innerHTML = content;
    windowContainer.appendChild(titleBar);
    windowContainer.appendChild(contentContainer);
    if (m === "s") {
        document.body.appendChild(windowContainer);
    } else {
        document.getElementById('nest').appendChild(windowContainer);
    }
    centerel(windowId);winrec(windowContainer);
    return windowId;
}
function opapp(d1) {
    const dr1 = document.getElementById(d1);
    $(dr1).fadeIn(150); centerel(d1);
    dr1.style.zIndex = 2;
    hidef('mainmenu');
}
function fesw(d1, d2) {
    const dr1 = document.getElementById(d1);
    const dr2 = document.getElementById(d2);
    $(dr1).fadeOut(150, function () { $(dr2).fadeIn(150); });
}
function hidef(d1) {
    const dr1 = document.getElementById(d1);
    $(dr1).fadeOut(150);
}
function showf(d1) {
    const dr1 = document.getElementById(d1);
    $(dr1).fadeIn(150);
}
function dest(d1) {
    const dr1 = document.getElementById(d1);
    $(dr1).fadeOut(170, function () { dr1.remove });
}
function toggle(elementId, time3) {
    var element = document.getElementById(elementId);
    if (element) {
        if (element.style.display === '' || element.style.display === 'none') {
            element.style.display = 'block';
        } else {
            hidef(elementId, time3);
        }
    }
}
function masschange(classn, val) {
    const usernameElements = document.getElementsByClassName(classn);
    for (let i = 0; i < usernameElements.length; i++) {
        usernameElements[i].textContent = val;
    }
}
function embed(src, name, width, height) {
    const random = gen(8);
    const embed = `<embed class="embed" id="${random}" src="${src}", height="${height}"></embed>`
    mkw(embed, name, width, './assets/img/browse.svg');
}
function about(value) {
    const about = `<img style="border: none; width: 100px; height: 100px;" src="./assets/img/favicon.png"></img>
        <p>Edited Dec 19, 2023</p>
        <p>Container: <span class="containername bold">undefined</span></p>
        <a onclick="embed('https://randomuser691337.vercel.app', 'About Embed', '520px', '340px');">Developer's Site</a>`;
    const conmgr = `
        <img style="border: none; width: 100px; height: 100px; border-radius: 15px;" src="./assets/img/multi.svg"></img>
        <p>Container Manager 2.0</p>
        <p>Edited Dec 19, 2023</p>
        <a onclick="embed('https://randomuser691337.vercel.app', 'About Embed', '520px', '340px');">Developer's Site</a>`;
    if (value === undefined) {
        mkw(about, `WebDesk ${ver}`, '240px', './assets/img/favicon.png');
    } else if (value === "conmgr") {
        mkw(conmgr, 'About', '220px', './assets/img/multi.svg');
    }
    masschange('containername', dbName);
}