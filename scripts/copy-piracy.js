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
        getPoints().then(copyText);
    });

    function getPoints() {
        return new Promise(function (resolve, reject) {
            getList().then(function (list) {
                list = list.filter(function (item) {
                    return item.cityId !== bgViewData.currentCityId;
                }).map(function (item) {
                    return "`" +item.name + ": " + item.capturePoints + "` " + location.origin + "/?view=island&cityId=" + item.cityId + "";
                }).join("\n");
                resolve(list);
            }).catch(function (err) { reject(err); });
        });
    }

    function copyText(text) {
        var input = document.createElement("textarea");
        document.body.appendChild(input);
        input.textContent = text;
        input.focus();
        input.selectionStart = 0;
        input.selectionEnd = input.value.length;
        document.execCommand("copy");
        document.body.removeChild(input);
    }


    function getList() {
        var city = bgViewData.currentCityId, request = ikariam.model.actionRequest;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "?view=pirateFortress&city=" + city + "&templateView=pirateFortress&backgroundView=city&position=17&ajax=1&activeTab=tabBootyQuest&currentCityId=" + city + "&actionRequest=" + request,
                type: "POST",
                error: function () { },
                success: function (result) {
                    if (typeof result === "string") {
                        try { result = JSON.parse(result); }
                        catch (err) { result = []; }
                    }
                    if (!(result instanceof Array)) return reject();
                    result = result.find(function (item) {
                        if (!(item instanceof Array)) return;
                        return item[0] === "updateTemplateData";
                    });
                    if (!result) return reject();
                    result = result[1];
                    if (!result) return reject();
                    result = result.load_js;
                    if (!result) return reject();
                    result = result.params;
                    if (!result) return reject();
                    try { resolve(JSON.parse(result).highscore); }
                    catch (err) { reject(err); }
                }
            });
        });
    }

})();