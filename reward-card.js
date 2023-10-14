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
        if (config.imagePosition != null) this.element.querySelector('.reward-image').style.backgroundPosition = config.imagePosition;
        if (config.imageSize != null) this.element.querySelector('.reward-image').style.backgroundSize = config.imageSize;
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
        textPrefix: "Weapon: ",
        textSuffix: "After you fight, deal 1 damage on a connected space.",
        imageUrl: 'img/shadowmourne.jpg',
    },
    {
        name: "Quel'Delar",
        textPrefix: "Weapon: ",
        textSuffix: "+✊🏼 when you fight.",
        imageUrl: 'img/queldelar.jpg',
    },
    {
        name: "Val'anyr",
        textPrefix: "Weapon: ",
        textSuffix: "At the end of your turn, a hero on your space heals 1.",
        imageUrl: 'img/valanyr.jpg',
    },
    {
        name: "Bryntroll",
        textPrefix: "Weapon: ",
        textSuffix: "After you fight, heal 1.",
        imageUrl: 'img/bryntroll.jpg',
    },
    {
        name: "Hearthstone",
        textPrefix: "Any Time: ",
        textSuffix: "Move to your starting space and rest.",
        imageUrl: 'img/hearthstone.jpg',
    },
    {
        name: "Refreshments",
        textPrefix: "Immediately: ",
        textSuffix: "All heroes on your space heal to full health.",
        imageUrl: 'img/refreshments.jpg',
    },
].sort((a, b) => a.name.localeCompare(b.name));

function rewardMenuItemClick(editButton) {
    addRewardCard(editButton.dataset.rewardId, editButton.parentElement.parentElement);
    editButton.parentElement.style.display = 'none';
}

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
    // create edit items for each edit menu
    var menuItems = "";
    for (var idx = 0; idx < rewardCardConfigs.length; idx++) {
        let config = rewardCardConfigs[idx];
        let displayName = config.name;
        menuItems += `<span class="edit-button reward" data-reward-id="${idx}" onclick="rewardMenuItemClick(this)" title="Edit ${displayName} reward">➕️️ \u00A0${displayName}</span>`;
    }
    document.querySelectorAll('.edit-menu').forEach((editMenu) => {
        editMenu.innerHTML += menuItems;
    });

    if (window.location.pathname.endsWith('reward-card.html')) {
        // display either close sign or edit menu on hover based on the quest sheet's visibility
        document.querySelectorAll('.hover-div').forEach((hoverDiv) => {
            hoverDiv.addEventListener('mouseover', function() {
                const hasSheet = hoverDiv.querySelector('.reward-card, .quest-sheet') !== null;
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

        // remove reward card when close is clicked
        document.querySelectorAll('.close-sign').forEach((closeSign) => closeSign.addEventListener('click', () => {
            closeSign.parentNode.querySelector('.reward-card, .quest-sheet').remove();
            closeSign.style.display = 'none'
        }));

        // display one reward on first grid cell
        let defaultId = rewardCardConfigs.findIndex(obj => obj.name === 'Hearthstone');
        addRewardCard(defaultId, document.querySelector('.hover-div'));
    }

});
