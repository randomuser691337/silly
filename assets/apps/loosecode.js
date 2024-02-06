var DoNotModifyUnlessYouKnowWhatYoureDoing = ["whatever"];
var urlParams = new URLSearchParams(window.location.search);
var sandParam = urlParams.get("sand");
async function forceoffdata() {
    await writevar('forcedata', 'off');
    send(`This WebDesk's final cry: someone's disabled data collection. `);
}
async function forceondata() {
    await writevar('forcedata', 'on');
    send(`This WebDesk's NOT final cry: the user took it back! `);
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