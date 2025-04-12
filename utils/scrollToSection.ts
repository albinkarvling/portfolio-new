const DELAY = 700;
const SCROLL_OFFSET = 100;
export function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (!element) return;

    window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
        behavior: "smooth",
    });

    // makes sure to move focus after transition for screen readers
    setTimeout(() => {
        element.tabIndex = -1;
        element.focus();
    }, DELAY);
}
