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
        console.log(this.element);
        console.log(this.element.querySelector('.reward-card-image'));
        if (!imageUrl.startsWith('url(') && !imageUrl.startsWith('data('))
            imageUrl = 'url("' + imageUrl + '")'
        this.element.querySelector('.reward-card-image').style.backgroundImage = imageUrl;
    }
}

window.addEventListener('load', function() {

    const rewardCardConfigs = [
        {
            name: "Shadowmourne",
            textPrefix: "",
            textSuffix: "After you fight, deal 1 damage on a connected space.",
            imageUrl: 'img/shadowmourne.jpg',
        },
        {
            name: "Quel'Delar",
            textPrefix: "",
            textSuffix: "+✊🏼 when you fight.",
            imageUrl: 'img/queldelar.jpg',
        },
        {
            name: "Val'anyr",
            textPrefix: "",
            textSuffix: "At the end of your turn, a hero on your space heals 1.",
            imageUrl: 'img/valanyr.jpg',
        },
        {
            name: "Bryntroll",
            textPrefix: "",
            textSuffix: "After you fight, heal 1.",
            imageUrl: 'img/bryntroll.jpg',
        },
    ];

    const rewardCardElements = document.querySelectorAll('.reward-card-front');
    for (let i = 0; i < Math.min(rewardCardElements.length, rewardCardConfigs.length); i++) {
        new RewardCard(rewardCardConfigs[i], rewardCardElements[i]).updateElements().enableEdition();
    }
});