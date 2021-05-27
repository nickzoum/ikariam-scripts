(function () {
    setInterval(function () {
        var dom = document.querySelector("#tab_museumTreaties .header:not(.managed)");
        if (!dom) return;
        dom.classList.add("managed");
        var size = document.querySelectorAll("#tab_museumTreaties .page_link").length;
        var button = document.createElement("button");
        button.textContent = "Find Missing";
        dom.appendChild(button);
        button.addEventListener("click", function () {
            var lists = "0".repeat(size).split("").map(function () { return null; });
            lists.forEach(function (x, index) {
                getMuseumNames(index, function (list) {
                    lists[index] = list;
                    if (lists.filter(Boolean).length !== lists.length) return;
                    showAllianceMembers([].concat.apply([], lists));
                });
            });
        });
    }, 250);

    function showAllianceMembers(list) {
        var otherWindow = window.open("https://s43-en.ikariam.gameforge.com/index.php?view=highscore&showMe=1&searchOnlyAllies=1");
        otherWindow.addEventListener("load", function () {
            [].slice.call(otherWindow.document.querySelectorAll("#tab_highscore tr.ownally>td.name>a")).forEach(function (cell) {
                var name = cell.lastChild.textContent.replace(/^\s+|\s+$/g, "");
                if (list.includes(name)) cell.parentElement.parentElement.style.opacity = "0.20";
            });
            var self = otherWindow.document.querySelector("#tab_highscore tr.own");
            if (self) self.style.opacity = "0.2";
        });
    }

    function getMuseumNames(page, cb) {
        var link = document.querySelector(".building.museum a");
        if (!link) return;
        var iframe = document.createElement("iframe");
        iframe.src = link.href.replace("museum", "museumTreaties") + "&treatiesPage=" + page;
        document.body.appendChild(iframe);
        iframe.addEventListener("load", function () {
            setTimeout(function () {
                cb([].slice.call(iframe.contentDocument.querySelectorAll("#tab_museumTreaties tr:not(:first-child)")).map(function (row) {
                    return {
                        name: row.querySelector(".player").textContent,
                        alliance: row.querySelector(".ally").textContent
                    };
                }).filter(function (item) { return item.alliance === "DOOM"; }).map(function (item) {
                    return item.name.replace(/^\s+|\s+$/g, "");
                }));
                iframe.remove();
            }, 50);
        });
    }
})();
//[...document.querySelectorAll(".highscore tr:not([style]) td.name>a")].map(x => x.lastChild && x.lastChild.textContent).filter(Boolean).map(x => x.replace(/^\s+|\s+$/g, "")).join("\r\n")