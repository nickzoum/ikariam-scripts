(function ColorsIIFE() {

    var allies = ["DARK", "ASN"], regex = /\[(DARK|ASN)\]$/;

    setInterval(updateBlocks, 250);

    function updateBlocks() {
        var citiDoms = document.querySelectorAll(".cityLocation.city:not(.cityLocationScroll):not(.recolored), .cityLocation.buildplace:not(.cityLocationScroll):not(.recolored)");
        var cities = ikariam.backgroundView.screen.data.cities;
        if (!cities || citiDoms.length !== cities.length) return;
        [...citiDoms].map(function (cityDom, index) {
            var cityInfo = cities[index] || {};
            cityDom.classList.add("recolored");
            if (allies.includes(cityInfo.ownerAllyTag)) cityDom.classList.add("ally");
        });
        var fleets = document.querySelectorAll(".fleetAction.foreignBlocker:not(.recolored)");
        var occupied = document.querySelectorAll(".occupied.foreignOccupier:not(.recolored)");
        [...fleets].forEach(function (dom) {
            dom.classList.add("recolored");
            if (!regex.test(dom.title)) return;
            dom.classList.remove("foreignBlocker");
            dom.classList.add("allyBlocker");
        });
        [...occupied].forEach(function (dom) {
            dom.classList.add("recolored");
            if (!regex.test(dom.title)) return;
            dom.classList.remove("foreignOccupier");
            dom.classList.add("allyOccupier");
        });
    }
})();