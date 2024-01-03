class Navbar extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
            <header class="navbar">
                <div id="home" class="navbar__title"></div>
                <div class="navbar__right">
                    <div class="github-acc">
                        <img src="github-mark.png" alt="github logo" />
                        <a href="https://github.com/simbados" rel="noreferrer"></a>
                    </div>
                    <div id="dark-mode-toggle" class="mode-toggle">Light Mode</div>
                </div>
            </header>`
        const aIndex = document.createElement('a');
        aIndex.href = (this.getAttribute('rel-path') ?? '') + 'index.html';
        aIndex.textContent = 'Simbados';
        document.getElementById('home').appendChild(aIndex);
    }
}
customElements.define('navbar-component', Navbar);

class Footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<div class="footer">' +
                '            <div id="privacy" class="footer__privacy"></div>' +
                '        </div>'
        const aPrivacy = document.createElement('a');
        aPrivacy.href = (this.getAttribute('rel-path') ?? '') + 'privacy.html';
        aPrivacy.textContent = 'Privacy';
        document.getElementById('privacy').appendChild(aPrivacy);
    }
}
customElements.define('footer-component', Footer);
