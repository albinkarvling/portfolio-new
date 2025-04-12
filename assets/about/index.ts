import ABOUT_SECTIONS from "./index.json";
type AboutTabId = keyof typeof ABOUT_SECTIONS;
type AboutSection = (typeof ABOUT_SECTIONS)[AboutTabId];

export {ABOUT_SECTIONS, type AboutSection, type AboutTabId};
