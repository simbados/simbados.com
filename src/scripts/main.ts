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
document.addEventListener('DOMContentLoaded', (_event) => {
    document.getElementById('scroll-top')?.addEventListener('click', () => {
        window.scrollTo(0, 0);
    })
    const darkModeSwitch = getDarkModeButton();
    const darkModeStorage = localStorage.getItem('dark-mode');
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
});
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