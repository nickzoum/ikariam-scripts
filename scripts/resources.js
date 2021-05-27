(function () {
    setInterval(function () {
        var resourceDom = document.querySelector(".barbarianCityResources>.resources, .barbarianFleetResources>.resources");
        if (!resourceDom || resourceDom.querySelector("li.custom")) return;
        var resources = resourceDom.querySelectorAll("li:not(.gold):not(.custom)");
        var total = [].reduce.call(resources, function (total, res) { return total + +res.textContent.replace(/[^0-9]/g, ""); }, 0);
        var totalDom = document.createElement("li");
        totalDom.className = "multi_sulfur custom";
        totalDom.textContent = String(total).split("").reduceRight(function (res, char, index, list) {
            return char + ((index !== list.length - 1 && (list.length - index) % 3 === 1) ? "," : "") + res;
        }, "");
        resourceDom.appendChild(totalDom);
        var boatDom = document.createElement("li");
        boatDom.className = "transporters custom";
        boatDom.textContent = Math.ceil(total / 500);
        resourceDom.appendChild(boatDom);
    }, 250);

    setInterval(setNeededTip, 250);

    setInterval(function () {
        var spyText = document.querySelector("#js_spiesInsideText:not(.with-safe-noted)");
        if (!spyText) return;
        spyText.classList.add("with-safe-noted");
        var newSpan = document.createElement("span");
        var total = [].reduce.call(document.querySelectorAll(".warehouse"), function (result, dom) {
            return result + (+(([].filter.call(dom.classList, function (className) { return /^level\d+$/.test(className); })[0] || "0").replace(/[^\d]/g, "")) || 0) * 480;
        }, 100);
        newSpan.textContent = total + " safe";
        spyText.appendChild(newSpan);
    }, 250);

    function setNeededTip() {
        document.querySelectorAll("li[title].red.bold:not(.text-edited)").forEach(function (li) {
            var resource = document.querySelector("#resources_" + li.classList[0] + ">span:first-child");
            if (resource instanceof HTMLElement) {
                var num = +resource.textContent.replace(/^\s+|\s+$/g, "").replace(/\,/g, "");
                if (typeof num !== "number" || !num) num = 0;
                var liNum = li.lastChild.textContent.replace(/^\s+|\s+$/g, "").replace(/\,/g, "");
                li.setAttribute("title", num - liNum);
                li.classList.add("text-edited");
                li.addEventListener("click", function () {
                    li.textContent = liNum - num;
                });
            }
        });
    }
})();