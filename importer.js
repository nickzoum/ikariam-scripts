(function () {

    importScript(null, "index.css");
    importScript("slow-boat.js", "slow-boat.css");
    importScript("copy-piracy.js", "copy-piracy.css");

    function importScript(scriptURL, styleURL) {
        var rootURL = "https://ezapp-ikariam-cdn.herokuapp.com/";

        if (styleURL) {
            var cssLink = document.createElement("link");
            cssLink.rel = "stylesheet";
            cssLink.href = rootURL + "styles/" + styleURL;
            document.head.appendChild(cssLink);
        }

        if (scriptURL) {
            var script = document.createElement("script");
            script.src = rootURL + "scripts/" + scriptURL;
            document.body.appendChild(script);
        }
    }
})();