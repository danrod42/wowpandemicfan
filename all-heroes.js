window.addEventListener('load', function() {
    let heroesToDisplay = getHeroesToDisplay(true);
    const checkboxList = document.querySelector('.list-of-heroes');
    for (var i = 0; i < heroConfigs.length; i++) {
        // get hero names
        const heroName = heroConfigs[i].heroName;
        const heroAlias = heroConfigs[i].heroName.split(' ')[0];
        // Create checkbox input element
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = heroConfigs[i].heroName.split(' ')[0];
        checkbox.value = i;
        checkbox.checked = heroesToDisplay.includes(heroName) || heroesToDisplay.includes(heroAlias);
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
        if (heroesToDisplay.includes(heroName) || heroesToDisplay.includes(heroAlias))
            addHero(i);
    };
});

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
