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

function addSilverCrescentContent() {
    // if we have displayed the content, do nothing
    if (localDefaults.silverCrescentAdded)
        return;
    // add silver crescent content and display it
    const shortNameFn = c => c.shortName || c.heroName.split(' ')[0];
    grid.createMenuItems(
        'hero',
        heroConfigs,
        c => c.faction.includes('silver-crescent'),
        (a, b) => shortNameFn(a).localeCompare(shortNameFn(b)),
        shortNameFn,
        c => c.heroName,
        c => c.faction
    );
    // enable silver crescent faction
    if (!enabledFactions.includes('silver-crescent')) {
        const lastElement = enabledFactions[enabledFactions.length - 1];
        enabledFactions[enabledFactions.length - 1] = 'silver-crescent';
        enabledFactions.push(lastElement);
    }
    // remember we have added the content
    localDefaults.silverCrescentAdded = true;
}