/* there are probably lots of bugs, if you feel like it, kill them all and let me know! */
function fesw(d1, d2) {
    const dr1 = document.getElementById(d1);
    const dr2 = document.getElementById(d2);
    $(dr1).fadeOut(200, function () {$(dr2).fadeIn(200);});
}