function viewmed(val, name, mediaType) {
    if (!(mediaType === 'i' && val.startsWith("data:image/")) &&
        !(mediaType === 'v' && val.startsWith("data:video/"))) {
        console.error("Invalid media data format");
        return;
    }

    const mediaTag = mediaType === 'i' ? 'img' : 'video'; // Adjusted mediaType checks
    const mediaSrcAttribute = mediaType === 'i' ? 'src' : 'src';
    const fuck = gen(7);
    const mediaElement = `<${mediaTag} class="embed" ${mediaSrcAttribute}="${val}" id="${fuck}" controls></${mediaTag}>`;
    const hi = gen(7);
    mkw(mediaElement, name, '300px', undefined, undefined, hi);
    const hi2 = document.getElementById(hi);
    hi2.addEventListener('click', function () {
        const fucker = document.getElementById(fuck);
        fucker.pause();
        dest(fucker);
    });
}

function framecon(cont) {
    const random = gen(8);
    const iframe = `<iframe class="embed" id="${random}" srcdoc="${cont}" height="500px"></iframe>`;
    mkw(iframe, 'Files - Website', '600px');
}

function doc(path, title, width, height) {
    fetch(path)
        .then(response => response.text())
        .then(data => {
            mkw(data, title, width, undefined, height)
        })
        .catch(error => {
            mkw(`<p>Couldn't load doc; check console.</p>`, 'Document Error', '270px');
        });
}

function playaud(base64Content, contentType) {
    const binaryContent = atob(base64Content.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(binaryContent.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryContent.length; i++) {
        view[i] = binaryContent.charCodeAt(i);
    }

    let mimeType;
    switch (contentType) {
        case '.mpeg':
            mimeType = 'audio/mpeg';
            break;
        case '.mp3':
            mimeType = 'audio/mpeg';
            break;
        case '.wav':
            mimeType = 'audio/wav';
            break;
        // Add support for more audio formats as needed
        default:
            throw new Error('Unsupported audio format');
    }

    const blob = new Blob([arrayBuffer], { type: mimeType });

    let base64String = '';

    jsmediatags.read(blob, {
        onSuccess: function (tag) {
            const wint = truncater(tag.tags.title, 21);
            const alb = truncater(tag.tags.album, 15);
            const nm = truncater(tag.tags.artist, 21);
            const yr = tag.tags.year;
            const albumImg = tag.tags.picture;
            if (albumImg) {
                base64String = "data:" + albumImg.format + ";base64," + arrayBufferToBase64(albumImg.data);
            }
            const e1 = gen(7);
            const e2 = gen(7);
            const e4 = gen(7);
            const e5 = gen(7);
            const e6 = gen(7);
            const audPlayer = `
                <div style="display: flex; align-items: center; margin-bottom: 6px;">
                    <img src="${base64String}" style="box-shadow: 0 0 20px rgba(0, 0, 0, 0.15); width: 80px; height: auto; border: none; border-radius: 8px; margin-right: 10px;">
                    <div style="width: calc(100% - 90px);">
                        <p class="smt">${wint}</p>
                        <p class="smt">${nm}</p>
                        <p class="smt">${alb} - ${yr}</p>
                    </div>
                </div>        
                <p><input type="range" id="${e5}" min="0" max="100" value="0"></p>
                <p><button id="${e1}" class="winb">Play</button><button id="${e2}" class="winb">Pause</button><button id="${e6}" class="winb">Loop: Off</button></p>
            `;
            mkw(audPlayer, wint, 'auto', 'undefined', 'auto', e4);
            const audio = new Audio();
            audio.src = URL.createObjectURL(blob);
            audio.type = contentType;
            audio.play();
            const playBtn = document.getElementById(e1);
            const pauseBtn = document.getElementById(e2);
            const closeBtn = document.getElementById(e4);
            const scrubber = document.getElementById(e5);
            const loopBtn = document.getElementById(e6);

            playBtn.addEventListener('click', function () {
                audio.play();
            });

            pauseBtn.addEventListener('click', function () {
                audio.pause();
            });

            closeBtn.addEventListener('click', function () {
                audio.pause();
                URL.revokeObjectURL(blob);
                blob = null;
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
        },
        onError: function (error) {
            console.error("Error reading metadata:", error);
        }
    });
}
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
