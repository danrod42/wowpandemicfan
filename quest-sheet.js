const questConfigs = [
    {
        location: 'Argent Tournament',
        effect: 'When the last quest space is first reached, roll 4 dice and retreat 1 quest space for each rolled ✊🏼.',
        damage: '2',
        bossName: "Anub'arak",
        region: 'green',
        spots: 'ddfftthhhddff',
        bossImageUrl: "anubarak-by-d-franco.jpg",
        bossImagePosition: '-14px -2px',
        bossImageSize: 'cover',
    },
    {
        location: 'Argent Tournament',
        effect: "When this quest is completed, replace it with Anub'arak Encounter. (Do not draw the reward yet.)",
        damage: '2',
        bossName: "Trial of the Crusader",
        region: 'green',
        spots: 'ffhhdddffddhhh',
        bossImageUrl: "trial-of-the-crusader.jpg",
        bossImagePosition: '-16px -26px',
        bossImageSize: '116%',
    },
    {
        location: "Anub'arak Encounter",
        effect: "After this quest is completed, heroes in this space may move to Dalaran.",
        damage: '1',
        bossName: "Anub'arak",
        region: 'green',
        spots: 'tdfhdfhdfhdfh',
        bossImageUrl: "anubarak-by-d-franco.jpg",
        bossImagePosition: 'center',
        bossImageSize: 'cover',
    },
    {
        location: 'Dalaran',
        effect: 'Cancel all rolled 🛡️ and retreat that much in the quest progression before advancing.',
        damage: '2',
        bossName: 'The Violet Hold',
        region: 'green',
        spots: 'ffddffhhddfff',
        bossImageUrl: "the-violet-hold.jpg",
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
        bossImageUrl: "the-prophet-tharon-ja-seta-triandi.jpg",
        bossImagePosition: '6px 10px',
        bossImageSize: '96%',
    },
    {
        location: 'Onslaught Harbor',
        effect: 'When a hero enters this space, they suffer 2 damage.',
        damage: '3',
        bossName: "Mal'Ganis",
        region: 'red',
        spots: 'dddfftthhhddd',
        bossImageUrl: 'malganis.jpg',
        bossImagePosition: '-138px 18px',
        bossImageSize: '224%',
    },
    {
        location: 'Shadow Vault',
        effect: 'During quest actions here, other heroes cannot contribute cards.',
        damage: '3',
        bossName: 'Thane Ufrang the Mighty',
        region: 'green',
        spots: 'ttddffddhhhtt',
        bossImageUrl: 'thane-ufrang-the-mighty.jpg',
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
        bossImageUrl: "prince-valanar.jpg",
        bossImagePosition: '8px -27px',
        bossImageSize: '96%',
    },
    {
        location: 'The Wrathgate',
        effect: 'After this quest is completed, each hero in this space suffers 3 damage.',
        damage: '3',
        bossName: 'Battle of the Wrathgate',
        region: 'red',
        spots: 'ttddffhhdddtt',
        bossImageUrl: 'the-wrathgate.jpg',
        bossImagePosition: '-1px -85px',
        bossImageSize: 'cover',
    },
    {
        location: 'Utgarde Keep',
        effect: 'After this quest is completed, spawn 1 ghoul in each connected space.',
        damage: '2',
        bossName: 'Annhylde the Caller',
        region: 'purple',
        spots: 'ddddfffftthhh',
        bossImageUrl: 'annhylde-the-caller.jpg',
        bossImagePosition: '-2px 25px',
        bossImageSize: '104%',
    },
];


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
    }

    setElementText(selector, text, matchIdx = 0) {
        this.element.querySelectorAll(selector)[matchIdx].innerText = text;
    }

    setRegion(region) {
        this.element.querySelector('.quest-sheet-frame').style.backgroundImage = 'url("quest-' + region + '-13.png")';
    }

    setSpots(spots) {
        const expandedName = {'f': 'fight', 'd': 'defence', 'h': 'heal', 't': 'travel'};
        var spotElements = this.element.querySelectorAll('.quest-spot');
        for (var i = 0; i < Math.min(spots.length, spotElements.length); i++) {
            spotElements[i].style.backgroundImage = 'url("quest-' + expandedName[spots[i]] + '.png")';
        }
    }

    setBossImageUrl(bossImageUrl) {
        if (!bossImageUrl.startsWith('url(') && !bossImageUrl.startsWith('data('))
            bossImageUrl = 'url("' + bossImageUrl + '")'
        this.element.querySelector('.boss-image').style.backgroundImage = bossImageUrl;
    }
}

window.addEventListener('load', function() {
    let questSheets = document.querySelectorAll('.quest-sheet');
    let loadLocations =  ["Dalaran", "Drak'tharon Keep", "Temple City of En'kilah", "The Wrathgate"];
    let loadQuests = questConfigs.filter(qc => loadLocations.find(loc => loc === qc.location));
    for (var i = 0; i < questSheets.length; i++)
        new QuestSheet(loadQuests[i % loadQuests.length], questSheets[i]).updateElements();
});

document.querySelectorAll('.quest-sheet').forEach((questSheet) => {
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
});

document.querySelectorAll('.quest-spot').forEach((element) => {
    new RotatableImage(element, ['fight', 'defence', 'heal', 'travel']);
});

document.querySelectorAll('.quest-damage [contenteditable=true]').forEach(
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

document.querySelectorAll('[contenteditable=true]').forEach((ele) =>
    ele.addEventListener('click', () => event.stopPropagation())
);

document.querySelectorAll('.plus-sign').forEach((plusSign) => plusSign.addEventListener('click', () => {
    plusSign.parentNode.querySelector('.quest-sheet').style.display = 'inline';
    plusSign.style.display = 'none';
}));

document.querySelectorAll('.close-sign').forEach((closeSign) => closeSign.addEventListener('click', () => {
    closeSign.parentNode.querySelector('.quest-sheet').style.display = 'none';
    closeSign.style.display = 'none';
}));

document.querySelectorAll('.hover-div').forEach((hoverDiv) => {
    hoverDiv.addEventListener('mouseover', function() {
        const questSheetIsDisplaying = window.getComputedStyle(hoverDiv.querySelector('.quest-sheet')).display !== 'none';
        if (questSheetIsDisplaying) {
            hoverDiv.querySelector('.close-sign').style.display = 'inline-block';
        } else {
            hoverDiv.querySelector('.plus-sign').style.display = 'inline-block';
        }
    });
    hoverDiv.addEventListener('mouseout', function() {
        hoverDiv.querySelector('.close-sign').style.display = 'none';
        hoverDiv.querySelector('.plus-sign').style.display = 'none';
    });
});
