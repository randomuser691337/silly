
/* if you find any bugs, feel free to submit a pull request idk how github/git works lmao TwT*/
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

function gen(length) {
    if (length <= 0) {
        console.error('Length should be greater than 0');
        return null;
    }

    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    fesw('setup2', 'setup3');
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

updateClock();
setInterval(updateClock, 1000);