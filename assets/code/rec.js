function wipeboot() {
    delvar('bootload');
    mkw('<p>Restart to finish.</p><button class="b1" onclick="reboot();">Restart</button>', 'Succeded!', '230px');
}
function repop() {
    mkw('<p>Any unsaved data on this desktop will be lost!</p><p>Select "Close" to cancel, or "Okay" to continue.</p><button class="b1 b2" onclick="recovery();">Okay</button>', 'Recovery', '300px');
}