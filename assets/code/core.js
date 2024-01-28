
/* if you find any bugs, feel free to submit a pull request idk how github/git works lmao TwT*/
var ver = "0.0.9";
var lastedit = "Jan 25, 2024";
function winrec(element) {
    let offsetX, offsetY, isDragging = false;

    function startDrag(e) {
        isDragging = true;

        // Calculate the offset dynamically
        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        // Check if the clicked element is the title bar
        if (!e.target.classList.contains('title-bar')) {
            isDragging = false;
        }

        // Bring the clicked window to the front
        const windows = document.querySelectorAll('.window');
        windows.forEach(window => {
            window.style.zIndex = 1; // Reset zIndex for all windows
        });
        element.style.zIndex = 2; // Bring the clicked window to the front

        element.classList.add('dragging');

        // Prevent default touch behavior only if the target is not an input element
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    }

    function duringDrag(e) {
        if (isDragging) {
            element.style.left = e.clientX - offsetX + 'px';
            element.style.top = e.clientY - offsetY + 'px';

            // Prevent default touch behavior
            e.preventDefault();
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

async function guestmode() {
    mkw(`<p>You're in Guest Mode.</p><p>Upon reload/restart, WebDesk will auto-erase.</p>`, 'Setup Assistant', '320px');
    desktop('Guest');
    await writevar('setupdone', 'guest');
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

async function yescrd() {
    await writevar('crd', 'y');
}

async function nocrd() {
    await writevar('crd', 'n');
}

async function yeserrd() {
    await writevar('errd', 'y');
}

async function noerrd() {
    await writevar('errd', 'n');
}

function setchk(id, act1, act2) {
    var button = document.getElementById(id);
    if (button.classList.contains('green')) {
        button.classList.remove('green');
        button.classList.add('red');
        window[act2]();
    } else {
        button.classList.remove('red');
        button.classList.add('green');
        window[act1]();
    }
}

function desktop(name) {
    showf('mainbtn'); dest('setup');
    masschange('user', name);
    dest('setup');
    showf('mainmenu');
}

function stm(winc, winn, wins) {
    dest('nest');
    const ret = mkw(winc, winn, wins, 's');
    return ret;
}

async function nametime(el) {
    const elID = document.getElementById(el).value;
    await writevar('name', elID)
}

async function finishsetup() {
    fesw('setup3', 'setup4');
    await writevar('setupdone', 'y');
    const hai = await readvar('name');
    desktop(hai);
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
    const id1 = document.getElementById('browserlink').value;
    const id2 = document.getElementById('browserframe');
    id2.src = id1;
}

async function resizew(elemID, name1, name2) {
    const element = document.getElementById(elemID);
    let rafId = null;
    let resizeStarted = false;
    
    function onResize() {
      if (!resizeStarted) {
        resizeStarted = true;
      }
      
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
  
      rafId = requestAnimationFrame(function() {
        const resizeW = element.offsetWidth;
        const resizeH = element.offsetHeight;
        writevar(name1, resizeW);
        writevar(name2, resizeH);
        resizeStarted = false;
      });
    }
  
    window.addEventListener('resize', onResize);
  }
  

function cleantop() {
    hidef("mainmenu");
    mkw(`<p>This will close all windows, regardless of status.</p><p>Click 'Close' to cancel, or 'Clean Desktop' to continue.<button class='b1 b2' onclick="hidef('mainmenu'); sall('wc');">Clean Desktop</button></p>`, "WebDesk", "320px");
}
updateClock();
setInterval(updateClock, 1000);
