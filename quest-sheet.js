const questConfigs = [
    {
        location: "Anub'arak Encounter",
        effect: "After this quest is completed, heroes on this space may move to Dalaran.",
        damage: '1',
        bossName: "Anub'arak",
        region: 'green',
        spots: 'tdfhdfhdfhdfh',
        bossImageUrl: "img/anubarak-by-d-franco.jpg",
        bossImagePosition: 'center',
        bossImageSize: 'cover',
    },
    {
        location: 'Argent Tournament',
        effect: "When this quest is completed, replace it with Anub'arak Encounter. (Do not draw the reward yet.)",
        damage: '2',
        bossName: "Trial of the Crusader",
        region: 'green',
        spots: 'ffhhdddffddhhh',
        bossImageUrl: "img/trial-of-the-crusader.jpg",
        bossImagePosition: '-16px -26px',
        bossImageSize: '116%',
    },
    {
        location: 'Azjol-Nerub',
        effect: "Hero card effects cannot be used on this space.",
        damage: '2',
        bossName: "Herald Volazj",
        region: 'red',
        spots: 'hhttddhhhttff',
        bossImageUrl: "img/herald-volazj.jpg",
        bossImagePosition: '0px 0px',
        bossImageSize: 'cover',
    },
    {
        location: 'Dalaran',
        effect: 'Before each quest action here, roll 1 die and retreat the quest marker 1 per rolled ✊🏼 and 🛡️.',
        damage: '2',
        bossName: 'The Violet Hold',
        region: 'green',
        spots: 'ffddffhhddfff',
        bossImageUrl: "img/the-violet-hold.jpg",
        bossImagePosition: '-11px -34px',
        bossImageSize: '120%',
    },
    {
        location: "Drak'tharon Keep",
        effect: 'After each quest action here, choose 2 connected spaces and spawn 1 ghoul on each.',
        damage: '2',
        bossName: "The Prophet Tharon'ja",
        region: 'purple',
        spots: 'hhhffttttddff',
        bossImageUrl: "img/the-prophet-tharon-ja-seta-triandi.jpg",
        bossImagePosition: '6px 10px',
        bossImageSize: '96%',
    },
    {
        location: "Grizzlemaw",
        effect: 'After this quest is completed, discard 3 cards among heroes on this space.',
        damage: '2',
        bossName: "Corrupted Ursoc",
        region: 'purple',
        spots: 'tttdddhhhffff',
        bossImageUrl: "img/ursoc.jpg",
        bossImagePosition: '9px 3px',
        bossImageSize: '96%',
    },
    {
        location: 'Onslaught Harbor',
        effect: 'When a hero enters this space, they suffer 2 damage.',
        damage: '3',
        bossName: "Mal'Ganis",
        region: 'red',
        spots: 'dddfftthhhddd',
        bossImageUrl: 'img/malganis.jpg',
        bossImagePosition: '-138px 18px',
        bossImageSize: '224%',
    },
    {
        location: 'Shadow Vault',
        effect: 'During quest actions here, other heroes cannot contribute cards.',
        damage: '2',
        bossName: 'Thane Ufrang the Mighty',
        region: 'green',
        spots: 'ttddffddhhhtt',
        bossImageUrl: 'img/thane-ufrang-the-mighty.jpg',
        bossImagePosition: '-1px 15px',
        bossImageSize: '100%',
    },
    {
        location: "Temple City of En'kilah",
        effect: 'During quest action here, suffer 1 additional damage for each rolled ✊🏼.',
        damage: '1',
        bossName: "Prince Valanar",
        region: 'red',
        spots: 'fdhttfdhttfdh',
        bossImageUrl: "img/prince-valanar.jpg",
        bossImagePosition: '8px -27px',
        bossImageSize: '96%',
    },
    {
        location: 'The Wrathgate',
        effect: 'After this quest is completed, each hero on this space suffers 3 damage.',
        damage: '3',
        bossName: 'Battle of the Wrathgate',
        region: 'red',
        spots: 'ttddffhhdddtt',
        bossImageUrl: 'img/the-wrathgate.jpg',
        bossImagePosition: '-1px -85px',
        bossImageSize: 'cover',
    },
    {
        location: 'Utgarde Keep',
        effect: 'After this quest is completed, spawn 1 ghoul on each connected space.',
        damage: '2',
        bossName: 'Annhylde the Caller',
        region: 'purple',
        spots: 'ddddfffftthhh',
        bossImageUrl: 'img/annhylde-the-caller.jpg',
        bossImagePosition: '-2px 25px',
        bossImageSize: '104%',
    },
    {
        location: 'Wyrmrest Temple',
        effect: 'After each quest action here, contributed cards are discarded.',
        damage: '2',
        bossName: 'Sartharion the Onyx Guardian',
        region: 'purple',
        spots: 'ddddhhhhttfff',
        bossImageUrl: 'img/sartharion-the-onyx-guardian.jpeg',
        bossImagePosition: '6px 21px',
        bossImageSize: '96%',
    },
].sort((a, b) => a.region.localeCompare(b.region));

class QuestSheet {
    constructor(config, element) {
        this.config = config;
        this.element = element;
    }

    updateElements() {
        let config = this.config;
        if (config.location != null) this.setElementText('.quest-location [contenteditable=true]', config.location);
        if (config.effect != null) this.setElementText('.quest-text [contenteditable=true]', config.effect);
        if (config.damage != null) this.setElementText('.quest-damage [contenteditable=true]', config.damage);
        if (config.bossName != null) this.setElementText('.boss-name [contenteditable=true]', config.bossName);
        if (config.region != null) this.setRegion(config.region);
        if (config.spots) this.setSpots(config.spots);
        if (config.bossImageUrl != null) this.setBossImageUrl(config.bossImageUrl);
        if (config.bossImagePosition != null) this.element.querySelector('.boss-image').style.backgroundPosition = config.bossImagePosition;
        if (config.bossImageSize != null) this.element.querySelector('.boss-image').style.backgroundSize = config.bossImageSize;
        return this;
    }

