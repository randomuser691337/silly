function viewimg(val, name) {
    if (!val.startsWith("data:image/")) {
        console.error("Invalid image data format");
        return;
    }

    const win = `<img class="embed" src="${val}"></img>`
    mkw(win, name, '300px');
}

function framecon(cont) {
    const random = gen(8);
    const iframe = `<iframe class="embed" id="${random}" srcdoc="${cont}" height="500px"></iframe>`;
    mkw(iframe, 'Locker - Website', '600px');
}

function playaud(base64Content) {
    const binaryContent = atob(base64Content.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(binaryContent.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryContent.length; i++) {
        view[i] = binaryContent.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio();
    audio.src = url;
    audio.play();
    const e1 = gen(7);
    const e2 = gen(7);
    const e3 = gen(7);
    const e4 = gen(7);
    const e5 = gen(7);
    const e6 = gen(7);
    const audPlayer = `
        <p><button id="${e1}" class="winb">Play</button><button id="${e2}" class="winb">Pause</button><button id="${e6}" class="winb">Loop: Off</button></p>
        <p>Progress: <input type="range" id="${e5}" min="0" max="100" value="0"></p>
        <p>Volume: <input type="range" id="${e3}" min="0" max="100" value="100"></p>
    `;
    mkw(audPlayer, 'Audio Player', 'auto', 'undefined', 'auto', e4)
    const playBtn = document.getElementById(e1);
    const pauseBtn = document.getElementById(e2);
    const volumeSlider = document.getElementById(e3);
    const closeBtn = document.getElementById(e4);
    const scrubber = document.getElementById(e5);
    const loopBtn = document.getElementById(e6);

    playBtn.addEventListener('click', function () {
        audio.play();
    });

    pauseBtn.addEventListener('click', function () {
        audio.pause();
    });

    volumeSlider.addEventListener('input', function () {
        audio.volume = parseFloat(this.value) / 100;
    });

    closeBtn.addEventListener('click', function () {
        audio.pause();
        URL.revokeObjectURL(blobUrl);
        blobUrl = null;
    });

    scrubber.addEventListener('input', function () {
        const seekTo = audio.duration * (parseFloat(this.value) / 100);
        audio.currentTime = seekTo;
    });

    audio.addEventListener('timeupdate', function () {
        const progress = (audio.currentTime / audio.duration) * 100;
        scrubber.value = progress;
    });

    loopBtn.textContent = 'Loop: Off';
    let loopEnabled = false;

    loopBtn.addEventListener('click', function () {
        loopEnabled = !loopEnabled;
        audio.loop = loopEnabled;
        loopBtn.textContent = `Loop: ${loopEnabled ? 'On' : 'Off'}`;
    });
}