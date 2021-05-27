(function CopyPiracyIIFE() {

    var buttonList = document.querySelector("#custom-button-list");
    if (!buttonList) {
        buttonList = document.createElement("div");
        buttonList.id = "custom-button-list";
        document.body.appendChild(buttonList);
    }
    var button = document.createElement("button");
    button.className = "custom-button";
    buttonList.appendChild(button);
    button.id = "finder-button";
    button.addEventListener("click", function () {
        var text = getPoints();
        if (text) copyText(text);
        else alert("Open fortress first");
    });

    function getPoints() {
        return [].slice.call(document.querySelectorAll("#pirateHighscore>li")).map(function (li) {
            var pointsDom = li.querySelector(".pirateBooty"), link = li.querySelector("a");
            if (!pointsDom || !link) return;
            return {
                points: pointsDom.textContent.replace(/[^\d]/g, ""),
                name: link.textContent,
                isClose: link.parentElement.classList.contains("bold")
            };
        }).filter(Boolean).map(function (item) {
            return item.name + ": " + item.points;
        }).join("  ");
    }

    function copyText(text) {
        var input = document.createElement("input");
        document.body.appendChild(input);
        input.value = text;
        input.focus();
        input.selectionStart = 0;
        input.selectionEnd = input.value.length;
        document.execCommand("copy");
        document.body.removeChild(input);
    }

})();