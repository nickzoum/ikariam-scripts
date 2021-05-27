var delayMin = 0E3, delayMax = 1E3;

function clickElement(dom) {
    if (!dom) return;
    setTimeout(function () {
        var evt = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: randomSpot(dom.offsetWidth),
            clientY: randomSpot(dom.offsetHeight)
        });
        dom.dispatchEvent(evt);
    }, Math.random() * 8E3 + 5E3);

    function randomSpot(size) {
        return Math.random() * size * 0.8 + (size / 10) | 0;
    }
}

clickElement();

(function () {
    var audio = document.createElement("audio");
    audio.src = "http://soundbible.com/grab.php?id=1630&type=wav";
    audio.volume = 0.4;

    var list = document.querySelectorAll("#pirateCaptureBox a.capture");

    setInterval(function () {
        if (!document.querySelector("#pirateFortressShip:not(.invisible)")) return stop;
        if(list.length)
    }, 3E3);

    function start() {
        if (!audio.currentTime || audio.currentTime === audio.duration) audio.play();
    }

    function stop() {
        audio.currentTime = 0;
        audio.pause();
    }
})();