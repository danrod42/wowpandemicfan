function getHeroesToDisplay(defaultToCollection = false) {
    // default hero
    const urlParams = new URLSearchParams(window.location.search);
    let heroesToDisplay = [];
    if (urlParams.has('collections')) {
        let collectionParams = urlParams.get('collections').split(',');
        for (let param of collectionParams) {
            let c = collections.find(c => c.name.includes(param));
            if (c !== undefined)
                heroesToDisplay.push(...c.heroes);
        }
    }
    if (urlParams.has('heroes'))
        heroesToDisplay.push(...urlParams.get('heroes').split(','));
    if (heroesToDisplay.length == 0) {
        heroesToDisplay = defaultToCollection
            ? collections[Math.floor(Math.random() * collections.length)].heroes
            : [heroConfigs[Math.floor(Math.random() * heroConfigs.length)].heroName];
    }
    return heroesToDisplay;
}

class GridEditor {

    constructor(element) {
        this.element = element;
        this.displayIdx = 0;
    }

    displayFromUrl(urlParam, configs, searchField, addFn) {
        const urlParams = new URLSearchParams(window.location.search);
        let toDisplay = urlParams.has(urlParam)
            ? urlParams.get(urlParam).split(',')
            : [];
        for (let display of toDisplay) {
            let id = configs.findIndex(obj => obj[searchField].startsWith(display));
            if (id != -1)
                addFn(id, this.element.querySelectorAll('.hover-div')[this.displayIdx++]);
            if (this.displayIdx == 4) break;
        }
    }

    displayRandomIfGridIsEmpty(configs, addFn) {
        if (this.displayIdx == 0) {
            const id = Math.floor(Math.random() * configs.length);
            addFn(id, this.element.querySelectorAll('.hover-div')[0]);
        }
    }

    enableEdition() {
        // display either close sign or edit menu on hover based on the quest sheet's visibility
        this.element.querySelectorAll('.hover-div').forEach((hoverDiv) => {
            hoverDiv.addEventListener('mouseover', function() {
                const hasSheet = hoverDiv.querySelector('.reward-card, .quest-sheet, .hero-sheet') !== null;
                if (hasSheet) {
                    hoverDiv.querySelector('.close-sign').style.display = 'inline-block';
                } else {
                    hoverDiv.querySelector('.edit-menu').style.display = 'grid';
                }
            });
            hoverDiv.addEventListener('mouseout', function() {
                hoverDiv.querySelector('.close-sign').style.display = 'none';
                hoverDiv.querySelector('.edit-menu').style.display = 'none';
            });
        });

        // remove sheet when close is clicked
        this.element.querySelectorAll('.close-sign').forEach((closeSign) => closeSign.addEventListener('click', () => {
            closeSign.parentNode.querySelector('.reward-card, .quest-sheet, .hero-sheet').remove();
            closeSign.style.display = 'none'
        }));
    }
}