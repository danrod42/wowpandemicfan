collections = [
    {
        name: 'Argent Tournament',
        heroes: ['Eadric the Pure'],
        quests: ['Argent Tournament', 'Argent Tournament', "Anub'arak Encounter"],
    },
    {
        name: 'Broken Shackles',
        heroes: ['Gymer', 'Hodir', 'Kilix', 'Roanauk Icemist'],
    },
    {
        name: 'Kirin Tor',
        heroes: ['Aethas Sunreaver', 'Jaina Proudmoore', 'Rhonin', 'Vereesa Windrunner'],
        quests: ['Dalaran']
    },
    {
        name: 'Knights of the Ebon Blade',
        heroes: ['Darion Mograine', 'Thassarian', 'Koltira Deathweaver'],
        quests: ['Shadow Vault'],
    },
    {
        name: 'Reinforcements',
        heroes: ['Elite Tauren Chieftain', 'Magni Bronzebeard', 'Valeera Sanguinar'],
    },
    {
        name: 'Scarlet Crusade',
        heroes: ['Lilian Voss', 'Sally Whitemane'],
        quests: ['Onslaught Harbor'],
    },
    {
        name: 'The Wrathgate',
        heroes: ['Bolvar Fordragon', 'Dranosh Saurfang', 'Putress'],
        quests: ['The Wrathgate']
    },
    {
        name: 'Wyrmrest Accord',
        heroes: ['Alexstrasza', 'Chromie', 'Kalecgos', 'Nalice']
    },
    {
        name: 'Others',
        heroes: ['Brann Bronzebeard', 'Garrosh Hellscream', 'Varok Saurfang'],
        quests: ["Drak'tharon Keep", "Temple City of En'kilah"]
    },
]

