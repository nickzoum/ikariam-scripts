(function CopyTownIIFE() {

    setInterval(updateBlock, 250);

    function updateBlock() {
        var oldBlock = document.querySelector("#js_selectedCityActionCopy>a");
        if (oldBlock) return;
        var reference = document.querySelector("#js_selectedCityAction10>a");
        if (!reference) return;
        var cityID = getLocation();
        if (typeof cityID !== "string" || !cityID) return;
        var text = location.origin + "/?view=island&cityId=" + cityID;
        var newBlock = document.createElement("li");
        newBlock.id = "js_selectedCityActionCopy";
        newBlock.title = "Copy Link";
        var link = document.createElement("a");
        link.href = text;
        link.addEventListener("click", function (event) {
            event.preventDefault();
            copyText(text);
        });
        link.className = "smallFont";
        link.appendChild(new Text("Copy Link"));
        newBlock.appendChild(link);
        reference.parentElement.parentElement.appendChild(newBlock);
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

    function getLocation() {
        var link = document.querySelector(".cityLocation.city.selected>.link_img");
        if (!(link instanceof HTMLAnchorElement) || typeof link.href !== "string") return;
        var cityID = new URL(link.href).searchParams.get("cityId");
        if (typeof cityID === "string" && cityID) return cityID;
        var href = link.parentElement.getAttribute("saved-href");
        if (typeof href !== "string" || !href) return;
        cityID = new URL(location.origin + "/" + href).searchParams.get("destinationCityId");
        return typeof cityID === "string" && cityID ? cityID : null;
    }
})();