    enableEdition() {
        let questSheet = this.element;
        new UploadableImage(questSheet.querySelector('.uploadable-image'));

        // dispatch click events to clickable images
        questSheet.addEventListener('click', function(event) {
            let clickableImages = questSheet.querySelectorAll('.quest-spot');
            var changeQuestColor = true;
            clickableImages.forEach((element) => {
                if (isEventInsideElement(event, element)) {
                    changeQuestColor = false;
                    element.dispatchEvent(new event.constructor(event.type, event));
                    event.stopPropagation();
                }
            });
            if (changeQuestColor) {
                let additionalPossiblyConflictingDivs = questSheet.querySelectorAll('.uploadable-image');
                additionalPossiblyConflictingDivs.forEach((element) => {
                    if (isEventInsideElement(event, element)) {
                        changeQuestColor = false;
                    }
                });
                if (changeQuestColor) {
                    let questSheetFrame = questSheet.querySelector('.quest-sheet-frame');
                    const prevImage = window.getComputedStyle(questSheetFrame).getPropertyValue('background-image');
                    const colors = ['green', 'purple', 'red'];
                    const nextImage = prevImage.replace(/green|purple|red/g, (match) => {
                        const currentIndex = colors.indexOf(match);
                        const nextIndex = (currentIndex + 1) % colors.length;
                        return colors[nextIndex];
                    });
                    questSheetFrame.style.backgroundImage = nextImage;
                }
            }
        });

        // rotate quest spot images
        questSheet.querySelectorAll('.quest-spot').forEach((element) => {
            new RotatableImage(element, ['fight', 'defence', 'heal', 'travel']);
        });

        // auto-select-all for quest damage
        questSheet.querySelectorAll('.quest-damage [contenteditable=true]').forEach(
            questDamageEditableDiv => questDamageEditableDiv.addEventListener('click', () => {
                // Create a new Range object
                const range = document.createRange();

                // Select the entire contents of the editable div
                range.selectNodeContents(questDamageEditableDiv);

                // Get the Selection object and add the Range to it
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);

                event.stopPropagation();
            })
        );

        // configure content-editable elements
        questSheet.querySelectorAll('[contenteditable=true]').forEach((ele) => {
            // paste text without formatting
            ele.addEventListener('paste', (event) => {
                event.preventDefault();
                const text = event.clipboardData.getData('text/plain');
                document.execCommand('insertText', false, text);
            });
            // stop event propagation to avoid conflicts with an uploadable image
            uploadableImageEventNames.forEach((eventName) => {
                ele.addEventListener(eventName, (event) => {
                    event.stopPropagation();
                });
            });
            // stop event propagation on click
            ele.addEventListener('click', () => event.stopPropagation())
        });

        return this;
    }

    setElementText(selector, text, matchIdx = 0) {
        this.element.querySelectorAll(selector)[matchIdx].innerText = text;
    }

    setRegion(region) {
        this.element.querySelector('.quest-sheet-frame').style.backgroundImage = 'url("img/quest-' + region + '-13.png")';
    }

    setSpots(spots) {
        const expandedName = {'f': 'fight', 'd': 'defence', 'h': 'heal', 't': 'travel'};
        var spotElements = this.element.querySelectorAll('.quest-spot');
        for (var i = 0; i < Math.min(spots.length, spotElements.length); i++) {
            spotElements[i].style.backgroundImage = 'url("img/quest-' + expandedName[spots[i]] + '.png")';
        }
    }

    setBossImageUrl(bossImageUrl) {
        if (!bossImageUrl.startsWith('url(') && !bossImageUrl.startsWith('data('))
            bossImageUrl = 'url("' + bossImageUrl + '")'
        this.element.querySelector('.boss-image').style.backgroundImage = bossImageUrl;
    }
}

function menuItemClick(editButton) {
    addQuest(editButton.dataset.questId, editButton.parentElement.parentElement);
    editButton.parentElement.style.display = 'none';
}

function addQuest(questId, parentElement) {
    // clone ref sheet
    let refSheet = document.querySelector('.quest-sheet');
    let newSheet = refSheet.cloneNode(true);

    // display new sheet
    newSheet.style.display = '';
    newSheet.setAttribute('data-quest-id', questId);
    parentElement.appendChild(newSheet);

    // bind sheet
    new QuestSheet(questConfigs[questId], newSheet)
        .updateElements()
        .enableEdition();
}

window.addEventListener('load', function() {
    // create edit items for each edit menu
    var menuItems = "";
    for (var questIdx = 0; questIdx < questConfigs.length; questIdx++) {
        let qc = questConfigs[questIdx];
        let questName = qc.location;
        if (qc.version) questName += ` (${qc.version})`;
        menuItems += `<span class="edit-button ${qc.region}" data-quest-id="${questIdx}" onclick="menuItemClick(this)" title="Edit ${questName} quest">➕️️ \u00A0${questName}</span>`;
    }
    document.querySelectorAll('.edit-menu').forEach((editMenu) => {
        editMenu.innerHTML += menuItems;
    });

    const grid = new GridEditor(document.querySelector('.grid-wrapper'));
    grid.enableEdition();
    grid.displayFromUrl('quests', questConfigs, 'location', addQuest);
    grid.displayFromUrl('rewards', rewardCardConfigs, 'name', addRewardCard);
    grid.displayRandomIfGridIsEmpty(questConfigs, addQuest);
});
