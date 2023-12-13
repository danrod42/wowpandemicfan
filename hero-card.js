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

    const factionOrder = ['alliance', 'explorers', 'horde', 'hs', 'wyrmrest', 'scarlet', 'argent', 'ebon-blade', 'kirin-tor'];
    const grid = new GridEditor(document.querySelector('.grid-wrapper'));
    grid.createMenuItems(
        'hero',
        heroConfigs,
        (i, j) => factionOrder.indexOf(heroConfigs[i].faction) - factionOrder.indexOf(heroConfigs[j].faction),
        c => c.heroName.split(' ')[0],
        c => c.heroName,
        c => c.faction
    );
    grid.enableEdition();

    let heroesToDisplay = getHeroesToDisplay();
    let hoverDivs = document.querySelectorAll('.hover-div');
    let numberOfDisplayedHeroes = 0;
    for (let heroToDisplay of heroesToDisplay)
        addHero(heroConfigs.findIndex(hc => hc.heroName.includes(heroToDisplay)), hoverDivs[numberOfDisplayedHeroes++]);

});
