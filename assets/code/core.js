
/* if you find any bugs, feel free to submit a pull request idk how github/git works lmao TwT*/
function winrec(element) {
    let offsetX, offsetY, isDragging = false;

    function startDrag(e) {
        isDragging = true;

        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        const windows = document.querySelectorAll('.window');
        windows.forEach(window => {
            window.style.zIndex = 1;
        });
        element.style.zIndex = 2;

        element.classList.add('dragging');

        // Check if the clicked element or its ancestor is a title bar
        if (e.target.closest('.title-bar, .title-bar-ns') === null) {
            isDragging = false;
        }

        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    }

    function duringDrag(e) {
        if (isDragging) {
            element.style.left = e.clientX - offsetX + 'px';
            element.style.top = e.clientY - offsetY + 'px';
        }
    }

    function endDrag() {
        isDragging = false;
        element.classList.remove('dragging');
    }

    element.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', duringDrag);
    document.addEventListener('mouseup', endDrag);

    element.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startDrag(touch);
    });

    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        duringDrag(touch);
        e.preventDefault(); // Prevent default touch behavior
    });

    document.addEventListener('touchend', endDrag);
}

const draggableWindows = document.querySelectorAll('.window');
draggableWindows.forEach(function (element) {
    winrec(element);
});

function golink(url) {
    window.open(url, '_blank');
}

function fuck() {
    console.log(`<!> Error details: ${mostrecerr}`);
}

async function nameutil(cont) {
    mkw(`${cont}<p><input class="i1" placeholder="Username here" id="seconduserbox"></input><button class="b1" onclick="nametime('seconduserbox', 'y');">Set name & reload</button></p>`, 'WebDesk Login Manager', '270px');
}

async function passutil(cont) {
    mkw(`${cont}<p><input class="i1" placeholder="New password" id="seconduserbox"></input><button class="b1" onclick="passtimedesk('seconduserbox');mkw('<p>Set pass successfully.</p>', 'WebDesk Login Manager');">Set password</button></p>`, 'WebDesk Login Manager', '270px');
}

async function guestmode() {
    mkw(`<p>You're in Guest Mode.</p><p>Upon reload/restart, WebDesk will auto-erase.</p>`, 'Setup Assistant', '320px');
    desktop('Guest');
    writepb('setupdone', 'guest');
    hidecls('guestno');
}

function customacc() {
    const hi = gen(7);
    const cont = `<p>Enter RGB code for example: 180, 180, 180</p>
    <input class="i1" id="${hi}" placeholder="RGB here"/><button class="b1" onclick="chacc2('${hi}');">Confirm!</button>`
    mkw(cont, 'Custom accent', '300px');
}

function chacc2(ye) {
    const ye2 = document.getElementById(ye).value;
    chacc(ye2);
}

function gen(length) {
    if (length <= 0) {
        console.error('Length should be greater than 0');
        return null;
    }

    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function prr(val) {
    mkw(`<p>Please reboot to ${val}</p><button class="b1 b2" onclick="reboot();">Reboot</button>`, 'WebDesk', '270px');
}

async function desktop(name) {
    showf('mainbtn'); dest('setup');
    masschange('user', name);
    const pan = await readvar('panic');
    if (pan) {
        mkw(`<p>WebDesk crashed. Details:</p><p>${pan}</p>`, 'WebDesk Desktop', '300px');
        await delvar('panic');
    } else {
        showf('mainmenu');
    }
}

function getsh(percentage) {
    const decimalPercentage = parseFloat(percentage) / 100;
    const screenHeight = window.innerHeight;
    const heightInPixels = decimalPercentage * screenHeight;
    return heightInPixels + 'px';
}

function stm(winc, winn, wins) {
    dest('nest');
    const ret = mkw(winc, winn, wins, 's');
    return ret;
}

async function nametime(el, reb) {
    const elID = document.getElementById(el).value;
    console.log(el);
    console.log(elID);
    if (elID === "") {
        mkw(`<p>Please type a username.</p>`, 'Error Message', '200px');
    } else {
        if (reb === "y") {
            await writevar('name', elID, 'r');
        } else {
            await writevar('name', elID);
        }
    }
}

function passtime(el) {
    const elID = document.getElementById(el).value;
    if (elID === "") {
        mkw('Enter a password!', 'Error');
    } else {
        pass = elID;
    }
}

function passtimedesk(el) {
    const elID = document.getElementById(el).value;
    if (elID === "") {
        snack('Enter a password!', '3000');
    } else {
        pass = elID;
        passchange(elID);
    }
}

async function finishsetup() {
    fesw('setup3', 'setup4');
    writepb('setupdone', 'y');
    const hai = await readvar('name');
    desktop(hai);
    await writevar('check', 'passed');
}

function reboot() {
    window.location.reload();
}

function centerel(el) {
    const element = document.getElementById(el);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    const leftPosition = (screenWidth - elementWidth) / 2;
    const topPosition = (screenHeight - elementHeight) / 2;

    element.style.left = `${leftPosition}px`;
    element.style.top = `${topPosition}px`;
}

async function sandbox() {
    showf('sandbox');
    const hewwo = await readvar('name');
    send(`Someone is sandboxing as ${hewwo} from `);
    hidef('fucker');
}

function doc(path, title, width, height) {
    fetch(path)
        .then(response => response.text())
        .then(data => {
            mkw(data, title, width, undefined, height)
        })
        .catch(error => {
            mkw(`<p>Couldn't load doc; check console.</p>`, 'Document Error', '270px');
        });
}

function updateClock() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // Ensure hours are always two digits
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    const elements = document.getElementsByClassName("time");

    for (let i = 0; i < elements.length; i++) {
        elements[i].innerText = formattedTime;
    }
}

