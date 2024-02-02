function mkw(content, title, width, m, height) {
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
    titleBar.innerHTML = title + ` <button class="winb wc" onclick="dest('${windowId}');">Close</button>`;
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
    centerel(windowId); winrec(windowContainer);
    hidef('mainmenu'); return windowId;
}

function wal(content, btn1) {
    const windowId = gen(6);
    const windowContainer = document.createElement('div');
    windowContainer.className = 'window';
    windowContainer.id = windowId;
    windowContainer.style.display = "block";
    windowContainer.style.zIndex = 2;
    windowContainer.style.width = '300px';
    windowContainer.style.height = 'auto';
    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';
    titleBar.innerHTML = content + `<p><button class="b1 wc" onclick="dest('${windowId}');">Close</button><button class="b1 wc" onclick="dest('${windowId}');${btn1}">Okay</button></p>`;
    windowContainer.appendChild(titleBar);
    document.getElementById('nest').appendChild(windowContainer);
    centerel(windowId); winrec(windowContainer);
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
    if (dr1) {
        $(dr1).fadeOut(150);
    }
}
function showf(d1) {
    const dr1 = document.getElementById(d1);
    $(dr1).fadeIn(150);
}
function changevar(varName, varValue) {
    const root = document.documentElement;
    root.style.setProperty(`--${varName}`, `${varValue}`);
    writevar(varName, varValue);
}
function chacc(clr1) {
    changevar('accent', clr1);
}
function dest(d1) {
    const dr1 = document.getElementById(d1);
    $(dr1).fadeOut(170, function () { dr1.remove });
}
function clis(elid, cl) {

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
function redir(url2) {
    const ye = `<p>You're about to be redirected to ${url2}.</p>
    <p>Select "Close" to cancel, or "Accept" to continue.</p>`
    wal(ye, `golink('${url2}');`);
}
function about(value) {
    const about = `<img style="border: none; width: 100px; height: 100px;" src="./assets/img/favicon.png"></img>
        <p>Version: <span class="ver">one sec</span></p>
        <p>Last edited: <span class="lastedit">one sec</span></p>
        <a onclick="embed('https://meower.xyz', 'About Embed', '520px', '340px');">Developer's Site</a> <a onclick="doc('./assets/code/creds.txt', 'WebDesk Credits', '420px', 'auto');">Creds</a>`;
    if (value === undefined) {
        mkw(about, `WebDesk ${ver}`, '240px', './assets/img/favicon.png');
    }

    masschange('ver', ver);
    masschange('lastedit', lastedit);
}
function update(src, time) {
    // silly easter egg corrupted android reference
    mkw(`Updating ${src}, <span style="color: #ff2222;">DO NOT REBOOT!</span>`, 'Flashing (DO NOT REBOOT!)', '300px');
    setTimeout(function () {
        document.body.style.background = "#000";
        document.body.innerHTML = `<img id="sillypenguin" src="./assets/img/tux.png"></img>`;
    }, time)
}
function sall(className) {
    var buttons = document.getElementsByClassName(className);
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].click();
    }
}
function appear(mode) {
   if (mode === "l") {
    changevar('background', '#fff');
    changevar('lightdark', '#fff');
    changevar('lightdarkb', '#e4e4e4');
    changevar('fontc', '#000');
    changevar('fontc2', "#333");
    changevar('bordercolor', "#d4d4d4");
   }
}