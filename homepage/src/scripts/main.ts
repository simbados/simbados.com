'use strict';
function getDarkModeButton(): HTMLElement {
    const button = document.getElementById('dark-mode-toggle');
    if (button == null) {
        throw Error('Something went wrong with the dark mode/ light mode switch')
    }
    return button;
}
let switchButton = getDarkModeButton();
let darkModeStorage = localStorage.getItem('dark-mode');
let black = getComputedStyle(document.documentElement).getPropertyValue('--black');
let white = getComputedStyle(document.documentElement).getPropertyValue('--white');
let backgroundDark = getComputedStyle(document.documentElement).getPropertyValue('--background-dark');
let backgroundLight = getComputedStyle(document.documentElement).getPropertyValue('--background-light');
if (darkModeStorage === 'true') {
    setDarkMode(switchButton)
} else {
    setLightMode(switchButton)
}
function setDarkMode(switchButton: HTMLElement) {
    document.documentElement.style.setProperty('--main-color', black);
    document.documentElement.style.setProperty('--background-color', backgroundLight);
    document.documentElement.style.setProperty('--navbar-bg', 'var(--starting-bg-light)');
    switchButton.textContent = 'Dark Mode';
}
function setLightMode(switchButton: HTMLElement) {
    document.documentElement.style.setProperty('--main-color', white);
    document.documentElement.style.setProperty('--background-color', backgroundDark);
    document.documentElement.style.setProperty('--navbar-bg', 'var(--starting-bg-dark)');
    switchButton.textContent = 'Light Mode';
}
document.addEventListener('DOMContentLoaded', (event) => {
    let darkModeSwitch = getDarkModeButton();
    let darkModeStorage = localStorage.getItem('dark-mode');
    if (darkModeStorage === 'false') {
        setLightMode(darkModeSwitch);
    } else {
        setDarkMode(darkModeSwitch);
    }
    darkModeSwitch?.addEventListener('click', () => {
        let currentColor = document.documentElement.style.getPropertyValue('--main-color');
        if (currentColor === white) {
            setDarkMode(darkModeSwitch);
            localStorage.setItem('dark-mode', true.toString());
        } else {
            setLightMode(darkModeSwitch);
            localStorage.setItem('dark-mode', false.toString());
        }
    })
    document.getElementById('scroll-top')?.addEventListener('click', () => {
        window.scrollTo(0, 0);
    })

    function addObserver(el: HTMLElement, options: IntersectionObserverInit & { cb: (el: HTMLElement) => void }) {
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting && options.cb) {
                    options.cb(el);
                }
            });
        }, options);
        observer.observe(el);
    }

    const welcomeSection = document.querySelector('#welcome-id') as HTMLElement;

    let runWelcomeSection = true;
    addObserver(welcomeSection, {
        threshold: 0.3,
        cb: function(el: HTMLElement){
            if (runWelcomeSection) {
                const welcome = el.querySelector('#welcome-message-id');
                const welcomeText = "Hello and welcome stranger.\nNice to have you.\nPlease scroll on :)";
                typeText(welcome, welcomeText);
                runWelcomeSection = false;
            }
        },
    })

    const skillSection = document.querySelector('#skill-section') as HTMLElement;

    let runSkillSection = true;
    addObserver(skillSection, {
        threshold: 0.3,
        cb: function(el: HTMLElement){
            if (runSkillSection) {
                runSkillSection = false;
                setTimeout(() => {
                    (el.children[0] as HTMLElement).style.display = 'flex';
                }, 200);
            }
        },
    })

    const contactSection = document.querySelector('#contact') as HTMLElement;
    let runContactSection = true;
    addObserver(contactSection, {
        threshold: 0.3,
        cb: function(el: HTMLElement) {
            if (runContactSection) {
                runContactSection = false;
                setTimeout(async () => {
                    await typeText(el.querySelector('#contact-message-id'), 'Contact me at:\ninfo(at)simbados.com')
                    await wait(500);
                    (el.querySelector('#contact-message-id') as HTMLElement).classList.remove('contact-message-active');
                }, 300);
            }
        }
    });

    const projectSection = document.querySelector('#projects') as HTMLElement;
    let runProjectSection = true;
    addObserver(projectSection, {
        threshold: 0.3,
        cb: function(el: Element) {
            if (runProjectSection && el != null) {
                runProjectSection = false;
                setTimeout(async () => {
                    const display = 'block';
                    const header = el.querySelector('#project-message-header');
                    await typeText(header, 'Current projects:')
                    await typeText(el.querySelector('#project-message-go'), 'Golang:')
                    await wait(200);
                    (el.querySelector('#project-sb') as HTMLElement).style.display = display;
                    await typeText(el.querySelector('#sb-desc'), 'Sandbox wrapper for Macos')
                    await wait(200);
                    (el.querySelector('#divider-go') as HTMLElement).style.display = display;
                    await typeText(el.querySelector('#project-message-js'), 'Javascript:');
                    (el.querySelector('#project-comparison') as HTMLElement).style.display = display;
                    await typeText(el.querySelector('#comparison-desc'), 'Compare different finance options for cars');
                    (el.querySelector('#project-website') as HTMLElement).style.display = display;
                    await typeText(el.querySelector('#website-desc'), 'What you are seeing right now');
                    (el.querySelector('#divider-js') as HTMLElement).style.display = display;
                    await wait(200);
                    await typeText(el.querySelector('#project-message-others'), 'Others:');
                    (el.querySelector('#project-katas') as HTMLElement).style.display = display;
                    await typeText(el.querySelector('#katas-desc'), 'My training katas');
                }, 50);
            }
        },
    });


    async function typeText(el: Element | null, text: string, ms= 25) {
        let index = 0;
        if (el == null) {
            throw Error('Something went wrong with the dark mode/ light mode switch')
        }
        el.classList.add('message-active');
        return new Promise((resolve) => {
            function type() {
                el!.textContent += text[index];
                index++;

                if (index < text.length) {
                    setTimeout(type, ms);
                } else if (index === text.length) {
                    el!.classList.remove('message-active');
                    resolve(null);
                }
            }
            type();
        })
    }

})
async function wait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, ms)
    })
}