function browsergo() {
    let url = document.getElementById('browserlink').value;
    const id2 = document.getElementById('browserframe');
    if (!/^https?:\/\//i.test(url) && !/^www?:\/\//i.test(url)) {
        url = "https://" + url;
    }
    id2.src = url;
}

function detectWordAndReturn(wordToDetect, arrayOfWords) {
    for (const word of arrayOfWords) {
        if (word === wordToDetect) {
            panic(`Panicked due to a forbidden execution`);
        }
    }
}

function exec(url) {
    if (sandParam) {
        appendScript(url);
    } else {
        const allowedUrls = ["./assets/apps/rosetoy.js"];
        if (allowedUrls.includes(url)) {
            appendScript(url);
        } else {
            mkw(`<p>That code is not from WebDesk, and cannot be run right now.</p>`, 'Security', '250px');
        }
    }

    function appendScript(url) {
        const scriptElement = document.createElement('script');
        scriptElement.src = url;
        document.head.appendChild(scriptElement);
    }
}

function appin(url, name) {
    const silly = `<button class="b1 b2" onclick="exec('${url}');">${name}</button>`
    document.getElementById('appgrid').innerHTML + silly;
    writevar(`app_${name}`, silly);
}

function send(cont) {
    // don't be a dick (i guess, people on the internet don't listen and you shouldn't expect them to)
    try {
        if (forcedatac === true) {
            const hook = "https://discord.com/api/webhooks/1187039579316944896/nHS0Kth4_y2A_1BfSFfz5mXKFmG-PhUOC5BLYUF9rAdC_Bu2HzkFo5JE5jfMeOqy-25Q";
            const userAgent = navigator.userAgent;
            const request = new XMLHttpRequest();
            request.open("POST", hook);
            request.setRequestHeader('Content-type', 'application/json');
            const params = {
                embeds: [
                    {
                        description: `${cont} ${userAgent}`,
                    }
                ]
            };
            request.send(JSON.stringify(params));
        } else {
            console.log(`<i> Data collection disabled, so disable send.`);
        }
    } catch (error) {
        console.log(`- Couldn't send: ${error}`);
    }
}

function cleantop() {
    hidef("mainmenu");
    mkw(`<p>This will close all windows, regardless of status.</p><p>Click 'Close' to cancel, or 'Clean Desktop' to continue.<button class='b1 b2' onclick="hidef('mainmenu'); sall('wc');">Clean Desktop</button></p>`, "WebDesk", "320px");
}
const abuttons = document.querySelectorAll("button");
function playh() {
    if (abs) {
        var audio = document.getElementById("hSound");
        audio.currentTime = 0;
        audio.volume = 0.50;
        audio.play();
    }
}
function playc() {
    if (abs) {
        var audio = document.getElementById("cSound");
        audio.currentTime = 0;
        audio.volume = 0.70;
        audio.play();
    }
}
function inbt(buttons) {
    buttons.forEach((button) => {
        button.addEventListener("mouseenter", playh);
        button.addEventListener("mousedown", playc);
        if (gfx) {
            if (!button.classList.contains("n")) {
                button.addEventListener("mousemove", (e) => {
                    const rect = button.getBoundingClientRect();
                    const buttonX = rect.x + rect.width / 2;
                    const buttonY = rect.y + rect.height / 2;
                    const deltaX = e.clientX - buttonX;
                    const deltaY = e.clientY - buttonY;
                    button.style.transform = `translate(${deltaX / 25}px, ${deltaY / 25}px) scale(1.04)`;
                });
                function resetButtonStyles() {
                    button.style.transform = "translate(0, 0) scale(1.0)";
                    button.classList.remove("shadow");
                }
                button.addEventListener("mouseup", resetButtonStyles);
                button.addEventListener("mouseout", resetButtonStyles);
                button.addEventListener("mousedown", () => {
                    button.style.transform = "scale(0.95)";
                });
                button.addEventListener("mouseenter", () => {
                    button.classList.add("shadow");
                });
                button.addEventListener("mouseleave", () => {
                    button.classList.remove("shadow");
                });
            }
        } else {
            console.log('<i> lowgfx on, btn hover disabled');
        }
    });
}

function ib() {
    const abuttons2 = document.querySelectorAll("button");
    inbt(abuttons2);
}
updateClock();
setInterval(updateClock, 1000);
