/** Military Start */

(function () {

    var configuration = {
        soundLink: "http://soundbible.com/grab.php?id=1630&type=wav",
        soundVolume: 0.4,
        email: "zoumnick@gmail.com",
        delayMS: 30 * 1000,
        testingMode: false
    };

    var queries = {
        alertIcon: configuration.testingMode ? "#advMilitary #js_GlobalMenu_military" : "#advMilitary .normalalert, #advMilitary .premiumalert",
        advisor: "#militaryAdvisor",
        movements: "#js_MilitaryMovementsFleetMovementsTable table tr:not(:first-child)"
    };

    var sentMail = false;

    var waitingRequest = false;

    var Email = {
        /**
         * 
         * @param {{Host: string, Username: string, Password: string, To: string, From: string, Subject: string, Body: string}} properties 
         * @returns {Promise<string>}
         */
        send: function (properties) {
            return new Promise(function (resolve) {
                properties.nocache = Math.floor(1e6 * Math.random() + 1);
                properties.Action = "Send";
                Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", JSON.stringify(properties), resolve);
            });
        },
        /**
         * @param {string} url 
         * @param {string} data 
         * @param {(response: string) => void} callback 
         * @returns {void}
         */
        ajaxPost: function (url, data, callback) {
            var request = Email.createCORSRequest("POST", url);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.onload = function () {
                var response = request.responseText;
                if (typeof callback === "function") callback(response);
            };
            request.send(data);
        },
        /**
         * @param {string} url
         * @param {(response: string) => void} callback 
         * @returns {void}
         */
        ajax: function (url, callback) {
            var request = Email.createCORSRequest("GET", url);
            request.onload = function () {
                var response = t.responseText;
                if (typeof callback === "function") callback(response);
            };
            request.send();
        },
        /**
         * @param {string} method
         * @param {string} url
         * @returns {XMLHttpRequest}
         */
        createCORSRequest: function (method, url) {
            var request = new XMLHttpRequest();
            if ("withCredentials" in request) request.open(method, url, true);
            else if (typeof XDomainRequest !== "undefined") {
                request = new XDomainRequest();
                request.open(method, url);
            }
            else request = null;
            return request;

        }
    };

    if (document.readyState === "complete") onLoad();
    else addEventListener("load", onLoad);

    function onLoad() {
        setInterval(function () {
            if (sentMail) return;
            var alertIcon = document.querySelector(queries.alertIcon);
            if (!(alertIcon instanceof HTMLElement)) return sentMail = false;
            if (!waitingRequest) {
                waitingRequest = true;
                ajaxHandlerCall('?view=militaryAdvisor&activeTab=tab_militaryAdvisor');
                return;
            }
            waitingRequest = false;
            var advisor = document.querySelector(queries.advisor);
            if (!(advisor instanceof HTMLElement)) return sendEmail("You are getting attacked/raided by an unknown player");
            var movements = [].slice.call(advisor.querySelectorAll(queries.movements));
            sendEmail("<table><tbody><tr>" + movements.map(function (row) {
                return "<td>" + [].map.call(row.children, function (cell, index) {
                    var actions = [
                        function () {
                            var image = getImage(cell.firstElementChild);
                            if (image) return "<img src=" + image + "/>";
                        },
                        function () { return cell.textContent; },
                        function () { return cell.textContent; },
                        function () { return cell.textContent; },
                        function () { },
                        function () { return cell.textContent; },
                        function () {
                            var image = getImage(cell);
                            if (image) return "<img src=" + image + "/>";
                        },
                        function () { return cell.textContent; }
                    ];
                    if (typeof actions[index] === "function") {
                        var result = actions[index]();
                        return result || "";
                    } else return "";
                }).join("</td><td>") + "</td>";
            }).join("</tr><tr>") + "</tr></tbody></table>");
        }, 5E3);
    }

    function getImage(dom) {
        var result = /^url\(([^\)]+)\)$/.exec(getComputedStyle(dom).backgroundImage);
        return result && result[1];
    }

    function sendEmail(message) {
        sentMail = true;
        var audio = document.createElement("audio");
        audio.src = configuration.soundLink;
        audio.volume = configuration.soundVolume;
        audio.loop = true;
        audio.play();
        var sent = false, dt = Date.now();
        var background = document.createElement("div");
        background.setAttribute("style", "position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); z-index: 999999;");
        var dom = document.createElement("div");
        dom.setAttribute("style", "position: fixed; top: calc(50% - 70px); left: calc(50% - 160px); width: 320px; height: 140px; background-color: white; border: 1px solid black; border-radius: 4px; padding: 12px 20px; display: flex; flex-direction: column;");
        background.appendChild(dom);
        document.body.appendChild(background);
        var title = document.createElement("div");
        title.setAttribute("style", "margin: 4px 8px; text-align: center; font-size: 18px; border-bottom: 1px solid black;");
        title.textContent = "You are being attacked! Send e-mail?";
        dom.appendChild(title);
        var timer = document.createElement("div");
        timer.textContent = "Sending in 30s";
        timer.setAttribute("style", "text-align: center; padding: 10px 2px; font-size: 14px;");
        dom.appendChild(timer);
        var buttons = document.createElement("div");
        buttons.setAttribute("style", "display: flex; flex-direction: row; margin: auto 8px 4px 8px;");
        dom.appendChild(buttons);
        var ok = document.createElement("button");
        var cancel = document.createElement("button");
        ok.addEventListener("click", onSend);
        cancel.addEventListener("click", onCancel);
        ok.textContent = "Send";
        cancel.textContent = "Cancel";
        ok.setAttribute("style", "flex: auto;");
        cancel.setAttribute("style", "flex: auto;");
        buttons.appendChild(ok);
        buttons.appendChild(cancel);
        var intervalID = setInterval(function () {
            var timeLeft = configuration.delayMS - Date.now() + dt;
            if (timeLeft <= 0) onSend();
            else timer.textContent = "Sending in " + (timeLeft / 1000).toFixed(0) + "s";
        }, 1E3);

        function onCancel() {
            audio.pause();
            if (background.parentElement === document.body) document.body.removeChild(background);
            if (sent) return;
            sent = true;
            clearInterval(intervalID);
        }

        function onSend() {
            if (sent) return;
            audio.pause();
            sent = true;
            clearInterval(intervalID);
            ok.remove();
            timer.textContent = "Sending ...";
            Email.send({
                Host: "smtp.gmail.com",
                Username: "ikariamdoomalert@gmail.com",
                Password: "doom_1234!",
                To: configuration.email,
                From: "ikariamdoomalert@gmail.com",
                Subject: "Ikariam Military Warning",
                Body: message,
            }).then(function (message) {
                timer.textContent = "Result: " + message;
            }).catch(function (err) {
                timer.textContent = "Failed to send email: " + err;
            });
        }
    }
})();

/** Military End */