heroConfigs = [
    {
        "faction": "horde",
        "heroName": "Aethas Sunreaver",
        "heroTitle": "Archmage",
        "heroQuote": "\"We must overcome the mistakes of the past.\"",
        "heroImageUrl": "aethas-sunreaver.jpg",
        "heroImagePosition": "11px -48px",
        "heroImageSize": "96%",
        "health": 7,
        "startingLocation": "DALARAN",
        "startingZone": "green",
        "power1Name": "Fireball",
        "power1DescPrefix": "Free Action: ",
        "power1DescSuffix": "Remove 1 ghoul from your space. Limit once per turn.",
        "power2Name": "Blink",
        "power2DescPrefix": "Free Action: ",
        "power2DescSuffix": "Move to a connected space. Limit once per turn."
    },
    {
        "faction": "wyrmrest",
        "heroName": "Alexstrasza",
        "heroTitle": "The Life-Binder",
        "heroQuote": "\"Life itself is with you.\"",
        "heroImageUrl": "alexstrasza.png",
        "heroImagePosition": "5px -20px",
        "heroImageSize": "cover",
        "health": 8,
        "startingLocation": "WYRMREST TEMPLE",
        "startingZone": "purple",
        "power1Name": "Gift of Life",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "One hero in your region heals 3, and you suffer 1 damage. Limit once per turn.",
        "power2Name": "Flame Buffet",
        "power2DescPrefix": "Free Action: ",
        "power2DescSuffix": "Remove 1 ghoul from your space and move up to 1 enemy to a connected space. Limit once per turn."
    },
    {
        "faction": "alliance",
        "heroName": "Bolvar Fordragon",
        "heroTitle": "Highlord",
        "heroQuote": "\"I don't know what awaits us.\"",
        "heroImageUrl": "bolvar-fordragon.jpg",
        "heroImagePosition": "10px -28px",
        "heroImageSize": "96%",
        "health": 7,
        "startingLocation": "VALIANCE KEEP",
        "startingZone": "red",
        "power1Name": "Crusader Strike",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Remove up to 2 ghouls from your space. Limit once per turn.",
        "power2Name": "Fordragon's Resolve",
        "power2DescPrefix": "",
        "power2DescSuffix": "Heroes on your space have +🛡️ when they fight."
    },
    {
        "faction": "explorers",
        "heroName": "Brann Bronzebeard",
        "heroTitle": "Leader of the Explorers' League",
        "heroQuote": "\"The answers are here, I can feel it.\"",
        "heroImageUrl": "brann-bronzebeard.png",
        "heroImagePosition": "0px 0px",
        "heroImageSize": "cover",
        "health": 6,
        "startingLocation": "TEMPLE OF STORMS",
        "startingZone": "green",
        "power1Name": "Survey",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "+✊🏼 on your next quest action this turn. Limit once per turn.",
        "power2Name": "Historian",
        "power2DescPrefix": "",
        "power2DescSuffix": "When you quest, you may contribute the top card of the hero discard pile as if it were in your hand."
    },
    {
        "faction": "wyrmrest",
        "heroName": "Chromie",
        "heroTitle": "Ambassador of the Bronze Dragonflight",
        "heroQuote": "\"Is this the first time we've met?\"",
        "heroImageUrl": "chromie.jpg",
        "heroImagePosition": "8px -16px",
        "heroImageSize": "cover",
        "health": 8,
        "startingLocation": "WYRMREST TEMPLE",
        "startingZone": "purple",
        "power1Name": "Rewind",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Move the top card from the hero discard pile into your hand. Limit once per turn.",
        "power2Name": "See the Future",
        "power2DescPrefix": "Free Action: ",
        "power2DescSuffix": "Peek at the top card of the Scourge deck."
    },
    {
        "faction": "ebon-blade",
        "heroName": "Darion Mograine",
        "heroTitle": "Leader of The Knights of the Ebon Blade",
        "heroQuote": "\"The Knights of the Ebon Blade will not falter.\"",
        "heroImageUrl": "darion-mograine.png",
        "heroImagePosition": "-71px 2px",
        "heroImageSize": "cover",
        "health": 7,
        "startingLocation": "SHADOW VAULT",
        "startingZone": "green",
        "power1Name": "Dark Command",
        "power1DescPrefix": "Free Action: ",
        "power1DescSuffix": "Roll 1 die, remove 1 ghoul on your space for each rolled ✊🏼. Limit once per turn.",
        "power2Name": "Corpse Explosion",
        "power2DescPrefix": "",
        "power2DescSuffix": "For every 2 enemies that die on your space during your actions, deal 1 damage among enemies on connected spaces."
    },
    {
        "faction": "horde",
        "heroName": "Dranosh Saurfang",
        "heroTitle": "Commander of the Kor'kron Vanguard",
        "heroQuote": "\"Blood and glory await us!\"",
        "heroImageUrl": "dranosh-saurfang.png",
        "heroImagePosition": "-15px 4px",
        "heroImageSize": "cover",
        "health": 6,
        "startingLocation": "THE WRATHGATE",
        "startingZone": "red",
        "power1Name": "Charge",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Move to a connected space and fight on that space. Limit once per turn.",
        "power2Name": "Enrage",
        "power2DescPrefix": "",
        "power2DescSuffix": "+✊🏼 when you fight if you have 4 health or less."
    },
    {
        "faction": "argent",
        "heroName": "Eadric the Pure",
        "heroTitle": "Grand Champion of the Argent Crusade",
        "heroQuote": "\"We must all be strong in the presence of the Scourge.\"",
        "heroImageUrl": "eadric-the-pure.jpg",
        "heroImagePosition": "11px -54px",
        "heroImageSize": "96%",
        "health": 7,
        "startingLocation": "ARGENT TOURNAMENT",
        "startingZone": "green",
        "power1Name": "Holy Light",
        "power1DescPrefix": "Free Action: ",
        "power1DescSuffix": "Another hero on your space heals 1 or remove 1 ghoul from your space. Limit once per turn.",
        "power2Name": "Divine Shield",
        "power2DescPrefix": "Free Action: ",
        "power2DescSuffix": "You take no damage during your next action this turn. Limit once per turn."
    },
    {
        "faction": "horde",
        "heroName": "Elite Tauren Chieftain",
        "heroTitle": "Rock God",
        "heroQuote": "\"I am Murloc!\"",
        "heroImageUrl": "elite-tauren-chieftain.jpg",
        "heroImagePosition": "-77px 1px",
        "heroImageSize": "136%",
        "health": 7,
        "startingLocation": "The Nexus",
        "startingZone": "red",
        "power1Name": "Mosh Pit",
        "power1DescPrefix": "Free Action: ",
        "power1DescSuffix": "Remove up to 2 ghouls from your space. Heroes on your space suffer 1 damage each. Limit once per turn.",
        "power2Name": "Pumped Up!",
        "power2DescPrefix": "",
        "power2DescSuffix": "Heroes on your space have +🛡️ when they quest."
    },
    {
        "faction": "horde",
        "heroName": "Garrosh Hellscream",
        "heroTitle": "Overlord of the Warsong Offensive",
        "heroQuote": "\"Show them no mercy.\"",
        "heroImageUrl": "garrosh-hellscream.png",
        "heroImagePosition": "5px -8px",
        "heroImageSize": "100%",
        "health": 6,
        "startingLocation": "WARSONG HOLD",
        "startingZone": "red",
        "power1Name": "Bloodthirst",
        "power1DescPrefix": "Free Action: ",
        "power1DescSuffix": "Remove 1 ghoul from your space and heal 1. Limit once per turn.",
        "power2Name": "Armor Up",
        "power2DescPrefix": "",
        "power2DescSuffix": "+🛡️ for each 2 missing health points when you fight or quest."
    },
    {
        "faction": "hs",
        "heroName": "Gymer",
        "heroTitle": "King of Storm Giants",
        "heroQuote": "\"I will crush you all!\"",
        "heroImageUrl": "gymer.jpg",
        "heroImagePosition": "7px 2px",
        "heroImageSize": "112%",
        "health": 8,
        "startingLocation": "Thrym's End",
        "startingZone": "purple",
        "power1Name": "Smash",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Remove up to 3 ghouls from your space.",
        "power2Name": "Throw",
        "power2DescPrefix": "Free Action: ",
        "power2DescSuffix": "Move 1 ghoul from your space to another space in your region. Limit once per turn."
    },
    {
        "faction": "hs",
        "heroName": "Hodir",
        "heroTitle": "Father of Giants",
        "heroQuote": "\"Winds of the north consume you!\"",
        "heroImageUrl": "hodir.jpg",
        "heroImagePosition": "11px -61px",
        "heroImageSize": "96%",
        "health": 8,
        "startingLocation": "ULDUAR",
        "startingZone": "green",
        "power1Name": "Frost Fortitude",
        "power1DescPrefix": "",
        "power1DescSuffix": "+🛡️🛡️ when you fight.",
        "power2Name": "Protective Gaze",
        "power2DescPrefix": "",
        "power2DescSuffix": "Other heroes in your region have +🛡️ when they quest."
    },
    {
        "faction": "alliance",
        "heroName": "Jaina Proudmoore",
        "heroTitle": "Archmage",
        "heroQuote": "\"You asked for it.\"",
        "heroImageUrl": "jaina-proudmoore.png",
        "heroImagePosition": "10px -5px",
        "heroImageSize": "cover",
        "health": 6,
        "startingLocation": "VALIANCE KEEP",
        "startingZone": "red",
        "power1Name": "Blizzard",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Remove up to 2 ghouls from a connected space. Each hero on that space suffers 1 damage. Limit once per turn.",
        "power2Name": "Ice Armor",
        "power2DescPrefix": "",
        "power2DescSuffix": "+🛡️ when you quest."
    },
    {
        "faction": "wyrmrest",
        "heroName": "Kalecgos",
        "heroTitle": "Ambassador of the Blue Dragonflight",
        "heroQuote": "\"The fate of the world hangs in the balance.\"",
        "heroImageUrl": "kalecgos.png",
        "heroImagePosition": "-14px 5px",
        "heroImageSize": "148%",
        "health": 8,
        "startingLocation": "WYRMREST TEMPLE",
        "startingZone": "purple",
        "power1Name": "Blazing Shadows",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Move up to 2 spaces. Remove 1 ghoul from each space you exit. Limit once per turn.",
        "power2Name": "Kalecgos' Teleport",
        "power2DescPrefix": "Action: ",
        "power2DescSuffix": "Move another hero on your space to any space in your region. Limit once per turn."
    },
    {
        "faction": "hs",
        "heroName": "Kilix",
        "heroTitle": "The Unraveler",
        "heroQuote": "\"This is no place for the meek.\"",
        "heroImageUrl": "kilix.jpg",
        "heroImagePosition": "11px -20px",
        "heroImageSize": "96%",
        "health": 6,
        "startingLocation": "AZJOL-NERUB",
        "startingZone": "red",
        "power1Name": "Web",
        "power1DescPrefix": "Free Action: ",
        "power1DescSuffix": "+🛡️ during your next fight action this turn. Limit once per turn.",
        "power2Name": "Azjol-anak Battleguards",
        "power2DescPrefix": "",
        "power2DescSuffix": "+✊🏼 and +🛡️ when you fight."
    },
    {
        "faction": "horde",
        "heroName": "Koltira Deathweaver",
        "heroTitle": "Knight of the Ebon Blade",
        "heroQuote": "\"Come and learn what it takes to slay an elf.\"",
        "heroImageUrl": "koltira-deathweaver.png",
        "heroImagePosition": "-8px 5px",
        "heroImageSize": "108%",
        "health": 7,
        "startingLocation": "AZJOL-NERUB",
        "startingZone": "red",
        "power1Name": "Byfrost",
        "power1DescPrefix": "",
        "power1DescSuffix": "After you fight, heal 1 for every 2 enemies killed.",
        "power2Name": "Bloodmist",
        "power2DescPrefix": "",
        "power2DescSuffix": "Whenever you use a travel card, you can move 1 more space."
    },
    {
        "faction": "scarlet",
        "heroName": "Lilian Voss",
        "heroTitle": "Scarlet Crusader",
        "heroQuote": "\"Get away from me, you abomination!\"",
        "heroImageUrl": "lilian-voss-alive.jpg",
        "heroImagePosition": "-2px -65px",
        "heroImageSize": "cover",
        "health": 6,
        "startingLocation": "ONSLAUGHT HARBOR",
        "startingZone": "red",
        "power1Name": "Sprint",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Move up to 2 spaces. Limit once per turn.",
        "power2Name": "Stealth",
        "power2DescPrefix": "Action: ",
        "power2DescSuffix": "Advance quest marker 1 space. Limit once per turn. Can only be used on a quest space."
    },
    {
        "faction": "alliance",
        "heroName": "Magni Bronzebeard",
        "heroTitle": "Lord of Ironforge",
        "heroQuote": "\"Feel the fury of the mountain!\"",
        "heroImageUrl": "magni.jpg",
        "heroImagePosition": "6px -6px",
        "heroImageSize": "96%",
        "health": 7,
        "startingLocation": "FROSTHOLD",
        "startingZone": "green",
        "power1Name": "Avatar",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "+🛡️ when you fight or quest this turn. Limit once per turn.",
        "power2Name": "Thunderous Charge",
        "power2DescPrefix": "Action: ",
        "power2DescSuffix": "Move to a connected space and remove up to 2 ghouls from that space. Limit once per turn."
    },
    {
        "faction": "wyrmrest",
        "heroName": "Nalice",
        "heroTitle": "Ambassador of the Black Dragonflight",
        "heroQuote": "\"The presence of a Black Dragon makes you nervous?",
        "heroImageUrl": "nalice.jpg",
        "heroImagePosition": "-48px 5px",
        "heroImageSize": "136%",
        "health": 8,
        "startingLocation": "WYRMREST TEMPLE",
        "startingZone": "purple",
        "power1Name": "Breathe",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Remove 1 ghoul from your space and 1 ghoul from a connected space. Limit once per turn.",
        "power2Name": "Fly",
        "power2DescPrefix": "Action: ",
        "power2DescSuffix": "Move up to 3 spaces. Limit once per turn."
    },
    {
        "faction": "horde",
        "heroName": "Putress",
        "heroTitle": "Grand Apothecary",
        "heroQuote": "\"Did you think we had forgotten?\"",
        "heroImageUrl": 'putress.jpg',
        "heroImagePosition": "10px 0px",
        "heroImageSize": "96%",
        "health": 6,
        "startingLocation": "THE WRATHGATE",
        "startingZone": "red",
        "power1Name": "New Plague",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Deal up to 3 damage on a connected space. All heroes on that space die. Limit once per turn.",
        "power2Name": "Coup Plotter",
        "power2DescPrefix": "",
        "power2DescSuffix": "You cannot use hero card effects on other heroes."
    },
    {
        "faction": "kirin-tor",
        "heroName": "Rhonin",
        "heroTitle": "Leader of the Kirin Tor",
        "heroQuote": "\"Citizens of Dalaran!\"",
        "heroImageUrl": "rhonin.png",
        "heroImagePosition": "0px 0px",
        "heroImageSize": "cover",
        "health": 6,
        "startingLocation": "DALARAN",
        "startingZone": "green",
        "power1Name": "Arcane Explosion",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Remove up to 2 ghouls among your space and connected spaces. Limit once per turn.",
        "power2Name": "Dalaran Summon",
        "power2DescPrefix": "Action: ",
        "power2DescSuffix": "Move a hero in your region to Dalaran. Limit once per turn."
    },
    {
        "faction": "horde",
        "heroName": "Roanauk Icemist",
        "heroTitle": "High Chieftain of the Taunka",
        "heroQuote": "\"For my Taunka brothers and sisters!\"",
        "heroImageUrl": "roanauk-icemist.jpg",
        "heroImagePosition": "11px 5px",
        "heroImageSize": "112%",
        "health": 7,
        "startingLocation": "AZJOL-NERUB",
        "startingZone": "red",
        "power1Name": "Icemist's Blessing",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "+✊🏼✊🏼 during your next fight action this turn. Limit once per turn.",
        "power2Name": "Glory of the Ancestors",
        "power2DescPrefix": "",
        "power2DescSuffix": "When another hero in your region dies, they do not discard their cards and resurrect with full health on the same space."
    },
    {
        "faction": "scarlet",
        "heroName": "Sally Whitemane",
        "heroTitle": "High Inquisitor of the Scarlet Crusade",
        "heroQuote": "\"The light has spoken!\"",
        "heroImageUrl": "sally-whitemane.png",
        "heroImagePosition": "-1px -31px",
        "heroImageSize": "cover",
        "health": 6,
        "startingLocation": "ONSLAUGHT HARBOR",
        "startingZone": "red",
        "power1Name": "Divine Reckoning",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Fight and heal 1 hero on your space 1 for each rolled 🛡️. Limit once per turn.",
        "power2Name": "Searing Lash",
        "power2DescPrefix": "Free Action: ",
        "power2DescSuffix": "Remove 1 ghoul from your space and move up to 1 ghoul to a connected space. Limit once per turn."
    },
    {
        "faction": "alliance",
        "heroName": "Thassarian",
        "heroTitle": "Knight of the Ebon Blade",
        "heroQuote": "\"Sometimes lessons are painful, aren't they?\"",
        "heroImageUrl": "thassarian.jpg",
        "heroImagePosition": "10px -14px",
        "heroImageSize": "96%",
        "health": 7,
        "startingLocation": "VALIANCE KEEP",
        "startingZone": "red",
        "power1Name": "Death Pact",
        "power1DescPrefix": "Free Action: ",
        "power1DescSuffix": "Remove 1 ghoul from your space and heal 1. Limit once per turn.",
        "power2Name": "Empowered Blood Presence",
        "power2DescPrefix": "",
        "power2DescSuffix": "After you fight, heal 1."
    },
    {
        "faction": "alliance",
        "heroName": "Valeera Sanguinar",
        "heroTitle": "Champion of the Crimson Ring",
        "heroQuote": "\"Respect my people, or pay the price!\"",
        "heroImageUrl": "valeera-sanguinar.png",
        "heroImagePosition": "10px -5px",
        "heroImageSize": "cover",
        "health": 6,
        "startingLocation": "VALIANCE KEEP",
        "startingZone": "red",
        "power1Name": "Sinister Strike",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Move to a connected space and remove 1 ghoul from that space. Limit once per turn.",
        "power2Name": "Poisoned Blades",
        "power2DescPrefix": "",
        "power2DescSuffix": "+✊🏼 when you fight."
    },
    {
        "faction": "horde",
        "heroName": "Varok Saurfang",
        "heroTitle": "High Overlord",
        "heroQuote": "\"No matter how dire the battle, never forsake it.\"",
        "heroImageUrl": "varok-saurfang.jpg",
        "heroImagePosition": "11px -37px",
        "heroImageSize": "96%",
        "health": 7,
        "startingLocation": "WARSONG HOLD",
        "startingZone": "red",
        "power1Name": "Whirlwind",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Deal up to 3 damage on your space. Limit once per turn.",
        "power2Name": "Terrifying Roar",
        "power2DescPrefix": "Free Action: ",
        "power2DescSuffix": "Move up to 2 ghouls from your space to connected spaces."
    },
    {
        "faction": "alliance",
        "heroName": "Vereesa Windrunner",
        "heroTitle": "Ranger-General of the Silver Covenant",
        "heroQuote": "\"We have all lost so much.\"",
        "heroImageUrl": "vereesa-windrunner.jpg",
        "heroImagePosition": "9px -64px",
        "heroImageSize": "96%",
        "health": 6,
        "startingLocation": "DALARAN",
        "startingZone": "green",
        "power1Name": "Multi-Shot",
        "power1DescPrefix": "Action: ",
        "power1DescSuffix": "Deal up to 3 damage among your space and connected spaces. Limit once per turn.",
        "power2Name": "Track",
        "power2DescPrefix": "",
        "power2DescSuffix": "At the start of your turn, flip the top card of the hero deck faceup."
    },
]

window.addEventListener('load', function() {

    let randomCollection = collections[Math.floor(Math.random() * collections.length)];

    const checkboxList = document.querySelector('.list-of-heroes');
    for (var i = 0; i < heroConfigs.length; i++) {
        // Create checkbox input element
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = heroConfigs[i].heroName.split(' ')[0];
        checkbox.value = i;
        checkbox.checked = randomCollection.heroes.includes(heroConfigs[i].heroName);
        // Add a change event listener
        checkbox.addEventListener('change', function() {
            // Code to execute when the checkbox state changes
            if (this.checked) {
                addHero(this.value);
            } else {
                removeHero(this.value);
            }
        });

        // Create label for the checkbox
        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(heroConfigs[i].heroName.split(' ')[0]));

        // Add checkbox and label to the container
        checkboxList.appendChild(label);

        // add hero
        if (randomCollection.heroes.includes(heroConfigs[i].heroName))
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


