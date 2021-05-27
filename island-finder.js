(function () {
    var resourceTypes = ["Wine", "Marble", "Glass", "Sulfur"];

    var finderButton = document.createElement("button");
    finderButton.id = "finder-button";
    finderButton.addEventListener("click", showList);
    document.body.appendChild(finderButton);

    function showList() {
        var list, index;
        var panel = document.createElement("div");
        panel.id = "island-finder";
        var frame = document.createElement("iframe");
        frame.addEventListener("load", onFrameLoad);
        frame.src = document.querySelector("#js_worldMapLink>a[href]").href;

        panel.appendChild(frame);
        document.body.appendChild(panel);
        finderButton.remove();

        function onFrameLoad() {
            var id = setInterval(function () {
                if (!frame.contentDocument.querySelector(".wonder1")) return;
                clearInterval(id);
                onLoad();
            }, 250);
        }

        function onLoad() {
            list = getList(frame.contentDocument);
            if (!list || !list.length) return;
            next();
            var nextButton = document.createElement("button");
            nextButton.addEventListener("click", next);
            nextButton.id = "next-island";
            panel.appendChild(nextButton);
            var prevButton = document.createElement("button");
            prevButton.addEventListener("click", prev);
            prevButton.id = "prev-island";
            panel.appendChild(prevButton);
        }

        function next() {
            index += 1;
            if (!(index in list)) index = 0;
            showTile();
        }

        function prev() {
            index -= 1;
            if (!(index in list)) index = list.length - 1;
            showTile();
        }

        function showTile() {
            var text = "tile_" + list[index].tiles[0] + "_" + list[index].tiles[1];
            frame.contentWindow.ikariam.getScreen().clickIsland(text);
            setTimeout(function () { frame.contentWindow.ikariam.getScreen().clickIsland(text); });
        }
    }

    function getList(dom) {
        return [].slice.call(dom.querySelectorAll(".wonder1")).map(function (child) {
            var dom = child.parentElement, link = dom.querySelector("a"), good = dom.querySelector(".tradegood"), cities = dom.querySelector(".cities");
            return {
                tiles: [].splice.call(/^linkurl[_](\d+)[_](\d+)$/.exec(link && link.getAttribute("id") || "") || [], 1, 2),
                resource: resourceTypes[good && (1 + +good.className.replace(/[^\d]/g, ""))],
                description: dom.getAttribute("title"),
                count: +cities.textContent
            };
        });
    }

    showList();

})();