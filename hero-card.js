new RotatableImage(
    document.querySelector('.faction-image'),
    ['alliance', 'horde', 'argent', 'explorers', 'kirin-tor', 'scarlet', 'ebon-blade', 'wyrmrest', 'hs']
);
new RotatableImage(
    document.querySelector('.hero-card-bottom'),
    ['6', '7', '8']
);
new RotatableImage(
    document.querySelector('.starting-location-image'),
    ['green', 'purple', 'red']
);

document.querySelector("textPath").addEventListener("click", function(event) {
    // Show the popup container and input element
    let popupInput = document.querySelector(".starting-location-input")
    popupInput.style.display = "block";
    // Set focus to the input element
    popupInput.focus();
    popupInput.select();
    // Prevent the event from propagating to outer div
    event.stopPropagation();
});

let updateLocationTextAndHideInput = function() {
    let popupInput = document.querySelector(".starting-location-input");
    var text = popupInput.value || 'Enter starting location';
    if (text.length < 13)
        text = '\xa0'.repeat(13 - text.length) + text;
    document.querySelector("textPath").textContent = text.toUpperCase();
    popupInput.style.display = 'none';
}

document.querySelector(".starting-location-input").addEventListener("blur", function() {
    updateLocationTextAndHideInput();
});

document.querySelector(".starting-location-input").addEventListener('keypress', function() {
    if (event.keyCode === 13) {
        updateLocationTextAndHideInput();
    }
});

document.querySelector('.hero-name').addEventListener('input', function() {
    document.title = 'Unofficial WoW Pandemic Hero - ' + this.textContent;
});

// apply per-browser customizations
window.addEventListener('load', function() {

    function changeFontSize(element, inc) {
        const currentFontSize = parseFloat(getComputedStyle(element).fontSize);
        const newFontSize = currentFontSize + inc;
        element.style.fontSize = `${newFontSize}px`;
    }

    function detectBrowser() {
        let userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('opr'))
            return 'opera';
        if (userAgent.includes('firefox'))
            return 'firefox';
        if (userAgent.includes('edg'))
            return 'edge';
        if (userAgent.includes('chrome'))
            return 'chrome';
        if (userAgent.includes('safari'))
            return 'safari';
        return 'other';
    }

    let perBrowserCustomizations = [
        {browser: 'firefox', selector: '.hero-name, .hero-quote', fontSize: -1},
        {browser: 'safari', selector: '.hero-name', fontSize: -2},
        {browser: 'safari', selector: '.hero-title, .hero-quote', fontSize: -1},
    ];

    let browser = detectBrowser();
    perBrowserCustomizations.forEach((customization) => {
        if (customization.browser === detectBrowser()) {
            var elements = document.querySelectorAll(customization.selector);
            for (var i = 0; i < elements.length; i++) {
                changeFontSize(elements[i], customization.fontSize);
            }
        }
    });
})
