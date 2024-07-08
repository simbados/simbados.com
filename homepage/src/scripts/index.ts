document.addEventListener('DOMContentLoaded', (event) => {
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
