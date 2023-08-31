class HeroSheet {

    constructor(config, element) {
        this.config = config;
        this.element = element;
    }

    static fromUrlParams(element) {
        return new HeroSheet(getUrlParams(), element);
    }

    static fromDivs(element) {
        var tmp = new HeroSheet(null, element);
        return new HeroSheet({
            faction: tmp.getFaction(),
            heroName: tmp.getElementText('.hero-name'),
            heroTitle: tmp.getElementText('.hero-title'),
            heroQuote: tmp.getElementText('.hero-quote'),
            heroImageUrl: tmp.getHeroImageUrl(),
            heroImagePosition: window.getComputedStyle(tmp.element.querySelector('.hero-image')).getPropertyValue('background-position'),
            heroImageSize: window.getComputedStyle(tmp.element.querySelector('.hero-image')).getPropertyValue('background-size'),
            health: tmp.getHealth(),
            startingLocation: tmp.getStartingLocation(),
            startingZone: tmp.getStartingZone(),
            power1Name: tmp.getElementText('.power-name'),
            power1DescPrefix: tmp.getElementText('.power-desc-prefix'),
            power1DescSuffix: tmp.getElementText('.power-desc-suffix'),
            power2Name: tmp.getElementText('.power-name', 1),
            power2DescPrefix: tmp.getElementText('.power-desc-prefix', 1),
            power2DescSuffix: tmp.getElementText('.power-desc-suffix', 1),

        }, element);
    }

    getElementText(selector, matchIdx = 0) {
        return this.element.querySelectorAll(selector)[matchIdx].innerText;
    }

    setElementText(selector, text, matchIdx = 0) {
        this.element.querySelectorAll(selector)[matchIdx].innerText = text;
    }

    updateElements() {
        let config = this.config;
        if (config.faction != null) this.setFaction(config.faction);
        if (config.heroName != null) this.setElementText('.hero-name', config.heroName);
        if (config.heroName != null) document.title = 'Unofficial WoW Pandemic Hero - ' + config.heroName || '';
        if (config.heroTitle != null) this.setElementText('.hero-title', config.heroTitle);
        if (config.heroQuote != null) this.setElementText('.hero-quote', config.heroQuote);
        if (config.heroImageUrl != null) this.setHeroImageUrl(config.heroImageUrl);
        if (config.heroImagePosition != null) this.element.querySelector('.hero-image').style.backgroundPosition = config.heroImagePosition;
        if (config.heroImageSize != null) this.element.querySelector('.hero-image').style.backgroundSize = config.heroImageSize;
        if (config.health != null) this.setHealth(config.health);
        if (config.startingLocation != null) this.setStartingLocation(config.startingLocation);
        if (config.startingZone != null) this.setStartingZone(config.startingZone);
        if (config.power1Name != null) this.setElementText('.power-name', config.power1Name, 0);
        if (config.power1DescPrefix != null) this.setElementText('.power-desc-prefix', config.power1DescPrefix, 0);
        if (config.power1DescSuffix != null) this.setElementText('.power-desc-suffix', config.power1DescSuffix, 0);
        if (config.power2Name != null) this.setElementText('.power-name', config.power2Name, 1);
        if (config.power2DescPrefix != null) this.setElementText('.power-desc-prefix', config.power2DescPrefix, 1);
        if (config.power2DescSuffix != null) this.setElementText('.power-desc-suffix', config.power2DescSuffix, 1);
        return this;
    }

    getFaction() {
        const prevImage = window.getComputedStyle(this.element.querySelector('.faction-image')).getPropertyValue('background-image');
        const factions = ['alliance', 'horde', 'argent', 'hs'];
        return prevImage.slice(prevImage.indexOf('-') + 1, prevImage.lastIndexOf('.'));
    }

    setFaction(faction) {
        this.element.querySelector('.faction-image').style.backgroundImage = 'url("img/faction-' + faction + '.png")';
    }

    getHeroImageUrl() {
        return window.getComputedStyle(this.element.querySelector('.hero-image')).getPropertyValue('background-image');
    }

    setHeroImageUrl(heroImageUrl) {
        if (!heroImageUrl.startsWith('url(') && !heroImageUrl.startsWith('data('))
            heroImageUrl = 'url("' + heroImageUrl + '")'
        this.element.querySelector('.hero-image').style.backgroundImage = heroImageUrl;
    }

    getHealth() {
        const prevImage = window.getComputedStyle(this.element.querySelector('.hero-card-bottom')).getPropertyValue('background-image');
        return parseInt(prevImage.charAt(prevImage.length - 7));
    }

    setHealth(health) {
        this.element.querySelector('.hero-card-bottom').style.backgroundImage = 'url("img/health-' + health + '.png")';
    }

    getStartingLocation() {
        return this.element.querySelector("textPath").textContent.trim()
    }

    setStartingLocation(text) {
        text = text || 'Enter starting location';
        this.element.querySelector('.starting-location-input').value = text.toLowerCase();
        if (text.length < 13)
            text = '\xa0'.repeat(13 - text.length) + text;
        this.element.querySelector("textPath").textContent = text.toUpperCase();
    }

    getStartingZone() {
        const prevImage = window.getComputedStyle(this.element.querySelector('.starting-location-image')).getPropertyValue('background-image');
        return prevImage.slice(prevImage.indexOf('-') + 1, prevImage.lastIndexOf('.'));
    }

    setStartingZone(color) {
        this.element.querySelector('.starting-location-image').style.backgroundImage = 'url("img/loc-' + color + '.png")';
    }

    enableEdition() {
        let heroSheet = this.element;
        var heroImage = heroSheet.querySelector('.uploadable-image');
        new UploadableImage(heroImage);

        new RotatableImage(
            heroSheet.querySelector('.faction-image'),
            ['alliance', 'horde', 'argent', 'explorers', 'kirin-tor', 'scarlet', 'ebon-blade', 'wyrmrest', 'hs']
        );
        new RotatableImage(
            heroSheet.querySelector('.hero-card-bottom'),
            ['6', '7', '8']
        );
        new RotatableImage(
            heroSheet.querySelector('.starting-location-image'),
            ['green', 'purple', 'red']
        );

        heroSheet.querySelector("textPath").addEventListener("click", function(event) {
            // Show the popup container and input element
            let popupInput = heroSheet.querySelector(".starting-location-input")
            popupInput.style.display = "block";
            // Set focus to the input element
            popupInput.focus();
            popupInput.select();
            // Prevent the event from propagating to outer div
            event.stopPropagation();
        });

        let updateLocationTextAndHideInput = function() {
            let popupInput = heroSheet.querySelector(".starting-location-input");
            var text = popupInput.value || 'Enter starting location';
            if (text.length < 13)
                text = '\xa0'.repeat(13 - text.length) + text;
            heroSheet.querySelector("textPath").textContent = text.toUpperCase();
            popupInput.style.display = 'none';
        }

        heroSheet.querySelector(".starting-location-input").addEventListener("blur", function() {
            updateLocationTextAndHideInput();
        });

        heroSheet.querySelector(".starting-location-input").addEventListener('keypress', function() {
            if (event.keyCode === 13) {
                updateLocationTextAndHideInput();
            }
        });

        heroSheet.querySelector('.hero-name').addEventListener('input', function() {
            document.title = 'Unofficial WoW Pandemic Hero - ' + this.textContent;
        });

        return this;
    }

}

// This function parses the query string in the URL (window.location.search)
// and converts the parameters into a JSON object
function getUrlParams() {
    var urlParams = {};
    var queryString = window.location.search.substring(1);
    var params = queryString.split('&');

    for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        var paramName = decodeURIComponent(param[0]);
        var paramValue = decodeURIComponent(param[1]);

        // Check if the parameter name already exists in the JSON object
        if (urlParams[paramName]) {
            // If the parameter name already exists, convert the value to an array
            if (!Array.isArray(urlParams[paramName])) {
            urlParams[paramName] = [urlParams[paramName]];
            }
            // Add the new value to the existing array
            urlParams[paramName].push(paramValue);
        } else {
            // Add the parameter and its value to the JSON object
            urlParams[paramName] = paramValue;
        }
    }

    return urlParams;
}
