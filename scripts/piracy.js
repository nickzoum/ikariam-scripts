(function () {
    var isMute = localStorage.getItem("pirateMute") === "true";

    var volume = 0.15;
    var audioSource = "http://soundbible.com/grab.php?id=1630&type=wav";

    var buttonList = document.querySelector("#custom-button-list");
    if (!buttonList) {
        buttonList = document.createElement("div");
        buttonList.id = "custom-button-list";
        document.body.appendChild(buttonList);
    }
    var button = document.createElement("button");
    button.className = "custom-button";
    button.classList[isMute ? "remove" : "add"]("active");
    button.id = "toggle-ship";
    button.addEventListener("click", function () {
        isMute = !isMute;
        localStorage.setItem("pirateMute", isMute ? "true" : "false");
        audio.volume = isMute ? 0 : volume;
        button.classList[isMute ? "remove" : "add"]("active");
    });
    buttonList.appendChild(button);

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