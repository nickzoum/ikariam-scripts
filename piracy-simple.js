(function () {
    var audio = document.createElement("audio");
    audio.src = "http://soundbible.com/grab.php?id=1630&type=wav";
    audio.volume = 0.4;

    setInterval(function () {
        if (document.querySelector("#pirateFortressShip:not(.invisible)")) {
            if (!audio.currentTime || audio.currentTime === audio.duration) audio.play();
        }
    }, 250);
})();