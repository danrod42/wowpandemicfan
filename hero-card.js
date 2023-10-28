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

function menuItemClick(editButton) {
    addHero(editButton.dataset.heroId, editButton.parentElement.parentElement);
    editButton.parentElement.style.display = 'none';
}

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
    // create edit items for each edit menu
    let factionOrder = ['alliance', 'explorers', 'horde', 'wyrmrest', 'hs', 'scarlet', 'argent', 'ebon-blade', 'kirin-tor']
    var sortedHeroConfigs = Array.from({ length: heroConfigs.length }, (_, idx) => idx);
    sortedHeroConfigs.sort((a, b) => factionOrder.indexOf(heroConfigs[a].faction) - factionOrder.indexOf(heroConfigs[b].faction));
    var menuItems = "";
    for (let id of sortedHeroConfigs) {
        let con = heroConfigs[id];
        let name = con.heroName.split(' ')[0];
        menuItems += `<span class="edit-button ${con.faction}" data-hero-id="${id}" onclick="menuItemClick(this)" title="${con.heroName}">➕️️ \u00A0${name}</span>`;
    }
    document.querySelectorAll('.edit-menu').forEach((editMenu) => {
        editMenu.innerHTML += menuItems;
    });

    let heroesToDisplay = getHeroesToDisplay();
    let hoverDivs = document.querySelectorAll('.hover-div');
    let numberOfDisplayedHeroes = 0;
    for (let heroToDisplay of heroesToDisplay)
        addHero(heroConfigs.findIndex(hc => hc.heroName.includes(heroToDisplay)), hoverDivs[numberOfDisplayedHeroes++]);
});
