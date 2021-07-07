(function ColorsIIFE() {

    setInterval(updateBlocks, 250);

    function updateBlocks() {
        var citiDoms = document.querySelectorAll(".cityLocation.city:not(.cityLocationScroll):not(.recolored), .cityLocation.buildplace:not(.cityLocationScroll):not(.recolored)");
        var cities = ikariam.backgroundView.screen.data.cities;
        if (citiDoms.length !== cities.length) return;
        [...citiDoms].map(function (cityDom, index) {
            var cityInfo = cities[index] || {};
            cityDom.classList.add("recolored");
            if (cityInfo.ownerAllyTag !== "DARK" && cityInfo.ownerAllyTag !== "ASN") return;
            cityDom.classList.add("ally");
        });
    }
})();