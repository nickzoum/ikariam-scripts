(function () {

    importScript("slow-boat.js", "slow-boat.css");

    function importScript(scriptURL, styleURL) {
        var rootURL = "https://raw.githubusercontent.com/nickzoum/ikariam-scripts/main/";
        scriptURL = rootURL + "scripts/" + scriptURL;
        styleURL = rootURL + "styles/" + styleURL;
        var cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.href = styleURL;
        var script = document.createElement("script");
        script.src = scriptURL;
        document.head.appendChild(cssLink);
        document.body.appendChild(script);
    }
})();