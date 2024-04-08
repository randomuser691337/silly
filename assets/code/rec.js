function wipeboot() {
    const winc = `<p>Are you sure you want to remove your startup script?</p><p>Any jailbreak/mod will be deleted and will no longer load.</p><button class="b1" onclick="delpb('bootload', 'y');">Do it (reboot)!</button>`
    mkw(winc, 'Recovery Tools', '230px');
}
function repop() {
    mkw('<p>Any unsaved data on this desktop will be lost!</p><p>Select "Close" to cancel, or "Okay" to continue.</p><button class="b1 b2" onclick="recovery();">Okay</button>', 'Recovery', '300px');
}
function eraseprompt() {
    wal(`<p>Warning: Erasing WebDesk will delete all of it's data. Select 'Close' to stop, or 'Erase' to continue.</p>`, 'burnitall();', 'Erase');
}
var urr = "User started Recovery";
async function recovery() {
    console.log(`<!> Recovery opened! Initializing...`);
    promptreboot = false;
    await writevar('recovery', 'y');
    document.getElementById('nest').innerHTML = `<div class="cent" style="position: fixed; top: 50%;"><button class="b1" onclick="reboot();">Reboot</button></div>`;
    console.log('<i> Starting recovery apps...');
    const rec = `<p>WebDesk Recovery</p>
    <p>Was started because: ${urr}</p>
    <p class="med">If you haven't finished booting/logging in, you might encounter issues.</p>
    <p><button class="b1" onclick="eraseprompt();">Erase</button><button class="b1" onclick="wipeboot();">Delete startup script</button></p>`;
    mkw(rec, 'Recovery', '370px', undefined, 'auto', 'recstop');
    document.getElementById('recstop').addEventListener('mousedown', reboot);
}