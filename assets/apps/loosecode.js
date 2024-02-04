var DoNotModifyUnlessYouKnowWhatYoureDoing = ["whatever"];
var urlParams = new URLSearchParams(window.location.search);
var sandParam = urlParams.get("sand");
async function forceoffdata() {
    await writevar('forcedata', 'off');
}
async function forceondata() {
    await writevar('forcedata', 'on');
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

async function exsandcon() {
    if (sandParam) {
       burnitall();
       sth('end');  
    }
}

function exsand() {
    mkw(`<p>Are you sure you want to exit Sandbox?</p><p>All data in Sandbox will be erased, select 'Close' to cancel or 'Okay' to continue.</p><button class="b1" onclick="exsandcon();">Okay</button>`, 'Sandbox', '350px');
}