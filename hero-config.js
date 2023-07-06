
    class HeroConfig {

        constructor(config, heroCard) {
            this.config = config;
            this.heroCard = heroCard;
        }

        static fromUrlParams(heroCard) {
            return new HeroConfig(getUrlParams(), heroCard);
        }

        static fromDivs(heroCard) {
            return new HeroConfig({
                faction: HeroConfig.getFaction(),
                heroName: HeroConfig.getElementText('.hero-name'),
                heroTitle: HeroConfig.getElementText('.hero-title'),
                heroQuote: HeroConfig.getElementText('.hero-quote'),
                heroImageUrl: HeroConfig.getHeroImageUrl(),
                heroImageUrl: heroCard.parentNode.querySelector('.hero-image').style.backgroundImage,
                heroImagePosition: window.getComputedStyle(document.querySelector('.hero-image')).getPropertyValue('background-position'),
                heroImageSize: window.getComputedStyle(document.querySelector('.hero-image')).getPropertyValue('background-size'),
                health: HeroConfig.getHealth(),
                startingLocation: HeroConfig.getStartingLocation(),
                startingZone: HeroConfig.getStartingZone(),
                power1Name: HeroConfig.getElementText('.power-name'),
                power1DescPrefix: HeroConfig.getElementText('.power-desc-prefix'),
                power1DescSuffix: HeroConfig.getElementText('.power-desc-suffix'),
                power2Name: HeroConfig.getElementText('.power-name', 1),
                power2DescPrefix: HeroConfig.getElementText('.power-desc-prefix', 1),
                power2DescSuffix: HeroConfig.getElementText('.power-desc-suffix', 1),

            }, heroCard);
        }

        static getElementText(selector, matchIdx = 0) {
            return document.querySelectorAll(selector)[matchIdx].innerText;
        }

        setElementText(selector, text, matchIdx = 0) {
            this.heroCard.querySelectorAll(selector)[matchIdx].innerText = text;
        }

        updateElements() {
            let config = this.config;
            if (config.faction != null) this.setFaction(config.faction);
            if (config.heroName != null) this.setElementText('.hero-name', config.heroName);
            if (config.heroName != null) document.title = 'Unofficial WoW Pandemic Hero - ' + config.heroName || '';
            if (config.heroTitle != null) this.setElementText('.hero-title', config.heroTitle);
            if (config.heroQuote != null) this.setElementText('.hero-quote', config.heroQuote);
            if (config.heroImageUrl != null) this.heroCard.parentNode.querySelector('.hero-image').style.backgroundImage = 'url("' + config.heroImageUrl + '")';
            if (config.heroImagePosition != null) this.heroCard.parentNode.querySelector('.hero-image').style.backgroundPosition = config.heroImagePosition;
            if (config.heroImageSize != null) this.heroCard.parentNode.querySelector('.hero-image').style.backgroundSize = config.heroImageSize;
            if (config.health != null) this.setHealth(config.health);
            if (config.startingLocation != null) this.setStartingLocation(config.startingLocation);
            if (config.startingZone != null) this.setStartingZone(config.startingZone);
            if (config.power1Name != null) this.setElementText('.power-name', config.power1Name, 0);
            if (config.power1DescPrefix != null) this.setElementText('.power-desc-prefix', config.power1DescPrefix, 0);
            if (config.power1DescSuffix != null) this.setElementText('.power-desc-suffix', config.power1DescSuffix, 0);
            if (config.power2Name != null) this.setElementText('.power-name', config.power2Name, 1);
            if (config.power2DescPrefix != null) this.setElementText('.power-desc-prefix', config.power2DescPrefix, 1);
            if (config.power2DescSuffix != null) this.setElementText('.power-desc-suffix', config.power2DescSuffix, 1);
        }

        static getFaction() {
            const prevImage = window.getComputedStyle(document.querySelector('.faction-image')).getPropertyValue('background-image');
            const factions = ['alliance', 'horde', 'argent', 'hs'];
            return prevImage.slice(prevImage.indexOf('-') + 1, prevImage.lastIndexOf('.'));
        }

        setFaction(faction) {
            this.heroCard.querySelector('.faction-image').style.backgroundImage = 'url("faction-' + faction + '.png")';
            // TODO: change right side color and watermark based on faction
        }

        static getHeroImageUrl() {
            convertToJpgAndCompress();
            //TODO: hero image is long when it's the data stream. It might need to be compacted or transformed to jpg.
            return window.getComputedStyle(document.querySelector('.hero-image')).getPropertyValue('background-image');
        }

        static getHealth() {
            const prevImage = window.getComputedStyle(document.querySelector('.hero-card-bottom')).getPropertyValue('background-image');
            return parseInt(prevImage.charAt(prevImage.length - 7));
        }

        setHealth(health) {
            this.heroCard.querySelector('.hero-card-bottom').style.backgroundImage = 'url("health-bar-' + health + '.png")';
        }

        static getStartingLocation() {
            return document.querySelector("textPath").textContent;
        }

        setStartingLocation(text) {
            text = text || 'Enter starting location';
            document.querySelector('.starting-location-input').value = text.toLowerCase();
            if (text.length < 13)
                text = '\xa0'.repeat(13 - text.length) + text;
            this.heroCard.querySelector("textPath").textContent = text.toUpperCase();
        }

        static getStartingZone() {
            const prevImage = window.getComputedStyle(document.querySelector('.starting-location-image')).getPropertyValue('background-image');
            return prevImage.slice(prevImage.indexOf('-') + 1, prevImage.lastIndexOf('.'));
        }

        setStartingZone(color) {
            this.heroCard.querySelector('.starting-location-image').style.backgroundImage = 'url("loc-' + color + '.png")';
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

    function convertObjectToURLParams(obj) {
        return Object.entries(obj)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    window.addEventListener('load', function() {
        HeroConfig.fromUrlParams(document.querySelector('.hero-card')).updateElements();
    });
