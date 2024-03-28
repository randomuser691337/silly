function adoc(path) {
    fetch(path)
        .then(response => response.text())
        .then(data => {
            fesw('passmain', 'passdoc');
            document.getElementById('passdoc').innerHTML = data;
        })
        .catch(error => {
            fesw('passmain', 'passdoc');
            document.getElementById('passdoc').innerHTML = `<p>Couldn't load utility: ${error}</p><button class="b1" onclick="backauth();">Back</button>`;
        });
    ib();
}

function backauth() {
    fesw('passdoc', 'passmain');
}

var alright = "mkw('<p>Nothing is defined, but password was correct.</p>', 'WebDesk Security');"
async function checkpass() {
    const oldpass = pass;
    passtime('passboxauth');
    key = CryptoJS.enc.Utf8.parse(pass);
    const check = await readvar('check');
    if (check === "passed") {
        locked = false;
        clr2();
        try {
            eval(alright);
        } catch (error) {
            console.log('<!> ' + error);
        }
        clapp('auth');
    } else {
        pass = oldpass;
        clr2();
        snack('Incorrect password.', '3000');
    }
}

function clr2() {
    document.getElementById("passboxauth").value = "";
}

async function passp(passt, func) {
    if (pass === "43fsj329t151afjds") {
        eval(func);
    } else {
        alright = func;
        masschange('passtxt', passt);
        opapp('auth');
    }
}

const inputField = document.getElementById('passboxauth');
const submitButton = document.getElementById('authgo');
inputField.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        submitButton.click();
    }
});