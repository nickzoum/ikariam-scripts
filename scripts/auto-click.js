
(function () {
    var isMute = localStorage.getItem("pirateMute") === "true";

    var volume = 0.15;
    var audioSource = "http://soundbible.com/grab.php?id=1630&type=wav";

    //var min = 15 * 60E3, max = 16 * 60E3, interval = 10E3, buttonIndex = 3;
    //var min = 7.5 * 60E3, max = 8 * 60E3, interval = 5E3, buttonIndex = 2;
    var min = 2.5 * 60E3, max = 2.8 * 60E3, interval = 5E3, buttonIndex = 1;
    var intervalID, nextPress = Date.now(), needsConvert, nextConvert;

    var button = document.createElement("button");
    button.classList[isMute ? "remove" : "add"]("active");
    button.id = "toggle-ship";
    button.addEventListener("click", function () {
        isMute = !isMute;
        localStorage.setItem("pirateMute", isMute ? "true" : "false");
        audio.volume = isMute ? 0 : volume;
        button.classList[isMute ? "remove" : "add"]("active");
        if (isMute) clearInterval(intervalID);
        else intervalID = setInterval(onIteration, interval);
    });
    document.body.appendChild(button);
    if (!isMute) intervalID = setInterval(onIteration, interval);

    var audio = document.createElement("audio");
    audio.src = audioSource;
    audio.volume = isMute ? 0 : volume;
    window.x = audio;

    function onIteration() {
        var captcha = document.querySelector("#pirateFortress .captchaImage");
        var button = document.querySelector("#pirateFortress table tbody>tr:nth-child(" + buttonIndex + ") a");
        var runMenu = document.querySelector("#js_tabBootyQuest");
        var convertMenu = document.querySelector("#js_tabCrew");
        var slidermax = document.querySelector("#pirateFortress #CPToCrewSliderMax");
        var convertSubmit = document.querySelector("#pirateFortress #CPToCrewSubmit");
        if (captcha) {
            if (!audio.currentTime || audio.currentTime === audio.duration) audio.play();
            return;
        }
        if (nextConvert && nextConvert < Date.now()) {
            nextConvert = undefined;
            needsConvert = true;
        }
        if (needsConvert) {
            if (!convertMenu) return openFortress();
            if (convertMenu.classList.contains("selected")) {
                if (slidermax && convertSubmit) {
                    slidermax.click();
                    convertSubmit.click();
                }
                nextConvert = Date.now() + Math.random() * 37 + 14E3;
                needsConvert = false;
                if (runMenu) runMenu.click();
                else openFortress();
            } else {
                convertMenu.click();
            }
            return;
        }
        if (nextPress > Date.now()) return;
        if (button) {
            if (!runMenu.classList.contains("selected")) return runMenu.click();
            if (button.classList.contains("button_disabled")) {
                if (runMenu) runMenu.click();
            } else {
                nextPress = Date.now() + min + Math.random() * (max - min);
                needsConvert = true;
                button.click();
            }
            return;
        }
        if (runMenu) runMenu.click();
        else openFortress();
    }

    function openFortress() {
        var fortress = document.querySelector("#js_CityPosition17Link");
        var showTown = document.querySelector("#js_cityLink");
        var towns = document.querySelector("#js_citySelectContainer>span");
        var firstTown = document.querySelector("#dropDown_js_citySelectContainer ul>li");
        if (!fortress) return showTown ? showTown.click() : void 0;
        if (fortress.title === "Free Building Ground") {
            if (towns) {
                towns.click();
                if (firstTown) setTimeout(firstTown.click.bind(firstTown), 0);
            }
            return;
        }
        fortress.click();
    }
})();