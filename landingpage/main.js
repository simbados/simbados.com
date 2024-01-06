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
                if (entry.isIntersecting && options.cb) {
                    options.cb(el);
                }
            });
        }, options);
        observer.observe(el);
    }

    const welcomeSection = document.querySelector('#welcome-id');

    let runWelcomeSection = true;
    addObserver(welcomeSection, {
        threshold: 0.3,
        cb: function(el){
            if (runWelcomeSection) {
                const welcome = el.querySelector('#welcome-message-id');
                const welcomeText = "Hello and welcome stranger.\nNice to have you.\nPlease scroll on :)";
                typeText(welcome, welcomeText);
                runWelcomeSection = false;
            }
        },
    })

    const skillSection = document.querySelector('#skill-section');

    let runSkillSection = true;
    addObserver(skillSection, {
        threshold: 0.3,
        cb: function(el){
            if (runSkillSection) {
                runSkillSection = false;
                setTimeout(() => {
                    el.children[0].style.display = 'flex';
                }, 200);
            }
        },
    })

    const contactSection = document.querySelector('#contact');
    let runContactSection = true;
    addObserver(contactSection, {
        threshold: 0.3,
        cb: function(el) {
            if (runContactSection) {
                runContactSection = false;
                setTimeout(async () => {
                    await typeText(el.querySelector('#contact-message-id'), 'Contact me at:\ninfo(at)simbados.com')
                    await wait(500);
                    el.querySelector('#contact-message-id').classList.remove('contact-message-active');
                }, 300);
            }
        }
    });

    const projectSection = document.querySelector('#projects');
    let runProjectSection = true;
    addObserver(projectSection, {
        threshold: 0.3,
        cb: function(el) {
            if (runProjectSection) {
                runProjectSection = false;
                setTimeout(async () => {
                    el.querySelector('#project-message-intro').classList.add('project-message-intro-active');
                    await typeText(el.querySelector('#project-message-intro'), 'Current projects:\n\nGolang:')
                    el.querySelector('#project-message-intro').classList.remove('project-message-intro-active')
                    el.querySelector('#project-agey').style.display = 'block';
                    await wait(500);
                    el.querySelector('#project-sb').style.display = 'block';
                    await wait(500);
                    el.querySelector('#project-message-js').classList.add('project-message-js-active');
                    await typeText(el.querySelector('#project-message-js'), 'Javascript:')
                    el.querySelector('#project-message-js').classList.remove('project-message-js-active');
                    el.querySelector('#project-website').style.display = 'block';
                    await wait(500);
                    el.querySelector('#project-message-others').classList.add('project-message-others-active');
                    await typeText(el.querySelector('#project-message-others'), 'Others:')
                    el.querySelector('#project-message-others').classList.remove('project-message-others-active');
                    el.querySelector('#project-katas').style.display = 'block';
                }, 50);
            }
        },
    });


    async function typeText(el, text, newText = true) {
        let index = 0;

        if (newText) {
            el.textContent = '';
        }
        return new Promise((resolve) => {
            function type() {
                el.textContent += text[index];
                index++;

                if (index < text.length) {
                    setTimeout(type, 50);
                } else if (index === text.length) {
                    resolve();
                }
            }
            type();
        })
    }

})
async function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
