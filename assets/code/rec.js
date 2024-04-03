function wipeboot() {
    const winc = `<p>Are you sure you want to remove your startup script?</p><p>Any jailbreak/mod will be deleted and will no longer load.</p><button class="b1" onclick="delpb('bootload', 'y');">Do it (reboot)!</button>`
    mkw(winc, 'Recovery Tools', '230px');
}
function repop() {
    mkw('<p>Any unsaved data on this desktop will be lost!</p><p>Select "Close" to cancel, or "Okay" to continue.</p><button class="b1 b2" onclick="recovery();">Okay</button>', 'Recovery', '300px');
}
async function recovery() {
    console.log(`<!> Recovery opened! Initializing...`);
    promptreboot = false;
    await writevar('recovery', 'y');
    document.getElementById('nest').innerHTML = `
    <div class="cent window" style="position: fixed; top: 50%; display: block !important;">
        <div class="title-bar">Recovery <button class="winb" onclick="reboot();">Exit</button></div>
        <div class="content">
            <p class="h2">Recovery</p>
            <p>You can erase to fix all issues, or wipe the cache/bootload variables to attempt a fix.</p>
            <button class="b1" onclick="wal('<p>Warning: Erasing WebDesk will delete all of it's data. Select 'Close' to stop, or 'Erase' to continue.</p>", 'burnitall()');">Erase</button><button class="b1" onclick="wipeboot();">Delete cache</button><button class="b1 hidden" onclick="opapp('migration');">Migrate</button>
        </div>
    </div>
    <!--Migration Assistant-->
    <div class="window" id="migration" style="width: 420px;">
        <div class="title-bar" id="titleBar">Migration Assistant (Rescue) <button class="winb wc"
                onclick="hidef('migration');">Close</button></div>
        <div class="content">
            <p>Enter the code you see on the other WebDesk.</p>
            <p>Note that no cache/onload vars will copy, to prevent copying the same issue to the other WebDesk.</p> 
            <input type="text" id="peerIdInput" class="i1" placeholder="Other peer's ID">
            <button id="connectButton" class="b1">Connect</button>
        </div>
    </div>
    <!--End of Migration Assistant-->`;
    console.log('<i> Starting recovery apps...');
    const migrationWindow = document.getElementById('migration');
    winrec(migrationWindow);
    initializePeerConnection();
}