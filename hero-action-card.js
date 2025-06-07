class HeroActionCard {
    constructor(config, element) {
        this.config = config;
        this.element = element;
    }

    updateElements() {
        let config = this.config;
        if (config.actionType != null) this.setActionType(config.actionType);
        if (config.name != null) this.setElementText('.hero-action-name[contenteditable=true]', config.name);
        if (config.textPrefix != null) this.setElementText('.hero-action-text-prefix[contenteditable=true]', config.textPrefix);
        if (config.textSuffix != null) this.setElementText('.hero-action-text-suffix[contenteditable=true]', config.textSuffix);
        if (config.imageUrl != null) this.setImageUrl(config.imageUrl);
        if (config.imagePosition != null) this.element.querySelector('.hero-action-card-image').style.backgroundPosition = config.imagePosition;
        if (config.imageSize != null) this.element.querySelector('.hero-action-card-image').style.backgroundSize = config.imageSize;
        if (config.numericModifier != null) this.setElementText('.hero-action-number [contenteditable=true]', config.numericModifier);
        return this;
    }

    hideOrShowNumericModifier() {
        // display numeric modifier only if the action should have one
        this.element.querySelector('.hero-action-number').style.display = ['fight', 'travel'].includes(this.getActionType()) ? 'block' : 'none';
    }

    enableEdition() {
        let element = this.element;

        new UploadableImage(element.querySelector('.uploadable-image'));

        // outer element to rotate background when an inner clickable element was not
        new RotatableImage(
            element.querySelector('.hero-action-card-front'),
            ['fight', 'defend', 'heal', 'travel'],
            null,
            '.uploadable-image-event-source-excluded',
            '.uploadable-image',
            _ => this.hideOrShowNumericModifier(),
        );

        // auto-select-all for numeric modifier
        element.querySelectorAll('.hero-action-number [contenteditable=true]').forEach(
            editableDiv => editableDiv.addEventListener('click', () => {
                // Create a new Range object
                const range = document.createRange();

                // Select the entire contents of the editable div
                range.selectNodeContents(editableDiv);

                // Get the Selection object and add the Range to it
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);

                event.stopPropagation();
            })
        );


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

    getActionType() {
        const prevImage = window.getComputedStyle(this.element.querySelector('.hero-action-card-front')).getPropertyValue('background-image');
        return prevImage.slice(prevImage.indexOf('-') + 1, prevImage.lastIndexOf('.'));
    }

    setActionType(actionType) {
        this.config.actionType = actionType;
        this.element.querySelector('.hero-action-card-front').style.backgroundImage = 'url("img/action-' + actionType + '.png")';
        this.hideOrShowNumericModifier();
    }

    getElementText(selector, matchIdx = 0) {
        return this.element.querySelectorAll(selector)[matchIdx].innerText;
    }

    setElementText(selector, text, matchIdx = 0) {
        this.element.querySelectorAll(selector)[matchIdx].innerText = text;
    }

    getImageUrl() {
        return window.getComputedStyle(this.element.querySelector('.hero-action-card-image')).getPropertyValue('background-image');
    }

    setImageUrl(imageUrl) {
        if (!imageUrl.startsWith('url(') && !imageUrl.startsWith('data('))
            imageUrl = 'url("' + imageUrl + '")'
        this.element.querySelector('.hero-action-card-image').style.backgroundImage = imageUrl;
    }

    static fromDivs(element) {
        const tmp = new HeroActionCard(null, element);
        return new HeroActionCard({
            actionType: tmp.getActionType(),
            name: tmp.getElementText('.hero-action-name'),
            textPrefix: tmp.getElementText('.hero-action-text-prefix'),
            textSuffix: tmp.getElementText('.hero-action-text-suffix'),
            imageUrl: tmp.getImageUrl(),
            imagePosition: window.getComputedStyle(tmp.element.querySelector('.hero-action-card-image')).getPropertyValue('background-position'),
            imageSize: window.getComputedStyle(tmp.element.querySelector('.hero-action-card-image')).getPropertyValue('background-size'),
            numericModifier: tmp.getElementText('.hero-action-number [contenteditable=true]'),
            theme: 'Action',
        }, element);
    }
}

const heroActionCardConfigs = [
    {
        actionType: "fight",
        name: "Fight",
        textPrefix: "",
        textSuffix: "+✊🏼✊🏼✊🏼 to any fight on your space.",
        imageUrl: "img/poison.jpg",
        imagePosition: "0% 0%",
        imageSize: "108%",
        numericModifier: "3",
        theme: "Action",
    },
    {
        actionType: "defend",
        name: "Protect",
        textPrefix: "",
        textSuffix: "Prevent 1 damage on your space. The rest can be taken by any hero there.",
        imageUrl: 'img/protect-the-innocent.jpg',
        imagePosition: "0% 0%",
        imageSize: "cover",
        theme: "Action",
    },
    {
        actionType: "heal",
        name: "Hearth",
        textPrefix: "Action: ",
        textSuffix: "Move to your starting space and rest.",
        imageUrl: 'img/hearthstone.jpg',
        imagePosition: "0% 0%",
        imageSize: "cover",
        theme: "Action",
    },
    {
        actionType: "travel",
        name: "Deathcharger",
        textPrefix: "Free Action: ",
        textSuffix: "Move any hero on your space up to 3 spaces and remove 1 ghoul from the end space.",
        imageUrl: 'img/deathcharger.jpg',
        imagePosition: "0% 0%",
        imageSize: "cover",
        numericModifier: "3",
        theme: "Action",
    },
];

function addHeroAction(id, parentElement) {
    // clone ref sheet
    let refSheet = document.querySelector('.hero-action-card');
    let newSheet = refSheet.cloneNode(true);

    // display new sheet
    newSheet.style.display = '';
    newSheet.setAttribute('data-hero-action-id', id);
    parentElement.appendChild(newSheet);

    // bind sheet
    new HeroActionCard(heroActionCardConfigs[id], newSheet)
        .updateElements()
        .enableEdition();
}
