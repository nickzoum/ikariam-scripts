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

(function () {
    var isMute = localStorage.getItem("pirateMute") === "true";

    var volume = 0.15;
    var audioSource = "http://soundbible.com/grab.php?id=1630&type=wav";

    var button = document.createElement("button");
    button.classList[isMute ? "remove" : "add"]("active");
    button.id = "toggle-ship";
    button.addEventListener("click", function () {
        isMute = !isMute;
        localStorage.setItem("pirateMute", isMute ? "true" : "false");
        audio.volume = isMute ? 0 : volume;
        button.classList[isMute ? "remove" : "add"]("active");
    });
    document.body.appendChild(button);

    var audio = document.createElement("audio");
    audio.src = audioSource;
    audio.volume = isMute ? 0 : volume;
    window.x = audio;

    setInterval(function () {
        if (document.querySelector("#pirateFortressShip:not(.invisible)")) {
            if (!audio.currentTime || audio.currentTime === audio.duration) audio.play();
        }
    }, 250);
})();