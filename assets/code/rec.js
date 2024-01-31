function wipeboot() {
    delvar('bootload');
    mkw('<p>Exit Recovery to finish.</p><button class="b1" onclick="reboot();">Exit</button>', 'Succeded!', '230px');
}