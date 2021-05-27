(function () {
    var className = "toggle-clicked";

    addEventListener("click", function (event) {
        var target = event.target;
        while (target instanceof HTMLElement && !(target instanceof HTMLTableRowElement)) target = target.parentElement;
        if (!target) return;
        if (target.classList.contains(className)) target.classList.remove(className);
        else target.classList.add(className);
    });
})();