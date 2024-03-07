function mkw(content, title, width, m, height, btnid) {
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
    if (btnid) {
        titleBar.innerHTML = title + ` <button class="winb wc" onclick="dest('${windowId}');" id="${btnid}">Close</button>`;
    } else {
        titleBar.innerHTML = title + ` <button class="winb wc" onclick="showf('fucker');dest('${windowId}');">Close</button>`;
    }
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
    hidef('mainmenu'); ib(); return windowId;
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
    titleBar.style.border = "none";
    titleBar.style.borderRadius = "12px";
    titleBar.innerHTML = content + `<p><button class="b1 wc" onclick="dest('${windowId}');">Close</button><button class="b1 wc" onclick="dest('${windowId}');${btn1}">Okay</button></p>`;
    windowContainer.appendChild(titleBar);
    document.getElementById('nest').appendChild(windowContainer);
    centerel(windowId); winrec(windowContainer);
    ib();
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
function hidecls(className) {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
}
function showcls(className) {
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'inline';
    }
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
    $(dr1).fadeOut(170, function () { dr1.remove(); });
}
function snack(cont, t) {
    var snackElement = document.createElement("div");
    snackElement.className = "snack";
    const fuckyou = gen(7);
    snackElement.id = fuckyou;
    snackElement.innerHTML = cont;
    document.body.appendChild(snackElement);
    snackElement.onclick = function () {
        dest(fuckyou);
    }
    setTimeout(function () { dest(fuckyou); }, t);
}
function sv() {
    snack('Saved!', '2000');
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
function masshtml(classn, val) {
    const usernameElements = document.getElementsByClassName(classn);
    for (let i = 0; i < usernameElements.length; i++) {
        usernameElements[i].innerHTML = val;
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
function getstr() {
    const progressBarElements = document.querySelectorAll('.struse');
    const usageTextElements = document.querySelectorAll('.usage-text');

    if ('storage' in navigator && 'estimate' in navigator.storage) {
        navigator.storage.estimate().then(function (estimate) {
            const usedGB = (estimate.usage / (1024 * 1024 * 1024)).toFixed(2);
            const quotaGB = (estimate.quota / (1024 * 1024 * 1024)).toFixed(2);

            usageTextElements.forEach(function (usageText) {
                usageText.innerHTML = `Used <span class="med">${usedGB}</span> GB out of <span class="med">${quotaGB}</span> GB`;
            });

            progressBarElements.forEach(function (progressBar) {
                const usageInPercent = (estimate.usage / estimate.quota) * 100;
                progressBar.style.width = usageInPercent + '%';
            });
        });
    } else {
        panic(`Can't open db!`);
    }
}

async function di() {
    const d = readpb('deskid');
    return d;
}

setInterval(getstr, 2000);

function reid() {
    const win = `<p>Get new DeskID?</p><p>A reboot is required, and you'll lose any other linked WebDesks.</p>
    <button class="b1 b2" onclick="const id = gen(6);writepb('deskid', id);reboot();">Get New ID</button>`
    mkw(win, 'New DeskID', '350px');
}

async function about(value) {
    const ok = await di();
    const about = `<div class="container">
        <div class="logo">
            <img style="width: 100%; box-sizing: border-box; height: auto;" src="./assets/img/favicon.png">
            <p style="cursor: pointer;" 
            onclick="mkw('<p>Last update: <span class='lastedit med'>one sec</span></p>', 'About');masschange('lastedit', lastedit);">Ver: <span class="ver med">one sec</span></p>
        </div>
        <div class="info">
            <p onclick="reid();" style="cursor: pointer;">DeskID: <span class="med">${ok}</span></p>
            <p class="usage-text">One sec...</p>
            <div class="progress-bar">
                <div class="progress struse"></div>
            </div>
            <a class="fucku" onclick="embed('https://meower.xyz', 'About Embed', '520px', '340px');">Dev's Site</a> 
            <a class="fucku" onclick="doc('./assets/other/creds.txt', 'WebDesk Credits', '420px', 'auto');">Creds</a>
        </div>
    </div>`;
    if (value === undefined) {
        mkw(about, `About`, '300px', './assets/img/favicon.png');
    }
    masschange('ver', ver);
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
async function appear(mode) {
    if (mode === "l") {
        changevar('background', '#fff');
        changevar('lightdark', '#fff');
        changevar('lightdarkb', '#F0F0F0');
        changevar('fontc', '#000');
        changevar('fontc2', "#333");
        changevar('bordercolor', "#DFDFDF");
        await writevar('appear', 'l');
    } else {
        changevar('background', '#000');
        changevar('lightdark', '#1a1a1a');
        changevar('lightdarkb', '#2a2a2a');
        changevar('fontc', '#fff');
        changevar('fontc2', "#aaa");
        changevar('bordercolor', "#3a3a3a");
        await writevar('appear', 'd');
    }
}
function allthatsillyshit() {
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    if (!isMobileDevice()) {
        customCursor.classList.add("custom-cursor");
        document.body.appendChild(customCursor);
        document.addEventListener("mousemove", function (event) {
            customCursor.style.left = event.clientX + "px";
            customCursor.style.top = event.clientY + "px";
        });
        customCursor.id = "fucker";
    } else {
        customCursor.id = "fucker";
        dest('fucker');
        console.log(`<i> Is mobile, destroy cursor`);
        hidecls('nocell');
    }
    if (sandParam) {
        opapp('setup');
        dest('setup1'); dest('load'); showf('yowetrapped'); hidef('guestno');
        writevar('username', 'User');
        return;
    }
    const btn = readpb('b');
    if (btn === "f") {
        abs = false;
    }
    const btn2 = readpb('l');
    if (btn2 === "f") {
        gfx = false;
    } else {
        inbt(abuttons);
        console.log('<i> lowgfx is off, enable hover');
    }
    const cur = readpb('c');
    if (cur === "f") {
        dest('fucker');
        wcur = false;
    } else {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
            * {
                cursor: none !important;
            }

            body {
                cursor: none !important;
            }`;
        document.body.appendChild(styleElement);
    }
}