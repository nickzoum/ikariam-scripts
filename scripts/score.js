(function () {
    var url = "https://s45-en.ikariam.gameforge.com/index.php";

    var types = {
        "Total": "score",
        "Builder": "building_score_main",
        "Scientists": "research_score_main",
        "Generals": "army_score_main",
        "Offensive": "offense",
        "Defensive": "defense",
        "Donations": "donations"
    };

    function sendRequest(userName, type) {
        return new Promise(function (resolve) {
            var data = {
                highscoreType: type,
                offset: -1,
                view: "highscore",
                sbm: "Submit",
                searchUser: userName,
                backgroundView: "worldmap_iso",
                templateView: "highscore",
                actionRequest: ikariam.model.actionRequest,
                ajax: 1
            };
            dataText = Object.keys(data).map(function (key) {
                return key + "=" + encodeURIComponent(data[key]);
            }).join("&");
            userName = userName.replace(/(^\s+)|(\s+$)/g, "").toLowerCase();
            $.ajax({
                url: url,
                method: "POST",
                data: dataText,
                success: function (data) {
                    var dom = document.createElement("div");
                    dom.innerHTML = JSON.parse(data).filter(function (group) {
                        return group[0] === "changeView";
                    })[0][1][1];
                    resolve([].slice.call(dom.querySelectorAll("table.highscore>tbody>tr:not(:first-child)")).filter(function (row) {
                        return getRowName(row).toLowerCase() === userName;
                    })[0].querySelector("td.score").textContent.replace(/[^\d]/g, ""));
                }
            });
        });
    }

    function getRowName(row) {
        return row.querySelector("td.name>a").lastChild.textContent.replace(/(^\s+)|(\s+$)/g, "");
    }

    function getUserInfo(userName) {
        return new Promise(function (resolve) {
            var result = {};
            Object.keys(types).forEach(function (key, index, list) {
                setTimeout(function () {
                    sendRequest(userName, types[key]).then(function (scoreValue) {
                        result[key] = +scoreValue;
                        if (Object.keys(result).length !== list.length) return;
                        resolve({
                            "score": {
                                "builder": result.Builder,
                                "generals": result.Generals,
                                "scientists": result.Scientists,
                                "population": result.Total - (result.Builder + result.Generals + result.Scientists),
                                "total": result.Total
                            },
                            "military": {
                                "offensive": result.Offensive,
                                "defensive": result.Defensive
                            },
                            "donations": result.Donations
                        });
                    });
                }, Math.random() * 1E3 * 60 * delayCount | 0);
            });
        });
    }

    //var list = ["Saitama", "Flamma", "Loxley", "Mac", "zblokasniper", "A17", "yashu", "Lucifer", "Celestial", "Orkbasher"], map = {};
    var list = ["zFrenchy"], map = {}, delayCount = list.length - 1;
    list.forEach(function (name) {
        getUserInfo(name).then(function (scores) {
            map[name] = scores;
            if (Object.keys(map).length !== list.length) return;
            window.x = JSON.stringify(map, jsonFilter, 4);
            alert("Done");
        });
    });

    function jsonFilter(key, value) {
        return value;
    }

})();

(function () {

    var data = {
        "DioZZ": {
            "score": {
                "builder": "69",
                "generals": "0",
                "scientists": "16",
                "population": -68665,
                "total": "351"
            },
            "military": {
                "offensive": "0",
                "defensive": "0"
            },
            "donations": "5"
        }
    };

    function getLocations(userName) {
        return new Promise(function (resolve) {
            userName = userName.replace(/(^\s+)|(\s+$)/g, "").toLowerCase();
            $.ajax({
                url: "https://ikalogs.ru/common/report/index/",
                method: "POST",
                data: "report=User_WorldFind&order=asc&sort=nick&start=0&limit=25&query=" + encodeURIComponent("page=1&server=2&world=45&search=city&nick=" + userName),
                success: function (data) {
                    resolve(data.body.rows.filter(function (row) {
                        return row.player_name.replace(/(^\s+)|(\s+$)/g, "").toLowerCase() === userName;
                    }).map(function (row) {
                        return row.x + ":" + row.y;
                    }));
                }
            });
        });
    }

    var remaining = Object.keys(data).length;
    Object.keys(data).forEach(function (name) {
        getLocations(name).then(function (locations) {
            data[name].locations = locations;
            if (--remaining) return;
            console.log(data);
            console.log(JSON.stringify(data, jsonFilter, 4));
        });
    });

    function jsonFilter(key, value) {
        return value;
    }

})();