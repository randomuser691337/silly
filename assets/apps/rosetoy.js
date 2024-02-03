// One of my friends annoyed me to add it back, ik that it's immature
function rosetoy() {
    const win = `<div id="rose1">
    <p>Rose Toy app only supports devices with a vibration motor and Chrome on Android.</p>
    <p>Trying to relax yourself on an iPhone or anything that isnt an Android will not work and may crash your device.</p>
    <button class="b1" onclick="fesw('rose1', 'rose2');">Start</button></div>
    <div id="rose2" class="hidden">
      <p>Rose Toy PLUS!</p>
      <p>Only works on Android w/ Chrome</p>
      <button class="b1 b2" onclick="rose1();">Pulsing</button>
      <button class="b1 b2" onclick="vi(20000);">Steady</button>
    </div>`
    mkw(win, 'Rose Toy', '240px');
}
rosetoy();