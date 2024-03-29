var canvas; 
function stcam() {
    var video = document.querySelector("#videl");
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                mkw(`<p>Something went wrong. Make sure that you granted WebDesk camera permissions.</p><button class="b1" onclick="mkw('${error}', 'Error Details', '300px');">Error Details</button>`, 'Camera Error', '330px');
            });
    }
}

function nocam() {
    try {
        var video = document.querySelector("#videl");
        var tracks = video.srcObject.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });

        video.srcObject = null;
    } catch (error) {
        console.log(`<!> Camera isn't started, or got nuked.`);
    }
}

function snap() {
    try {
        var video = document.querySelector("#videl");
        canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        masschange('camtime', 'Camera');
        fesw('cameraitself', 'savewherecam');
    } catch (error) {
        console.log(`<!> ${error}`);
    }
}

function tsnap(time, s) {
    setTimeout(snap, time);
    fesw('snapper', 'cameraitself');
    masschange('camtime', `Snapping in ${s}s...`);
}

function savetodev() {
    try {
        var link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        const num = gen(4);
        link.download = `WebDesk Capture ${num}.png`;
        link.click();
    } catch (error) {
        console.error(`Error saving to device: ${error}`);
    }
}

async function savetofiles() {
    try {
        const silly = canvas.toDataURL('image/png');
        const num = gen(4);
        const bruh = `WebDesk Capture ${num}.png`;
        const wowzers = `locker_` + bruh;
        writevar(wowzers, silly);
        await window.updatefilesList();
        snack('Saved picture to files', '3000');
        const content = await readvar(wowzers);
        viewmed(content, bruh, 'i');
    } catch (error) {
        mkw(`<p>An error happened. Save to device?</p>`, 'Camera - Error');
        console.error(`Error saving to files: ${error}`);
    }
}