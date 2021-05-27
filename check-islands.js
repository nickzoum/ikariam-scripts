
(function (index) {
    var title = [].slice.call(document.querySelectorAll(".wonder7+.tradegood2+.cities")).map(function (dom) {
        return dom.parentElement.title.replace(/[^\d:]/g, "").split(":");
    }).sort(function (a, b) {
        return (a[0] - b[0]) || a[1] - b[1];
    })[index];
    document.querySelector("#inputXCoord").value = title[0];
    document.querySelector("#inputYCoord").value = title[1];
    document.querySelector("#mapCoordInput input[name='submit']").click();
})(0);