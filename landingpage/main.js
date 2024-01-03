'use strict';
let darkModeStorage = localStorage.getItem('dark-mode');
let black = getComputedStyle(document.documentElement).getPropertyValue('--black');
let white = getComputedStyle(document.documentElement).getPropertyValue('--white');
let backgroundDark = getComputedStyle(document.documentElement).getPropertyValue('--background-dark');
let backgroundLight = getComputedStyle(document.documentElement).getPropertyValue('--background-light');
if (darkModeStorage === 'true') {
    document.documentElement.style.setProperty('--main-color', black);
    document.documentElement.style.setProperty('--background-color', backgroundLight);
    document.documentElement.style.setProperty('--navbar-bg', 'var(--starting-bg-light)');
} else {
    document.documentElement.style.setProperty('--main-color', white);
    document.documentElement.style.setProperty('--background-color', backgroundDark);
    document.documentElement.style.setProperty('--navbar-bg', 'var(--starting-bg-dark)');
}
document.addEventListener('DOMContentLoaded', (event) => {
    let darkModeSwitch = document.getElementById('dark-mode-toggle');
    let darkModeStorage = localStorage.getItem('dark-mode');
    if (darkModeStorage === 'false') {
        setLightMode();
    } else {
        setDarkMode()
    }
    darkModeSwitch.addEventListener('click', () => {
        let currentColor = document.documentElement.style.getPropertyValue('--main-color');
        if (currentColor === white) {
            setDarkMode();
            localStorage.setItem('dark-mode', true.toString());
        } else {
            setLightMode();
            localStorage.setItem('dark-mode', false.toString());
        }
    })
    function setDarkMode() {
        document.documentElement.style.setProperty('--main-color', black);
        document.documentElement.style.setProperty('--background-color', backgroundLight);
        document.documentElement.style.setProperty('--navbar-bg', 'var(--starting-bg-light)');
        darkModeSwitch.textContent = 'Dark Mode';
    }
    function setLightMode() {
        document.documentElement.style.setProperty('--main-color', white);
        document.documentElement.style.setProperty('--background-color', backgroundDark);
        document.documentElement.style.setProperty('--navbar-bg', 'var(--starting-bg-dark)');
        darkModeSwitch.textContent = 'Light Mode';
    }
    document.getElementById('scroll-top')?.addEventListener('click', () => {
        window.scrollTo(0, 0);
    })


    function addObserver(el, options) {
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if(options.cb) {
                        options.cb(el);
                    }
                }
            });
        }, options);
        observer.observe(el);
    }
    const skillSection = document.querySelector('#skill-section');

    addObserver(skillSection, {
        threshold: 0.05,
        cb: function(el){
            for (const [index, child] of Object.entries(el.children)) {
                child.style.animation = 'none';
                setTimeout(() => {
                    if (child.classList.contains('skill-low')) {
                        child.style.animation = `fade-in-4 ${index/2}s`;
                    } else {
                        child.style.animation = `fade-in-2 ${index/2}s`;
                    }
                }, 20)
            }
        }
    })

    const contactSection = document.querySelector('#contact');
    addObserver(contactSection, {
        threshold: 0.3,
        cb: function(el) {
            setTimeout(() => {
                typeText(el.querySelector('#contact-message-id'), 'Contact me at:\ninfo(at)simbados.com')
            }, 100);
        }
    });


    function typeText(el, text) {
        let index = 0;

        el.textContent = '';
        function type() {
            el.textContent += text[index];
            index++;

            if (index < text.length) {
                setTimeout(type, 50);
            }
        }

        type();
    }
    const welcome = document.getElementById('welcome-message-id');
    const welcomeText = "Hello and welcome stranger.\nNice to have you.\nPlease scroll on :)";
    typeText(welcome, welcomeText);
})