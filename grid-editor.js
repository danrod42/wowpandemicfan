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

    renderEditMenus(editMenuActiveType = 'heroes') {
        this.editMenuActiveType = editMenuActiveType;
        // init menu items for heroes
        const factionOrder = ['alliance', 'explorers', 'horde', 'argent', 'wyrmrest',  'scarlet', 'kirin-tor', 'ebon-blade', 'neutral', 'darkmoon'];
        if (localDefaults.silverCrescentAdded)
            factionOrder.push('silver-crescent');
        const shortNameFn = c => c.shortName || c.heroName.split(' ')[0];
        const heroesMenuItems = this.createMenuItems(
            'hero',
            heroConfigs,
            c => factionOrder.includes(c.faction), // only display factions in factionOrder
            (a, b) => factionOrder.indexOf(a.faction) == factionOrder.indexOf(b.faction)
                ? shortNameFn(a).localeCompare(shortNameFn(b))
                : factionOrder.indexOf(a.faction) - factionOrder.indexOf(b.faction),
            shortNameFn,
            c => c.heroName,
            c => c.faction
        );
        // init menu items for hero actions
        const heroActionsMenuItems = this.createMenuItems(
            'action',
            heroActionCardConfigs,
            c => localDefaults.silverCrescentAdded || !c?.collection?.includes('Silver Crescent'),
            (a, b) => a.theme.localeCompare(b.theme),
            c => c.theme,
            c => c.name,
            c => 'action'
        );
        // init navigate-to-quests menu items
        const navToQuestsMenuItems = this.createMenuItems(
            'menu-item-nav',
            [{ name: "Quests 🗺️"}],
            c => localDefaults.silverCrescentAdded || !c?.collection?.includes('Silver Crescent'),
            (a, b) => a.name.localeCompare(b.name),
            c => c.name,
            c => c.name,
            c => 'menu-item-nav'
        );
        // init menu items for quests
        const questsMenuItems = this.createMenuItems(
            'quest',
            questConfigs,
            c => localDefaults.silverCrescentAdded || !c?.collection?.includes('Silver Crescent'),
            (a, b) => a.region.localeCompare(b.region),
            c => c.location,
            c => c.bossName,
            c => c.region
        );
        // init menu items for rewards
        const rewardsMenuItems = this.createMenuItems(
            'reward',
            rewardCardConfigs,
            c => localDefaults.silverCrescentAdded || !c?.collection?.includes('Silver Crescent'),
            (a, b) => a.theme.localeCompare(b.theme),
            c => c.theme,
            c => c.name,
            c => 'reward'
        );
        // init navigate-to-heroes menu items
        const navToHeroesMenuItems = this.createMenuItems(
            'menu-item-nav',
            [{ name: "Heroes 🧑️"}],
            c => localDefaults.silverCrescentAdded || !c?.collection?.includes('Silver Crescent'),
            (a, b) => a.name.localeCompare(b.name),
            c => c.name,
            c => c.name,
            c => 'menu-item-nav'
        );

        // append to all edit menus in this grid
        this.element.querySelectorAll('.edit-menu').forEach(editMenu => {
            if (editMenu.classList.contains('heroes')) {
                GridEditor.appendHtmlBeforeEnd(editMenu, heroesMenuItems);
                GridEditor.appendHtmlBeforeEnd(editMenu, heroActionsMenuItems);
                GridEditor.appendHtmlBeforeEnd(editMenu, navToQuestsMenuItems);
            } else if (editMenu.classList.contains('quests')) {
                GridEditor.appendHtmlBeforeEnd(editMenu, questsMenuItems);
                GridEditor.appendHtmlBeforeEnd(editMenu, rewardsMenuItems);
                GridEditor.appendHtmlBeforeEnd(editMenu, navToHeroesMenuItems);
            }
        });
    }

    toggleEditMenu(sourceEditMenu) {
        sourceEditMenu.parentElement.querySelector('.' + this.editMenuActiveType).style.display = 'none';
        this.editMenuActiveType = this.editMenuActiveType === 'heroes' ? 'quests' : 'heroes';
        sourceEditMenu.parentElement.querySelector('.' + this.editMenuActiveType).style.display = 'grid';
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
            const displayName = shortName.length > lenLimit ? shortName.slice(0, lenLimit - 1) + '...' : shortName;
            const displayNameSuffix = idList.length > 1 ? ' 🎲' : '';

            menuItems += `<span class="edit-button ${cssClass}" data-${entityType}-id="${idsStr}" onclick="menuItemClick(this)" title="${longName}" data-display-name-suffix='${displayNameSuffix}'>${displayName}</span>`;
        }
        return menuItems;
    }

    static appendHtmlBeforeEnd(parent, children) {
        parent.insertAdjacentHTML('beforeend', children);
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
                    cell.querySelectorAll('.edit-menu').forEach(editMenu => {
                        if (editMenu.classList.contains(grid.editMenuActiveType)) {
                            editMenu.style.display = 'grid';
                        }
                    });
                }
            });
            cell.addEventListener('mouseout', function() {
                cell.querySelector('.close-sign').style.display = 'none';
                cell.querySelectorAll('.edit-menu').forEach(editMenu => {
                    editMenu.style.display = 'none';
                });
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

const menuIterator = new (class {
    constructor() {
        this.callCounts = new Map();
    }

    next(datasetProp, ids) {
        const key = datasetProp + ids;
        if (!this.callCounts.has(key)) this.callCounts.set(key, 0);
        const currentIndex = this.callCounts.get(key);
        const list = ids.split(',');
        this.callCounts.set(key, (currentIndex + 1) % list.length);
        return list[currentIndex];
    }
})();

function menuItemClick(editButton) {
    const isMenuItemNav = editButton.classList.contains('menu-item-nav');
    if (isMenuItemNav) {
        grid.toggleEditMenu(editButton.parentElement);
        return;
    }

    const datasetPropToAddFn = {
        'heroId': (a, b) => addHero(a, b),
        'actionId': (a, b) => addHeroAction(a, b),
        'questId': (a, b) => addQuest(a, b),
        'rewardId': (a, b) => addRewardCard(a, b),
    };
    const datasetProp = Object.keys(datasetPropToAddFn).find(prop => prop in editButton.dataset);

    const id = menuIterator.next(datasetProp, editButton.dataset[datasetProp]);

    datasetPropToAddFn[datasetProp](id, editButton.parentElement.parentElement);
    editButton.parentElement.style.display = 'none';
}

let grid;

window.addEventListener('load', function() {
    grid = new GridEditor(document.querySelector('.grid-wrapper'));

    // removes .active from all navigation buttons and adds it only to the clicked one
    document.querySelectorAll('.navigation-button').forEach(button => {
        button.addEventListener('click', () => {
          document.querySelectorAll('.navigation-button').forEach(b => b.classList.remove('active'));
          button.classList.add('active');
        });
    });
});