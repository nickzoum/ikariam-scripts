(function CopyPiracyIIFE() {

    var button = document.createElement("button");
    document.body.appendChild(button);
    button.id = "finder-button";
    button.addEventListener("click", function () {
        copyText(getPoints());
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