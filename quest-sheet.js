const questConfigs = [
    {
        location: "Amberpine Lodge",
        effect: 'While this quest is active, all heroes have -✊🏼 when they rest.',
        damage: '2',
        bossName: "Replenish the Storehouse ",
        region: 'purple',
        spots: 'ttffddttffhhh',
        bossImageUrl: "img/replenish-the-storehouse.jpg",
        bossImagePosition: '7px 11px',
        bossImageSize: '96%',
    },
    {
        location: "Anub'arak Encounter",
        effect: "After this quest is completed, heroes on this space may move to Dalaran.",
        damage: '1',
        bossName: "Anub'arak",
        region: 'green',
        spots: 'tdfhdfhdfhdfh',
        bossImageUrl: "img/anubarak-by-d-franco.jpg",
        bossImagePosition: 'center',
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
        bossImageSize: '100%',
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
        location: 'Argent Tournament',
        effect: "While this quest is active, you cannot make progress on other quests.",
        damage: '2',
        bossName: "Crusader Bridenbrad",
        region: 'green',
        spots: 'ttttddddhhhhh',
        bossImageUrl: "img/crusader-bridenbrad.jpg",
        bossImagePosition: '-4px 2px',
        bossImageSize: '100%',
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
        location: 'Dalaran',
        effect: 'Cancel all rolled 🛡️ and retreat that much in the quest progression before advancing.',
        damage: '2',
        bossName: 'Segacedi',
        region: 'green',
        spots: 'ffddffhhddfff',
        bossImageUrl: "img/segacedi.png",
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
    },
    {
        location: 'Dalaran',
        effect: 'No cards can be contributed to this quest.',
        damage: '2',
        bossName: 'The Underbelly',
        region: 'green',
        spots: 'ttttttttttttt',
        bossImageUrl: "img/the-underbelly.jpg",
        bossImagePosition: '0px 0px',
        bossImageSize: '152%',
    },
    {
        location: 'Dalaran',
        effect: 'During quest actions here, cancel all rolled ✊🏼.',
        damage: '2',
        bossName: 'Underground Market',
        region: 'green',
        spots: 'tftdthtftdtht',
        bossImageUrl: "img/underground-market.jpg",
        bossImagePosition: '0px 0px',
        bossImageSize: '116%',
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
        location: "Grizzlemaw",
        effect: 'After each quest action here, roll 1 die, and suffer 1 damage per rolled ✊🏼.',
        damage: '2',
        bossName: "Syreian the Bonecarver",
        region: 'purple',
        spots: 'tttdddhhhffff',
        bossImageUrl: "img/syreian-the-bonecarver.jpg",
        bossImagePosition: '1px -21px',
        bossImageSize: '112%',
    },
    {
        location: "Kolramas",
        effect: 'After each quest action here, roll 1 die and spawn 1 ghoul on this space per rolled ✊🏼.',
        damage: '2',
        bossName: "Malas the Corrupter",
        region: 'purple',
        spots: 'ttfffddtthhdd',
        bossImageUrl: "img/malas-the-corrupter.jpg",
        bossImagePosition: '0px 31px',
        bossImageSize: '100%',
    },
    {
        location: "Kolramas",
        effect: 'After each quest action here, roll 1 die and spawn 1 ghoul on 1 connected space per rolled ✊🏼.',
        damage: '2',
        bossName: "Shade of Arugal",
        region: 'purple',
        spots: 'ttfffddtthhdd',
        bossImageUrl: "img/shade-of-arugal.jpg",
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
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
        location: "River's Heart",
        effect: 'During fight actions in connected spaces, suffer 1 additional damage.',
        damage: '3',
        bossName: "Chicken Escapee",
        region: 'red',
        spots: 'tttdddfttfhhh',
        bossImageUrl: 'img/chicken.jpg',
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
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
        effect: 'During quest action here, cancel all rolled 🛡️ and suffer 1 damage for each rolled ✊🏼.',
        damage: '0',
        bossName: "Prince Valanar",
        region: 'red',
        spots: 'fdhttfdhttfdh',
        bossImageUrl: "img/prince-valanar.jpg",
        bossImagePosition: '8px -27px',
        bossImageSize: '96%',
    },
    {
        location: "Temple of Storms",
        effect: 'During quest actions here, treat all rolled ✊🏼 as 🛡️, and all rolled 🛡️ and ✊🏼.',
        damage: '2',
        bossName: "Time-Lost Proto Drake",
        region: 'green',
        spots: 'tttttttffddhh',
        bossImageUrl: "img/time-lost-protodrake.jpg",
        bossImagePosition: '-1px -36px',
        bossImageSize: '100%',
    },
    {
        location: "Terrace of the Makers",
        effect: "After each quest action here, roll 1 die. If there's a 🛡️, move 1 hero from this to a connected space.",
        damage: '2',
        bossName: "Duronn the Runewrought",
        region: 'green',
        spots: 'ttttfffhhhddd',
        bossImageUrl: "img/duronn-the-runewrought.jpg",
        bossImagePosition: '2px 31px',
        bossImageSize: '100%',
    },
    {
        location: "Terrace of the Makers",
        effect: 'After each quest action here, other heroes on this space suffer 1 damage.',
        damage: '2',
        bossName: "Halefnir the Windborn",
        region: 'green',
        spots: 'tttffddddhhhh',
        bossImageUrl: "img/halefnir-the-windborn.jfif",
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
    },
    {
        location: 'The Avalanche',
        effect: 'During quest actions here, cancel all rolled 🛡️.',
        damage: '3',
        bossName: 'Bythius the Flesh-Shaper',
        region: 'red',
        spots: 'tttffddffhhhh',
        bossImageUrl: 'img/bythius-the-flesh-shaper.jpg',
        bossImagePosition: '9px 7px',
        bossImageSize: '96%',
    },
    {
        location: 'The Avalanche',
        effect: 'When a hero enters this space or a connected space, they suffer 1 damage.',
        damage: '3',
        bossName: 'Urgreth of the Thousand Tombs',
        region: 'red',
        spots: 'tttffddffhhff',
        bossImageUrl: 'img/stitched-giant.jpg',
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
    },
    {
        location: 'The Avalanche',
        effect: 'When a hero enters this space, they suffer 1 damage. Cancel 1 🛡️ during quest actions here.',
        damage: '3',
        bossName: 'Morbidus',
        region: 'red',
        spots: 'tttffhhffddff',
        bossImageUrl: 'img/stitched-giant.jpg',
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
    },
    {
        location: 'The Avalanche',
        effect: 'A hero on this space cannot quest twice consecutively. They need another action in between.',
        damage: '3',
        bossName: 'Hailscorn',
        region: 'red',
        spots: 'tttffhhffdddd',
        bossImageUrl: 'img/frost-wyrm.jpg',
        bossImagePosition: '8px 28px',
        bossImageSize: '100%',
    },
    {
        location: 'The Avalanche',
        effect: 'When a hero ends their turn on this space, they suffer 1 damage.',
        damage: '3',
        bossName: 'Artruis the Heartless',
        region: 'red',
        spots: 'ttfffhhttddhh',
        bossImageUrl: 'img/artruis-the-heartless.jpg',
        bossImagePosition: '11px 33px',
        bossImageSize: '112%',
    },
    {
        location: 'The Breach',
        effect: 'When this quest is completed, remove 1 stronghold from the map.',
        damage: '2',
        bossName: 'Frostbrood Destroyer',
        region: 'green',
        spots: 'ttddddhhhhfff',
        bossImageUrl: 'img/frostbrood-destroyer.jpg',
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
    },
    {
        location: 'The Breach',
        effect: 'When this quest is completed, advance the despair marker 1.',
        damage: '2',
        bossName: 'Underking Talonox',
        region: 'green',
        spots: 'ttddddhhhhfff',
        bossImageUrl: 'img/underking-talonox.jpg',
        bossImagePosition: '8px 13px',
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
        bossImageSize: '100%',
    },
    {
        location: "Thrym's End",
        effect: 'When this quest is completed, spawn 1 abomination on a connected space.',
        damage: '2',
        bossName: 'Prince Navarius',
        region: 'purple',
        spots: 'ttddffddhhhff',
        bossImageUrl: 'img/prince-navarius.jpg',
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
    },
    {
        location: "Thrym's End",
        effect: 'When a hero enters this space, spawn 1 abomination on this space.',
        damage: '2',
        bossName: 'Thrym',
        region: 'purple',
        spots: 'ttddffddhhhff',
        bossImageUrl: 'img/thrym.jpg',
        bossImagePosition: '9px 24px',
        bossImageSize: '112%',
    },
    {
        location: 'Thunderfall',
        effect: '<i>A sobering sight, a massive, silent grave with its wandering ghosts.</i>',
        damage: '2',
        bossName: 'Frozen Battle',
        region: 'green',
        spots: 'ddddddddddddd',
        bossImageUrl: 'img/frozen-battle.jpg',
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
    },
    {
        location: 'Thunderfall',
        effect: 'When a hero ends their turn on this space, they suffer 1 damage.',
        damage: '2',
        bossName: 'Frost Giant',
        region: 'green',
        spots: 'hhhdhhhthhfff',
        bossImageUrl: 'img/frost-giant.jpg',
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
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
        location: 'Valgarde',
        effect: 'When this quest is completed, spawn 3 ghouls among connected spaces.',
        damage: '2',
        bossName: 'Sorlof',
        region: 'purple',
        spots: 'ttddhhfffffff',
        bossImageUrl: 'img/night-elf-units.jpg',
        bossImagePosition: '-5px 26px',
        bossImageSize: '100%',
    },
    {
        location: 'Valiance Keep',
        effect: 'During fight actions in this region, cancel 1 rolled 🛡️.',
        damage: '3',
        bossName: 'Counselor Talbot',
        region: 'red',
        spots: 'ttffhhttffddd',
        bossImageUrl: 'img/counselor-talbot.jpg',
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
    },
    {
        location: 'Vengeance Landing',
        effect: "While this quest is active, reveal 1 additional Scourge card during the 'Spawn ghouls' step.",
        damage: '2',
        bossName: 'Long Nights',
        region: 'purple',
        spots: 'hfdthfdthfdth',
        bossImageUrl: 'img/long-nights.png',
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
        collection: 'Silver Crescent',
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
    {
        location: 'Wyrmrest Temple',
        effect: 'After each quest action here, each hero in this space and connected spaces suffer 1 damage.',
        damage: '2',
        bossName: "Grom'thar the Thunderbringer",
        region: 'purple',
        spots: 'ffffhhhddtttt',
        bossImageUrl: 'img/gromthar-the-thunderbringer.jpg',
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
    },
    {
        location: 'Warsong Hold',
        effect: 'After each quest here, roll 1 die, suffer 1 damage per rolled ✊🏼, and spawn 1 ghoul per rolled 🛡️.',
        damage: '3',
        bossName: 'Nerubian Egg',
        region: 'red',
        spots: 'tthhddffftthh',
        bossImageUrl: 'img/nerubian-egg.jpg',
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
    },
    // Darkmoon Faire
    {
        location: 'Amberpine Lodge',
        effect: 'After each quest action here, spawn 2 ghouls on 1 connected space.',
        damage: '2',
        bossName: 'Moonfang',
        region: 'purple',
        spots: 'ttdddffffhhhh',
        bossImageUrl: 'img/moonfang.jpg',
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
        collection: 'Darkmoon Faire',
        shortName: 'Faire',
    },
    {
        location: "River's Heart",
        effect: 'After each quest action here, roll 2 dice, suffer 1 damage per rolled ✊🏼 and prevent 1 per rolled 🛡️.',
        damage: '2',
        bossName: 'Darkmoon Rabbit',
        region: 'red',
        spots: 'ffddffttthhff',
        bossImageUrl: 'img/darkmoon-rabbit.jpg',
        bossImagePosition: '-1px -36px',
        bossImageSize: '100%',
        collection: 'Darkmoon Faire',
        shortName: 'Faire',
    },
    {
        location: 'Random',
        effect: 'After a quest action here, move this quest location marker to a connected space in this region.',
        damage: '2',
        bossName: 'Whack-a-Gnoll',
        region: 'green',
        spots: 'tftftftftftff',
        bossImageUrl: 'img/whack-a-gnoll.jpg',
        bossImagePosition: '0px 0px',
        bossImageSize: '100%',
        collection: 'Darkmoon Faire',
        shortName: 'Faire',
    },
    {
        location: 'Terrace of the Makers',
        effect: 'While this quest is active, heroes on this space cannot use their abilities.',
        damage: '2',
        bossName: 'Tonk Challenge',
        region: 'green',
        spots: 'ddffhhttffddd',
        bossImageUrl: 'img/tonk-challenge.jpg',
        bossImagePosition: '4px -50px',
        bossImageSize: '100%',
        collection: 'Darkmoon Faire',
        shortName: 'Faire',
    },
    {
        location: 'Frosthold',
        effect: 'While this quest is active, heroes on this space cannot use or contribute hero cards.',
        damage: '2',
        bossName: 'Darkmoon Carousel',
        region: 'green',
        spots: 'dhtfdhtfdhtfd',
        bossImageUrl: 'img/darkmoon-carousel.jpg',
        bossImagePosition: '0px -25px',
        bossImageSize: '100%',
        collection: 'Darkmoon Faire',
        shortName: 'Faire',
    },
    {
        location: 'Vengeance Landing',
        effect: 'After each quest action here, roll 1 die and discard ✊🏼 cards.',
        damage: '2',
        bossName: 'Ring Toss',
        region: 'purple',
        spots: 'fftthhhddfthd',
        bossImageUrl: 'img/ring-toss.jpg',
        bossImagePosition: '0px 14px',
        bossImageSize: '100%',
        collection: 'Darkmoon Faire',
        shortName: 'Faire',
    },
    {
        location: 'The Wrathgate',
        effect: 'After each quest action here, each hero on this space suffers 1 damage.',
        damage: '3',
        bossName: 'Deathmatch Pavilion',
        region: 'red',
        spots: 'hhddfffhhhddd',
        bossImageUrl: 'img/deathmatch-pavilion.jpg',
        bossImagePosition: '0px 5px',
        bossImageSize: '100%',
        collection: 'Darkmoon Faire',
        shortName: 'Faire',
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
        if (config.effect != null) this.setElementInnerHtml('.quest-text [contenteditable=true]', config.effect);
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
            let changeQuestColor = true;
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

    setElementInnerHtml(selector, innerHml, matchIdx = 0) {
        this.element.querySelectorAll(selector)[matchIdx].innerHTML = innerHml;
    }

    setRegion(region) {
        this.element.querySelector('.quest-sheet-frame').style.backgroundImage = 'url("img/quest-' + region + '-13.png")';
    }

    setSpots(spots) {
        const expandedName = {'f': 'fight', 'd': 'defence', 'h': 'heal', 't': 'travel'};
        const spotElements = this.element.querySelectorAll('.quest-spot');
        for (let i = 0; i < Math.min(spots.length, spotElements.length); i++) {
            spotElements[i].style.backgroundImage = 'url("img/quest-' + expandedName[spots[i]] + '.png")';
        }
    }

    setBossImageUrl(bossImageUrl) {
        if (!bossImageUrl.startsWith('url(') && !bossImageUrl.startsWith('data('))
            bossImageUrl = 'url("' + bossImageUrl + '")'
        this.element.querySelector('.boss-image').style.backgroundImage = bossImageUrl;
    }
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
    grid.createMenuItems(
        'quest',
        questConfigs,
        c => localDefaults.silverCrescentAdded || !c?.collection?.includes('Silver Crescent'),
        (a, b) => a.region.localeCompare(b.region),
        c => c.location,
        c => c.bossName,
        c => c.region
    );
    grid.enableEdition();
    grid.displayFromUrl('collections', questConfigs, 'collection', addQuest);
    grid.displayFromUrl('collections', rewardCardConfigs, 'collection', addRewardCard);
    grid.displayFromUrl('quests', questConfigs, 'location', addQuest);
    grid.displayFromUrl('rewards', rewardCardConfigs, 'name', addRewardCard);
    if (grid.isEmpty()) {
        grid.displayRandom(questConfigs, addQuest);
        grid.displayRandom(rewardCardConfigs, addRewardCard);
    }
});

function addSilverCrescentContent() {
    // remember we have added the content
    localDefaults.silverCrescentAdded = true;
}