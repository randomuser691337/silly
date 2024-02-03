// One of my friends annoyed me to add it back from WebDesk Canary, ik that it's immature
function vi(ms) {
    if ("vibrate" in navigator) {
        navigator.vibrate(ms);
    } else {
        console.log("Vibration API is not supported in this browser.");
    }
}
function rose1() {
    const pattern = [200, 100]; // Define the vibration pattern (ms)

    let patternIndex = 0;
    let repeatCount = 0;

    const vibrate = () => {
        if (patternIndex < pattern.length) {
            navigator.vibrate(pattern[patternIndex]);
            patternIndex = (patternIndex + 1) % pattern.length;
        } else {
            repeatCount++;
            if (repeatCount >= 15) {
                clearInterval(vibrationInterval);
            }
            patternIndex = 0;
        }
    };

    vibrate(); // Start the initial vibration

    const vibrationInterval = setInterval(vibrate, pattern.reduce((a, b) => a + b, 0));
}
function rosetoy() {
    const win = `<div id="rose1">
    <p>Rose Toy app only supports devices with a vibration motor and Chrome on Android.</p>
    <p>Trying to relax yourself on an iPhone or anything that isnt an Android will not work and may crash your device.</p>
    <button class="b1" onclick="fesw('rose1', 'rose2');">Start</button></div>
    <div id="rose2" class="hide">
      <p>Rose Toy PLUS!</p>
      <p>Only works on Android w/ Chrome</p>
      <button class="b1 b2" onclick="rose1();">Pulsing</button>
      <button class="b1 b2" onclick="vi(20000);">Steady</button>
    </div>`
    mkw(win, 'Rose Toy', '240px');
}
rosetoy();