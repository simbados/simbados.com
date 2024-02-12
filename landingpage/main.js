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
                    const display = 'block';
                    const header = el.querySelector('#project-message-header');
                    await typeText(header, 'Current projects:')
                    await typeText(el.querySelector('#project-message-go'), 'Golang:')
                    await wait(200);
                    el.querySelector('#project-sb').style.display = display;
                    await typeText(el.querySelector('#sb-desc'), 'Sandbox wrapper for Macos')
                    await wait(200);
                    el.querySelector('#divider-go').style.display = display;
                    await typeText(el.querySelector('#project-message-js'), 'Javascript:')
                    el.querySelector('#project-comparison').style.display = display;
                    await typeText(el.querySelector('#comparison-desc'), 'Compare different finance options for cars')
                    el.querySelector('#project-website').style.display = display;
                    await typeText(el.querySelector('#website-desc'), 'What you are seeing right now')
                    el.querySelector('#divider-js').style.display = display;
                    await wait(200);
                    await typeText(el.querySelector('#project-message-others'), 'Others:')
                    el.querySelector('#project-katas').style.display = display;
                    await typeText(el.querySelector('#katas-desc'), 'My training katas')
                }, 50);
            }
        },
    });


    async function typeText(el, text, ms= 25) {
        let index = 0;
        el.classList.add('message-active');
        return new Promise((resolve) => {
            function type() {
                el.textContent += text[index];
                index++;

                if (index < text.length) {
                    setTimeout(type, ms);
                } else if (index === text.length) {
                    el.classList.remove('message-active');
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
