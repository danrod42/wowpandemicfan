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
            const elements = document.querySelectorAll(customization.selector);
            for (let i = 0; i < elements.length; i++) {
                changeFontSize(elements[i], customization.fontSize);
            }
        }
    });
})

function addHero(heroId, parentElement) {
    // clone ref sheet
    let refSheet = document.querySelector('.hero-sheet');
    let newSheet = refSheet.cloneNode(true);

    // display new sheet
    newSheet.style.display = '';
    newSheet.setAttribute('data-hero-id', heroId);
    parentElement.appendChild(newSheet);

    // bind sheet
    new HeroSheet(heroConfigs[heroId], newSheet)
        .updateElements()
        .enableEdition();
}

window.addEventListener('load', function() {
    if (window.location.pathname.endsWith('hero-card.html')) {
        // render menu items with heroes page as initially active
        grid.renderEditMenus('heroes');
        grid.enableEdition();
        // display from url heroes then hero actions
        grid.displayFromUrl('collections', heroConfigs, 'collection', addHero);
        grid.displayFromUrl('collections', heroActionCardConfigs, 'collection', addHeroAction);
        grid.displayFromUrl('heroes', heroConfigs, 'heroName', addHero);
        grid.displayFromUrl('actions', heroActionCardConfigs, 'name', addHeroAction);
    }
});
