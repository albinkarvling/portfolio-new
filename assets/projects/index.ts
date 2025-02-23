import PROJECTS from "./index.json";
type Project = (typeof PROJECTS)[number];

export {PROJECTS, type Project};
