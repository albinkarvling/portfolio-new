const DELAY = 700;
export function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({behavior: "smooth"});
    setTimeout(() => {
        element.tabIndex = -1;
        element.focus();
    }, DELAY);
}
