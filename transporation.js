(function (exports) {

    var resourcesIn = {}, resourcesOut = {};

    exports.reloadPage = reloadPage;
    exports.getData = getData;
    return exports;

    function getData() {
        var result = {};
        for (var index = 0; index < 2; index++) {
            var block = index ? resourcesIn : resourcesOut;
            Object.keys(block).forEach(function (personName) {
                var personDates = block[personName];
                Object.keys(personDates).forEach(function (date) {
                    var personData = personDates[date];
                    Object.keys(personData).forEach(function (resource) {
                        result[personName] = result[personName] || {};
                        result[personName][resource] = result[personName][resource] || 0;
                        result[personName][resource] += (index * 2 - 1) * personData[resource];
                    });
                });
            });
        }
        return result;
    }

    function reloadPage() {
        [].forEach.call(document.querySelectorAll("table#inboxCity>tbody>tr[class]:not(.pgnt)"), function (row) {
            var children = [].slice.call(row.children);
            if (children[0].childElementCount !== 1 || children[0].firstElementChild.getAttribute("title") !== "Goods") return;
            var townName = children[1].textContent.replace(/\s/g, "");
            var date = children[2].textContent.replace(/\s/g, "");
            var list = children[3].querySelectorAll("a");
            if (list.length !== 2) return;
            var from = list[0].textContent.replace(/\s/g, ""), to = list[1].textContent.replace(/\s/g, "");
            if (townName === from) {
                var result = resourcesOut;
                var other = to;
            } else {
                result = resourcesIn;
                other = from;
            }
            var person = result[other];
            if (!person) result[other] = (person = {});
            if (date in person) return;
            person[date] = [].reduce.call(children[3].querySelectorAll("li.value"), function (result, item) {
                result[item.querySelector("img").getAttribute("title")] = +(item.textContent.replace(/[^\d]/g, ""));
                return result;
            }, {});
        });
        return getData();
    }

})(window.Transporation = {});