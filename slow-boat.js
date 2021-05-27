(function SlowBoatIIFE() {

    var idCounter = 0, globalID;

    setInterval(function () {
        var general = document.querySelector("#header #advisors #advMilitary .normalalert");
        if (!general) return;
        general.className = "normal";
        var id = ++idCounter;
        globalID = id;
        checkStatus().then(function (result) {
            if (id !== globalID) return;
            if (result.slowboatCount) {
                general.classList.add("custom-slow-attack");
            }
            if (result.realAttackCount) {
                general.classList.add("custom-attack");
            }
        }).catch(function () { });
    }, 250);


    function checkStatus() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "?view=militaryAdvisor&templateView=cityMilitary&ajax=1&actionRequest=" + 1,
                type: "POST",
                error: function () { },
                success: function (result) {
                    if (typeof result === "string") {
                        try { result = JSON.parse(result); }
                        catch (err) { result = []; }
                    }
                    if (!(result instanceof Array)) return reject();
                    var changeViewItem = result.find(function (item) {
                        if (!(item instanceof Array)) return;
                        return item[0] === "changeView";
                    });
                    if (!changeViewItem) return reject();
                    var militaryStuff = changeViewItem.find(function (item) {
                        if (!(item instanceof Array)) return;
                        return item[0] === "militaryAdvisor";
                    });
                    if (!militaryStuff) return reject();
                    militaryStuff = militaryStuff[militaryStuff.length - 1];
                    if (!militaryStuff || typeof militaryStuff !== "object") return reject();
                    militaryStuff = militaryStuff.viewScriptParams;
                    if (!militaryStuff || typeof militaryStuff !== "object") return reject();
                    var actions = militaryStuff.militaryAndFleetMovements;
                    if (!(actions instanceof Array)) return reject();
                    var slowboatCount = 0, realAttackCount = 0;
                    actions.forEach(function (action) {
                        if (!action.isHostile || !action.hideUnits) return;
                        if (action.army.amount) {
                            if (action.army.amount === 1 && (action.fleet.amount === 1 || !action.fleet.amount)) slowboatCount += 1;
                            else realAttackCount += 1;
                            return;
                        }
                        if (action.fleet.amount === 1) slowboatCount += 1;
                        else realAttackCount += 1;
                    });
                    resolve({ slowboatCount: slowboatCount, realAttackCount: realAttackCount });
                }
            });
        });
    }
})();