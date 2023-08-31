// apply per-browser customizations
window.addEventListener('load', function() {

    function changeFontSize(element, inc) {
        const currentFontSize = parseFloat(getComputedStyle(element).fontSize);
        const newFontSize = currentFontSize + inc;
        element.style.fontSize = `${newFontSize}px`;
    }

    function detectBrowser() {
        let userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('opr'))
            return 'opera';
        if (userAgent.includes('firefox'))
            return 'firefox';
        if (userAgent.includes('edg'))
            return 'edge';
        if (userAgent.includes('chrome'))
            return 'chrome';
        if (userAgent.includes('safari'))
            return 'safari';
        return 'other';
    }

    let perBrowserCustomizations = [
        {browser: 'firefox', selector: '.hero-name, .hero-quote', fontSize: -1},
        {browser: 'safari', selector: '.hero-name', fontSize: -2},
        {browser: 'safari', selector: '.hero-title, .hero-quote', fontSize: -1},
    ];

    let browser = detectBrowser();
    perBrowserCustomizations.forEach((customization) => {
        if (customization.browser === detectBrowser()) {
            var elements = document.querySelectorAll(customization.selector);
            for (var i = 0; i < elements.length; i++) {
                changeFontSize(elements[i], customization.fontSize);
            }
        }
    });
})

window.addEventListener('load', function() {
    // populate sheet with URL params
    HeroSheet
        .fromUrlParams(document.querySelector('.hero-sheet'))
        .updateElements()
        .enableEdition();

    // create links to examples
    const exampleHeroNames = ['Alexstrasza', 'Brann', 'Darion', 'Dranosh', 'Elite', 'Jaina', 'Sally', 'Valeera'];
    const exampleHeroes = exampleHeroNames.map(name => heroConfigs.find(hc => hc.heroName === name || hc.heroName.split(' ')[0] == name));
    console.log(exampleHeroes);

    let examplesContainer = document.querySelector('.examples-container');
    for (const hc of exampleHeroes) {
        const div = document.createElement('div');
        div.setAttribute('class', 'hero-card-example')
        div.setAttribute('title', hc.heroName);
        const exampleIconUrl = 'img/example-' + hc.heroName.toLowerCase().split(' ').join('-') + '-100x80.png';
        div.setAttribute('style', 'background-image: url("' + exampleIconUrl + '")');

        const a = document.createElement('a');
        const currentUrl = new URL(window.location.href);
        const baseUrl = currentUrl.origin + currentUrl.pathname;
        const queryStr = Object.entries(hc).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
        a.href = baseUrl + '?' + queryStr;
        div.appendChild(a);

        examplesContainer.appendChild(div);
    }

});
