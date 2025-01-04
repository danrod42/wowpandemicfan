class GridEditor {

    constructor(element) {
        this.element = element;
        this.displayIdx = 0;
        this.initCells();
    }

    initCells() {
        // get number of cells from URL or default to 4
        const cellsParam = new URLSearchParams(window.location.search).get('cells');
        this.numberOfCells = Number.isInteger(Number(cellsParam)) && Number(cellsParam) > 0 ? Number(cellsParam) : 4;

        // get the reference cell
        const refSheet = this.element.querySelector('.grid-cell');

        // add cells
        for (let i = 1; i < this.numberOfCells; i++) {
            const newSheet = refSheet.cloneNode(true);
            newSheet.style.display = '';
            this.element.appendChild(newSheet);
        }
    }

    // Create edit items for each config and append to edit menu
    createMenuItems(entityType, configs, filterFn, sortFn, shortNameFn, longNameFn, cssClassFn) {
        // filter and sort config indices
        const ids = configs
            .map((_, idx) => idx)
            .filter(idx => filterFn(configs[idx]))
            .sort((i, j) => sortFn(configs[i], configs[j]));

        // group by short name
        const groupedByShortName = ids.reduce((map, id) => {
            const key = shortNameFn(configs[id]);
            map.set(key, (map.get(key) || []).concat(id));
            return map;
        }, new Map());

        // generate menu items using a for loop
        let menuItems = "";
        for (let id of ids) {
            const config = configs[id];
            const shortName = shortNameFn(config);
            const cssClass = cssClassFn(config);
            const idList = groupedByShortName.get(shortName);

            if (!idList) continue;

            const idsStr = idList.join(',');
            let longName = [...new Set(idList.map(id => longNameFn(configs[id])))].join(', ');
            if (idList.length > 1) longName = `(${idList.length} ${GridEditor.pluralizeEntityType(entityType)}) ${longName}`;

            groupedByShortName.delete(shortName);

            const lenLimit = idsStr.includes(',') ? 17 : 21;
            let displayName = shortName.length > lenLimit ? shortName.slice(0, lenLimit - 1) + '...' : shortName;
            if (idList.length > 1) displayName += ' 🎲';

            menuItems += `<span class="edit-button ${cssClass}" data-${entityType}-id="${idsStr}" onclick="menuItemClick(this)" title="${longName}">${displayName}</span>`;
        }

        // append to edit menu
        this.element.querySelectorAll('.edit-menu').forEach(editMenu => {
            editMenu.insertAdjacentHTML('beforeend', menuItems);
        });
    }

    static pluralizeEntityType(entityType) {
        return entityType === 'hero' ? 'heroes' : `${entityType}s`;
    }

    displayFromUrl(urlParam, configs, searchField, addFn) {
        if (this.isFull()) return;
        const urlParams = new URLSearchParams(window.location.search);
        const toDisplay = urlParams.has(urlParam)
            ? urlParams.get(urlParam).split(',')
            : [];
        for (let display of toDisplay) {
            for (let id = 0; id < configs.length; id++) {
                if (configs[id][searchField] && configs[id][searchField].startsWith(display)) {
                    addFn(id, this.element.querySelectorAll('.grid-cell')[this.displayIdx++]);
                    if (this.isFull()) return;
                }
            }
        }
    }

    displayRandom(configs, addFn) {
        if (this.isFull()) return;
        const id = Math.floor(Math.random() * configs.length);
        addFn(id, this.element.querySelectorAll('.grid-cell')[this.displayIdx++]);
    }

    enableEdition() {
        // display either close sign or edit menu on hover based on the quest sheet's visibility
        this.element.querySelectorAll('.grid-cell').forEach((cell) => {
            cell.addEventListener('mouseover', function() {
                const hasSheet = cell.querySelector('.reward-card, .quest-sheet, .hero-sheet, .hero-action-card') !== null;
                if (hasSheet) {
                    cell.querySelector('.close-sign').style.display = 'inline-block';
                } else {
                    cell.querySelector('.edit-menu').style.display = 'grid';
                }
            });
            cell.addEventListener('mouseout', function() {
                cell.querySelector('.close-sign').style.display = 'none';
                cell.querySelector('.edit-menu').style.display = 'none';
            });
        });

        // remove sheet when close is clicked
        this.element.querySelectorAll('.close-sign').forEach((closeSign) => closeSign.addEventListener('click', () => {
            closeSign.parentNode.querySelector('.reward-card, .quest-sheet, .hero-sheet, .hero-action-card').remove();
            closeSign.style.display = 'none'
        }));
    }

    isEmpty() {
        return this.displayIdx === 0;
    }

    isFull() {
        return this.displayIdx >= this.numberOfCells;
    }
}

function menuItemClick(editButton) {
    const datasetPropToAddFn = {
        'heroId': (a, b) => addHero(a, b),
        'actionId': (a, b) => addHeroAction(a, b),
        'questId': (a, b) => addQuest(a, b),
        'rewardId': (a, b) => addRewardCard(a, b),
    };
    const datasetProp = Object.keys(datasetPropToAddFn).find(prop => prop in editButton.dataset);

    const ids = editButton.dataset[datasetProp].split(',');
    const id = ids.shift();
    ids.push(id);
    editButton.dataset[datasetProp] = ids.join(',');

    datasetPropToAddFn[datasetProp](id, editButton.parentElement.parentElement);
    editButton.parentElement.style.display = 'none';
}

let grid;

window.addEventListener('load', function() {
    grid = new GridEditor(document.querySelector('.grid-wrapper'));
});