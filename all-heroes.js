window.addEventListener('load', function() {
    let heroesToDisplay = getHeroesToDisplay();
    createHeroListAndDisplayHeroes(
        c => localDefaults.silverCrescentAdded || !c.faction.includes('silver-crescent'),
        c => heroesToDisplay.includes(c.heroName) || heroesToDisplay.includes(c.heroName.split(' ')[0])
    );
});

function getHeroesToDisplay(defaultToCollection) {
    // default hero
    const urlParams = new URLSearchParams(window.location.search);
    let heroesToDisplay = [];
    if (urlParams.has('collections')) {
        let collectionParams = urlParams.get('collections').split(',');
        for (let param of collectionParams) {
            let collection = collections.find(c => c.name && c.name.includes(param));
            if (collection !== undefined)
                heroesToDisplay.push(...collection.heroes);
        }
    }
    if (urlParams.has('heroes'))
        heroesToDisplay.push(...urlParams.get('heroes').split(','));
    if (heroesToDisplay.length == 0)
        heroesToDisplay = collections[Math.floor(Math.random() * collections.length)].heroes;
    return heroesToDisplay;
}

function createHeroListAndDisplayHeroes(listFilterFn, displayFilterFn) {
    const checkboxList = document.querySelector('.list-of-heroes');
    for (var i = 0; i < heroConfigs.length; i++) {
        if (!listFilterFn(heroConfigs[i])) continue;
        // get hero names
        const heroName = heroConfigs[i].heroName;
        const heroAlias = heroConfigs[i].heroName.split(' ')[0];
        // Create checkbox input element
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = heroConfigs[i].heroName.split(' ')[0];
        checkbox.value = i;
        checkbox.checked = displayFilterFn(heroConfigs[i]);
        // checkbox change event
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                addHero(this.value);
            } else {
                removeHero(this.value);
            }
        });

        // Create label for the checkbox
        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(heroAlias));

        // Add checkbox and label to the container
        checkboxList.appendChild(label);

        // add hero
        if (displayFilterFn(heroConfigs[i]))
            addHero(i);
    };
}

var displayedHeroIds = [];

function addHero(heroId) {
    let refHeroSheet = document.querySelector('.hero-sheet');
    let heroSheet = cloneHeroElements(
        refHeroSheet,
        Math.floor(displayedHeroIds.length / 2) + 1,
        displayedHeroIds.length % 2 + 1,
        heroId
    );
    new HeroSheet(heroConfigs[heroId], heroSheet)
        .updateElements()
        .enableEdition(heroSheet);
    displayedHeroIds.push(heroId);
}

function removeHero(heroId) {
    document.querySelectorAll('[data-hero-id="' + heroId + '"]').forEach((element) => {
        element.remove();
    });
    // remove from list of displayed hero IDs
    displayedHeroIds = displayedHeroIds.filter(function(ele){
        return ele != heroId;
    });
    // shift grid cells
    for (let i = 0; i < displayedHeroIds.length; i++) {
        let heroId = displayedHeroIds[i];
        let row = Math.floor(i / 2) + 1;
        let col = i % 2 + 1;
        document.querySelectorAll('[data-hero-id="' + heroId + '"]').forEach((element) => {
            setGridRowCol(element, row, col);
        });
    }
}

function cloneHeroElements(refHeroSheet, row, col, heroId) {
    const heroSheet = refHeroSheet.cloneNode(true);
    heroSheet.style.display = '';
    heroSheet.setAttribute('data-hero-id', heroId);

    setGridRowCol(heroSheet, row, col);
    document.querySelector('.grid-wrapper').appendChild(heroSheet);
    return heroSheet;
}

function setGridRowCol(element, row, col) {
    element.style.gridRow = row;
    element.style.gridColumn = col;
}

function addSilverCrescentContent() {
    // if we have displayed the content, do nothing
    if (localDefaults.silverCrescentAdded)
        return;
    // add silver crescent content and display it
    createHeroListAndDisplayHeroes(
        c => c.faction.includes('silver-crescent'),
        c => c.faction.includes('silver-crescent'),
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