
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
    mkw(`${cont}<p><input class="i1" placeholder="Username here" id="seconduserbox"></input><button class="b1" onclick="nametime('seconduserbox', 'y');">Set name & reload</button></p>`, 'WebDesk Login Manager', '300px');
}

async function passutil(cont) {
    mkw(`${cont}<p><input class="i1" placeholder="New password" id="seconduserbox"></input><button class="b1" onclick="passtimedesk('seconduserbox');">Set password</button></p>`, 'WebDesk Login Manager', '300px');
}

async function guestmode() {
    locked = false;
    pass = "pass";
    mkw(`<p>You're in Guest Mode.</p><p>Upon reload/restart, WebDesk will auto-erase.</p>`, 'Setup Assistant', '320px');
    desktop('Guest');
    writepb('setupdone', 'guest');
    hidecls('guestno');
    showcls('dwarn');
    dispo = true;
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

async function desktop(name, fuckstart) {
    showf('mainbtn'); dest('setup'); showf('nest');
    masschange('user', name);
    const pan = await readvar('panic');
    if (pan || fuckstart === "fuckoff") {
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
    if (elID === "") {
        snack('Enter a username!', '3000');
        return false;
    } else {
        if (reb === "y") {
            await writevar('name', elID, 'r');
        } else {
            await writevar('name', elID);
        }
        return true;
    }
}

function passtime(el) {
    const elID = document.getElementById(el).value;
    if (elID === "") {
        snack('Enter a password!', '3000');
        return false;
    } else {
        pass = elID;
        return true;
    }
}

function passtimedesk(el) {
    const elID = document.getElementById(el).value;
    if (elID === "") {
        snack('Enter a password!', '3000');
    } else {
        passchange(elID);
    }
}

async function unlock2() {
    console.log(`<i> Password correct. Unlocking...`);
    showcls('whar'); hidecls('whar2'); showf('nest');
    const audio = document.getElementById("unlock");
    audio.currentTime = 0;
    audio.volume = 1.0;
    audio.play();
}

function cm(cont, t) {
    const snackElement = document.createElement("div");
    snackElement.className = "cm";
    const fuckyou = gen(7);
    snackElement.id = fuckyou;
    snackElement.innerHTML = cont;
    document.body.appendChild(snackElement);
    snackElement.onclick = function () {
        setTimeout(function () {dest(fuckyou);}, 100);
    }
}

async function lock() {
    if (dispo === false && started === "full") {
        const audio = document.getElementById("lock");
        audio.currentTime = 0;
        audio.volume = 1.0;
        audio.play();
        pass = "def";
        locked = true;
        document.getElementById('lscreen').style.display = "block";
        setTimeout(function () {
            opapp('auth');
            passp('Enter pass to unlock WebDesk', 'unlock2()');
            showcls('whar2'); hidecls('whar');
            document.getElementById('nest').style.display = "none";
        }, 300);
    }
}

async function unlock() {
    const fullBg = document.getElementById('lscreen');
    const windowHeight = window.innerHeight;
    const transitionEndPromise = new Promise(resolve => {
        fullBg.addEventListener('transitionend', function transitionEndHandler() {
            fullBg.removeEventListener('transitionend', transitionEndHandler); // Remove the event listener
            resolve();
        });
    });

    fullBg.style.transition = `transform 0.5s ease`;
    fullBg.style.transform = `translateY(-${windowHeight}px)`;
    await transitionEndPromise;
    fullBg.style.display = 'none';
    fullBg.style.transform = 'translateY(0)';
}

async function finishsetup() {
    fesw('setup3', 'setup4');
    await writepb('setupdone', 'y');
    const hai = await readvar('name');
    desktop(hai, 'fuckoff');
    mkw(`<p>It's recommended to reboot before using WebDesk for the first time.</p><button class="b1" onclick="reboot();">Reboot</button>`, 'Setup Assistant', '270px');
    await writevar('check', 'passed');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    await writevar('setupon', `${month} ${day}, ${year}`);
    await writevar('ogver', ver);
}

function reboot() {
    window.location.reload();
}

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let i = 0;
document.addEventListener('keydown', e => {
    if (e.key === konamiCode[i++]) {
        if (i === konamiCode.length) {
            const win = `<p>Debug Menu</p>
            <p>This is meant for developers, or maybe you were curious. Don't click anything, if you don't know what it does.</p>
            <button class="b1 b2" onclick="burnitall('justreload');">Erase Now</button><button class="b1 b2" onclick="">Terminal</button>`
            i = 0;
        }
    } else {
        i = 0;
    }
});

let timeoutId;
let timeoutDuration = 300000;

function resetTimeout() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(lock, timeoutDuration);
}

function timeoutChange(timeInMs) {
    timeoutDuration = timeInMs;
    resetTimeout();
    snack('Changed lock timeout successfully.', '3300');
}

document.addEventListener("mousemove", resetTimeout);
document.addEventListener("keypress", resetTimeout);
resetTimeout();

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
    customCursor.style.opacity = "0%";
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
        console.log(`<!> Couldn't send: ${error}`);
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
var btnSense = readpb('sense');

async function inbt(buttons) {
    if (!btnSense) {
        btnSense = 14;
    }
    buttons.forEach((button) => {
        if (!button.dataset.listenersApplied) {
            button.dataset.listenersApplied = true;

            button.addEventListener("mouseenter", playh);
            button.addEventListener("mousedown", playc);

            if (gfx) {
                if (!button.classList.contains("n")) {
                    if (button.classList.contains('b2')) {
                        button.addEventListener("mousemove", (e) => {
                            applyMouseMoveEffect(button, e, 22);
                        });
                    } else {
                        button.addEventListener("mousemove", (e) => {
                            applyMouseMoveEffect(button, e, btnSense);
                        });
                    }
                }
            } else {
                console.log('<i> lowgfx on, btn hover disabled');
            }

            button.addEventListener("mouseup", resetButtonStyles);
            button.addEventListener("mouseout", resetButtonStyles);
            button.addEventListener("mousedown", () => {
                button.style.transform = "scale(0.95)";
            });
            button.addEventListener("mouseenter", () => {
                button.classList.add("shadow");
                try {
                    fucker.style.display = "none";
                } catch (error) {
                }
            });
            button.addEventListener("mouseleave", () => {
                button.classList.remove("shadow");
                try {
                    fucker.style.display = "block";
                } catch (error) {
                }
            });
        }
    });
}

function applyMouseMoveEffect(button, e, sense) {
    const rect = button.getBoundingClientRect();
    const buttonX = rect.x + rect.width / 2;
    const buttonY = rect.y + rect.height / 2;
    const deltaX = e.clientX - buttonX;
    const deltaY = e.clientY - buttonY;
    button.style.transform = `translate(${deltaX / sense}px, ${deltaY / sense}px) scale(1.05)`;
    button.style.zIndex = "2";
}

function resetButtonStyles() {
    const button = this; // 'this' refers to the button element triggering the event
    button.style.transform = "translate(0, 0) scale(1.0)";
    button.style.zIndex = "1";
    button.classList.remove("shadow");
}

document.addEventListener("keydown", function (event) {
    if (event.keyCode === 17) {
        showf('fucker');
    }
});


function ib() {
    const abuttons2 = document.querySelectorAll("button");
    inbt(abuttons2);
}
updateClock();
setInterval(updateClock, 1000);
