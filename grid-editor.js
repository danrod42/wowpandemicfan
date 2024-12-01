class GridEditor {

    constructor(element) {
        this.element = element;
        this.displayIdx = 0;
        this.initCells();
    }

    initCells() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('cells')) {
            this.numberOfCells = urlParams.get('cells');
        } else {
            this.numberOfCells = 4;
            return;
        }

        let refSheet = this.element.querySelector('.hover-div');
        this.element.querySelectorAll('.hover-div').forEach(e => e.remove());
        for (let i = 0; i < this.numberOfCells; i++) {
            let newSheet = refSheet.cloneNode(true);
            newSheet.style.display = '';
            this.element.appendChild(newSheet);
        }
    }

    // Create edit items for each config and append to edit menu
    createMenuItems(entityType, configs, filterFn, sortFn, shortNameFn, longNameFn, cssClassFn) {
        // filter and sort config indices
        let ids = configs
            .map((_, idx) => idx)
            .filter(idx => filterFn(configs[idx]))
            .sort((i, j) => sortFn(configs[i], configs[j]));

        // group by short name
        let groupedByShortName = ids.reduce((map, id) => {
            let key = shortNameFn(configs[id]);
            map.set(key, (map.get(key) || []).concat(id));
            return map;
        }, new Map());

        // generate menu items using a for loop
        let menuItems = "";
        for (let id of ids) {
            let config = configs[id];
            let shortName = shortNameFn(config);
            let cssClass = cssClassFn(config);
            let idList = groupedByShortName.get(shortName);

            if (!idList) continue;

            let idsStr = idList.join(',');
            let longName = [...new Set(idList.map(id => longNameFn(configs[id])))].join(', ');
            if (idList.length > 1) longName = `(${idList.length} ${GridEditor.pluralizeEntityType(entityType)}) ${longName}`;

            groupedByShortName.delete(shortName);

            let lenLimit = idsStr.includes(',') ? 17 : 21;
            if (shortName.length > lenLimit) shortName = shortName.substring(0, lenLimit - 1) + '...';
            if (idList.length > 1) shortName += ' 🎲';

            menuItems += `<span class="edit-button ${cssClass}" data-${entityType}-id="${idsStr}" onclick="menuItemClick(this)" title="${longName}">${shortName}</span>`;
        }

        // append to edit menu
        this.element.querySelectorAll('.edit-menu').forEach(editMenu => {
            editMenu.insertAdjacentHTML('beforeend', menuItems);
        });
    }

    static pluralizeEntityType(entityType) {
        return entityType == 'hero' ? 'heroes' : entityType + 's';
    }

    displayFromUrl(urlParam, configs, searchField, addFn) {
        const urlParams = new URLSearchParams(window.location.search);
        let toDisplay = urlParams.has(urlParam)
            ? urlParams.get(urlParam).split(',')
            : [];
        for (let display of toDisplay) {
            let id = configs.findIndex(obj => obj[searchField] && obj[searchField].startsWith(display));
            if (id != -1)
                addFn(id, this.element.querySelectorAll('.hover-div')[this.displayIdx++]);
            if (this.isFull()) break;
        }
    }

    displayRandom(configs, addFn) {
        if (this.isFull()) return;
        const id = Math.floor(Math.random() * configs.length);
        addFn(id, this.element.querySelectorAll('.hover-div')[this.displayIdx++]);
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

    isEmpty() {
        return this.displayIdx == 0;
    }

    isFull() {
        return this.displayIdx == this.numberOfCells;
    }
}

function getHeroesToDisplay(defaultToCollection = false) {
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
    if (heroesToDisplay.length == 0) {
        heroesToDisplay = defaultToCollection
            ? collections[Math.floor(Math.random() * collections.length)].heroes
            : [heroConfigs[Math.floor(Math.random() * heroConfigs.length)].heroName];
    }
    return heroesToDisplay;
}

function menuItemClick(editButton) {
    let datasetPropToAddFn = {
        'heroId': (a, b) => addHero(a, b),
        'questId': (a, b) => addQuest(a, b),
        'rewardId': (a, b) => addRewardCard(a, b),
    };
    let datasetProp = Object.keys(datasetPropToAddFn).find(prop => prop in editButton.dataset);

    let ids = editButton.dataset[datasetProp].split(',');
    let id = ids[Math.floor(Math.random() * ids.length)];

    datasetPropToAddFn[datasetProp](id, editButton.parentElement.parentElement);
    editButton.parentElement.style.display = 'none';
}

var grid;

window.addEventListener('load', function() {
    grid = new GridEditor(document.querySelector('.grid-wrapper'));
});