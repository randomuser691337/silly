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

function snap() {
    var video = document.querySelector("#videl");
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    var link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'webdesk_capture.png';
    link.click();
}