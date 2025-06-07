class RewardCard {
    constructor(config, element) {
        this.config = config;
        this.element = element;
    }

    updateElements() {
        let config = this.config;
        if (config.name != null) this.setElementText('.reward-name[contenteditable=true]', config.name);
        if (config.textPrefix != null) this.setElementText('.reward-text-prefix[contenteditable=true]', config.textPrefix);
        if (config.textSuffix != null) this.setElementText('.reward-text-suffix[contenteditable=true]', config.textSuffix);
        if (config.imageUrl != null) this.setImageUrl(config.imageUrl);
        if (config.imagePosition != null) this.element.querySelector('.reward-card-image').style.backgroundPosition = config.imagePosition;
        if (config.imageSize != null) this.element.querySelector('.reward-card-image').style.backgroundSize = config.imageSize;
        return this;
    }

    enableEdition() {
        let element = this.element;

        new UploadableImage(element.querySelector('.uploadable-image'));

        // configure content-editable elements
        element.querySelectorAll('[contenteditable=true]').forEach((ele) => {
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

    setImageUrl(imageUrl) {
        if (!imageUrl.startsWith('url(') && !imageUrl.startsWith('data('))
            imageUrl = 'url("' + imageUrl + '")'
        this.element.querySelector('.reward-card-image').style.backgroundImage = imageUrl;
    }
}

const rewardCardConfigs = [
    {
        name: "Shadowmourne",
        textPrefix: "Permanent: ",
        textSuffix: "After you fight, deal 1 damage on a connected space.",
        imageUrl: 'img/shadowmourne.jpg',
        theme: "Weapon",
    },
    {
        name: "Quel'Delar",
        textPrefix: "Permanent: ",
        textSuffix: "+✊🏼 when you fight.",
        imageUrl: 'img/queldelar.jpg',
        theme: "Weapon",
    },
    {
        name: "Val'anyr",
        textPrefix: "Permanent: ",
        textSuffix: "At the end of your turn, a hero on your space heals 1.",
        imageUrl: 'img/valanyr.jpg',
        theme: "Weapon",
    },
    {
        name: "Bryntroll",
        textPrefix: "Permanent: ",
        textSuffix: "After you fight, heal 1.",
        imageUrl: 'img/bryntroll.jpg',
        theme: "Weapon",
    },
    {
        name: "Hearthstone",
        textPrefix: "Any Time: ",
        textSuffix: "Move to your starting space and rest.",
        imageUrl: 'img/hearthstone.jpg',
        theme: "Misc",
    },
    {
        name: "Refreshments",
        textPrefix: "Immediately: ",
        textSuffix: "All heroes heal to full health.",
        imageUrl: 'img/refreshments.jpg',
        theme: "Tuskarr",
    },
    {
        name: "Double Time",
        textPrefix: "Actions Step: ",
        textSuffix: "The current player does +4 actions that count as another turn.",
        imageUrl: 'img/double-time.jpg',
        theme: "Time",
    },
    {
        name: "Jouster",
        textPrefix: "Any Time: ",
        textSuffix: "Each hero rolls 1 die and draws 1 card from the hero discard per rolled ✊🏼.",
        imageUrl: 'img/tuskarr-jouster.png',
        imagePosition: '-1px -44px',
        theme: "Tuskarr",
    },
    {
        name: "Fisherman",
        textPrefix: "Any Time: ",
        textSuffix: "The current player peeks at the bottom 5 cards of the hero deck and takes 1.",
        imageUrl: 'img/tuskarr-fisherman.jpg',
        imagePosition: '0px -79px',
        theme: "Tuskarr",
    },
    {
        name: "Trawler",
        textPrefix: "Any Time: ",
        textSuffix: "The current player peeks at the bottom 3 cards of the hero deck and takes 2.",
        imageUrl: 'img/tuskarr-trawler.jpg',
        imagePosition: '1px -37px',
        theme: "Tuskarr",
    },
    {
        name: "Mithrios",
        textPrefix: "Permanent: ",
        textSuffix: "+🛡️ when you fight or quest.",
        imageUrl: 'img/mithrios.jpg',
        imagePosition: '0px 0px',
        theme: "Weapon",
    },
    {
        name: "Hammer of the Naaru",
        textPrefix: "Permanent: ",
        textSuffix: "+✊🏼✊🏼 when there's an abomination on your space.",
        imageUrl: 'img/hammer-of-the-naaru.jpg',
        imagePosition: '0px 0px',
        theme: "Weapon",
    },
    {
        name: "Argent Protector",
        textPrefix: "Actions Step: ",
        textSuffix: "You take no damage the rest of this turn.",
        imageUrl: 'img/argent-protector.jpg',
        imagePosition: '0px 0px',
        theme: "Argent",
    },
    {
        name: "Argent Watch",
        textPrefix: "Any time: ",
        textSuffix: "Remove 1 ghoul from each region and from each space with a stronghold.",
        imageUrl: 'img/argent-watchman.png',
        imagePosition: '4px -29px',
        theme: "Argent",
    },
    {
        name: "Lowly Squire",
        textPrefix: "Permanent: ",
        textSuffix: "Increase your hand card limit by 1.",
        imageUrl: 'img/lowly-squire.jpg',
        imagePosition: '0px -20px',
        theme: "Argent",
    },
    {
        name: "Lance Carrier",
        textPrefix: "Permanent: ",
        textSuffix: "'Fight' cards do not count towards your hand card limit.",
        imageUrl: 'img/lance-carrier.jpg',
        imagePosition: '-1px -11px',
        theme: "Argent",
    },
    {
        name: "Squire",
        textPrefix: "Permanent: ",
        textSuffix: "Heroes on your space have +✊🏼 when they rest.",
        imageUrl: 'img/squire.jpg',
        imagePosition: '0px 0px',
        theme: "Argent",
    },
    {
        name: "Stormfury",
        textPrefix: "Permanent: ",
        textSuffix: "When you fight, you may reroll 2 dice once.",
        imageUrl: 'img/stormfury.jpg',
        imagePosition: '-1px 3px',
        theme: "Weapon",
    },
    {
        name: "Chronomical Distortion",
        textPrefix: "Any Time: ",
        textSuffix: "Shuffle the Scourge deck.",
        imageUrl: 'img/chronomical-distortion.jpg',
        imagePosition: '0px -20px',
        theme: "Time",
    },
    {
        name: "Time Rewinder",
        textPrefix: "Any Time: ",
        textSuffix: "Remove 1 ghoul from each of the last 5 cards in the Scourge discard pile.",
        imageUrl: 'img/time-rewinder.jpg',
        imagePosition: '0px -6px',
        theme: "Time",
    },
    {
        name: "Orgrim's Hammer",
        textPrefix: "Any Time: ",
        textSuffix: "Deal 4 damage among spaces connected to Icecrown Citadel.",
        imageUrl: 'img/orgrims-hammer.jpg',
        imagePosition: '0px 0px',
        theme: "Misc",
    },
    {
        name: "Kor'kron Vanguard",
        textPrefix: "Any Time: ",
        textSuffix: "Place a stronghold on The Wrathgate.",
        imageUrl: 'img/korkron-vanguard.jpg',
        imagePosition: '0px -43px',
        theme: "Misc",
    },
    {
        name: "Fordragon Hold",
        textPrefix: "Any Time: ",
        textSuffix: "Place a stronghold on The Wrathgate.",
        imageUrl: 'img/fordragon-hold.jpg',
        imagePosition: '0px -43px',
        theme: "Misc",
    },
    {
        name: "Hailstorm",
        textPrefix: "Permanent: ",
        textSuffix: "At the end of your turn, remove 1 ghoul from a connected space.",
        imageUrl: 'img/hailstorm.jpg',
        imagePosition: '0px -38px',
        theme: "Weapon",
    },
    {
        name: "Runed Soulblade",
        textPrefix: "Permanent: ",
        textSuffix: "At the end of your turn, you heal 1.",
        imageUrl: 'img/runed-soulblade.jpg',
        imagePosition: '0px 0px',
        theme: "Weapon",
    },
    {
        name: "Soulbreaker",
        textPrefix: "Permanent: ",
        textSuffix: "At the end of your turn, remove 1 ghoul from your space.",
        imageUrl: 'img/soulbreaker.jpg',
        imagePosition: '0px -14px',
        theme: "Weapon",
    },
    {
        name: "Glacial Advance",
        textPrefix: "Any Time: ",
        textSuffix: "Deal 2 damage on a space and 1 damage on a connected space.",
        imageUrl: 'img/glacial-advance.jpg',
        imagePosition: '0px 0px',
        theme: "Death Knight",
    },
    {
        name: "Deathcharger",
        textPrefix: "Permanent: ",
        textSuffix: 'When you play a "Travel" card, remove up to 2 ghouls from the end space.',
        imageUrl: 'img/deathcharger.jpg',
        imagePosition: '2px -11px',
        theme: "Death Knight",
    },
    {
        name: "Amulet of Spell Shield",
        textPrefix: "Permanent: ",
        textSuffix: "Ignore the Lich King's +1 damage.",
        imageUrl: 'img/amulet-of-spell-shield.jpg',
        imagePosition: '0px 0px',
        theme: "Misc",
    },
    {
        name: "Chrono-acceleration",
        textPrefix: "Actions Step: ",
        textSuffix: "When the current hero plays cards this turn, their effects has +1.",
        imageUrl: 'img/chronoacceleration.jpg',
        imagePosition: '0px -25px',
        theme: "Time",
    },
    {
        name: "Runeforging",
        textPrefix: "Permanent: ",
        textSuffix: "All heroes have +🛡️ when they fight.",
        imageUrl: 'img/runeforging.jpg',
        imagePosition: '0px 0px',
        theme: "Death Knight",
    },
    {
        name: "Protect the Innocent",
        textPrefix: "Permanent: ",
        textSuffix: "When a hero takes damage, another hero may suffer the damage instead.",
        imageUrl: 'img/protect-the-innocent.jpg',
        imagePosition: '0px 0px',
        theme: "Argent",
    },
    {
        name: "Chronoecho",
        textPrefix: "Actions Step: ",
        textSuffix: "When the current hero fights, quests, or rests this turn, they have +✊🏼.",
        imageUrl: 'img/chronoecho.jpg',
        imagePosition: '0px -21px',
        theme: "Time",
    },
    {
        name: "Taunka Tent",
        textPrefix: "Any Time: ",
        textSuffix: "All heroes on your space heal to full health.",
        imageUrl: 'img/taunka-tent.jpg',
        imagePosition: '-6px 3px',
        theme: "Misc",
    },
    {
        name: "Gyrocopter",
        textPrefix: "Any Time: ",
        textSuffix: "Move to any space and remove up to 1 ghoul from that space.",
        imageUrl: 'img/gyrocopter.jpg',
        imagePosition: '4px -38px',
        theme: "Misc",
    },
    {
        name: "Gyrocopter",
        textPrefix: "Any Time: ",
        textSuffix: "Move to any space in your region and remove up to 2 ghouls from that space.",
        imageUrl: 'img/gyrocopter-alt.jpg',
        imagePosition: '4px -38px',
        theme: "Misc",
    },
    {
        name: "Cloak of Flames",
        textPrefix: "Permanent: ",
        textSuffix: "Whenever you enter a space, remove 1 ghoul from it.",
        imageUrl: 'img/cloak-of-flames.jpg',
        imagePosition: '0px 0px',
        theme: "Misc",
    },
    {
        name: "Crescent Amulet",
        textPrefix: "Permanent: ",
        textSuffix: "At the end of your turn, 1 hero heals 1.",
        imageUrl: 'img/crescent-amulet.webp',
        imagePosition: '0px 0px',
        theme: "Misc",
        collection: "Silver Crescent",
    },
    // Darkmoon Faire
    {
        name: 'Darkmoon Chest',
        textPrefix: 'Immediately: ',
        textSuffix: 'Replace all your cards by 3 random reward cards from the box.',
        imageUrl: 'img/darkmoon-chest.jpg',
        imagePosition: '0px -28px',
        theme: 'Faire',
        collection: 'Darkmoon Faire',
    },
    {
        name: 'Deck of Lunacy',
        textPrefix: 'Permanent: ',
        textSuffix: '+✊🏼✊🏼 when you fight but cancel all rolled 🛡️.',
        imageUrl: 'img/deck-of-lunacy.jpg',
        imagePosition: '0px 0px',
        theme: 'Faire',
        collection: 'Darkmoon Faire',
    },
    {
        name: 'Deck of Chaos',
        textPrefix: 'Permanent: ',
        textSuffix: '+✊🏼 when you quest but cancel all rolled 🛡️.',
        imageUrl: 'img/deck-of-chaos.jpg',
        imagePosition: '0px 0px',
        theme: 'Faire',
        collection: 'Darkmoon Faire',
    },
    {
        name: 'Balloon Merchant',
        textPrefix: 'Immediately: ',
        textSuffix: 'Heroes on this space may move to any space.',
        imageUrl: 'img/balloon-merchant.jpg',
        imagePosition: '0px -36px',
        theme: 'Faire',
        collection: 'Darkmoon Faire',
    },
    {
        name: 'Darkmoon Dirigible',
        textPrefix: 'Any Time: ',
        textSuffix: 'Move up to 2 heroes to any single space.',
        imageUrl: 'img/darkmoon-dirigible.jpg',
        imagePosition: '0px -10px',
        theme: 'Faire',
        collection: 'Darkmoon Faire',
    },
];

function addRewardCard(rewardId, parentElement) {
    // clone ref sheet
    let refSheet = document.querySelector('.reward-card');
    let newSheet = refSheet.cloneNode(true);

    // display new sheet
    newSheet.style.display = '';
    newSheet.setAttribute('data-reward-id', rewardId);
    parentElement.appendChild(newSheet);

    // bind sheet
    new RewardCard(rewardCardConfigs[rewardId], newSheet)
        .updateElements()
        .enableEdition();
}

window.addEventListener('load', function() {
    if (window.location.pathname.endsWith('reward-card.html')) {
        // render menu items with quests page as initially active
        grid.renderEditMenus('quests');
        grid.enableEdition();
        // display from url rewards then quests
        grid.displayFromUrl('collections', rewardCardConfigs, 'collection', addRewardCard);
        grid.displayFromUrl('rewards', rewardCardConfigs, 'name', addRewardCard);
        grid.displayFromUrl('collections', questConfigs, 'collection', addQuest);
        grid.displayFromUrl('quests', questConfigs, 'location', addQuest);
    }
    // display random if empty
    if (grid.isEmpty()) {
        if (window.location.pathname.endsWith('hero-card.html')) {
            grid.displayRandom(heroConfigs, addHero);
        } else if (window.location.pathname.endsWith('quest-sheet.html')) {
            grid.displayRandom(questConfigs, addQuest);
            grid.displayRandom(rewardCardConfigs, addRewardCard);
        } else if (window.location.pathname.endsWith('reward-card.html')) {
            grid.displayRandom(rewardCardConfigs, addRewardCard);
        } else {
            grid.displayRandom(heroConfigs, addHero);
            grid.displayRandom(heroActionCardConfigs, addHeroAction);
            grid.displayRandom(questConfigs, addQuest);
            grid.displayRandom(rewardCardConfigs, addRewardCard);
        }
    }
});

function addSilverCrescentContent() {
    // remember we have added the content
    localDefaults.silverCrescentAdded = true;
}