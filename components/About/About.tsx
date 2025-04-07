"use client";
import {useRef, useState} from "react";
import {SelectableTabs} from "../SelectableTabs";
import {type SelectableTab} from "../SelectableTabs/SelectableTabs";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";
import {AboutActivePanel} from "./AboutActivePanel";

type AboutTabId = "about-me" | "experience";
const ABOUT_TABS: SelectableTab<AboutTabId>[] = [
    {text: "Experience", id: "experience", ariaControls: "experience-panel"},
    {text: "About me", id: "about-me", ariaControls: "about-me-panel"},
] as const;

const getAge = () => {
    const birthDate = "2004-05-01";
    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--; // If the birthday hasn't occurred yet this year, subtract 1
    }

    return age;
};
const ABOUT_PANEL_CONTENTS = {
    "about-me": {
        text: `My name is Albin Kärvling. I have been coding since I was 12, and am currently ${getAge()} years old. I am a full stack developer specializing in frontend development, but have knowledge of both backend and cloud solutions. In 2023, I graduated high school specializing in natural sciences, though programming has always been my true calling.`,
        bulletPoints: [
            "Full stack developer",
            "Specializing in frontend",
            "Started when I was 12",
            `${getAge()} years old`,
        ],
        cards: [],
    },
    experience: {
        text: "",
        bulletPoints: [],
        cards: [
            {
                title: "ATG - Frontend",
                subTitle: "Sweden's second largest casino",
                description: [
                    "Working in the forefront of payment, anti money laundering and customer knowledge.",
                    "Agile work methods with a focus on collaboration and communication.",
                    "Working as the lead for our accessibility initiative.",
                ],
                site: "https://atg.se",
                icon: "/images/atg.png",
                date: "Nov 2024 - Present",
            },
            {
                title: "Rythm - Frontend",
                subTitle: "Largest discord bot",
                description: [
                    "Developed the dashboard for the largest discord bot with over 20 million users.",
                    "Worked closely with backenders and designers to create a seamless experience.",
                    "Frequent meetings to discuss progress.",
                ],
                site: "https://rythm.fm",
                icon: "/images/rythm.png",
                date: "Apr 2021 - Aug 2021",
            },
            {
                title: "Fullstack developer",
                subTitle: "Self-taught",
                description: [
                    "My curiosity for programming stared when I was 12 years old.",
                    "Started with frontend, but have gotten into backend and cloud services.",
                    "Love exploring new technologies and frameworks.",
                ],
                site: "https://albinkarvling.com",
                icon: "/images/portfolio.png",
                date: "March 2017 - Present",
            },
        ],
    },
} as const;
export type AboutPanel = (typeof ABOUT_PANEL_CONTENTS)[AboutTabId];

export function About() {
    const [currentTab, setCurrentTab] = useState(ABOUT_TABS[0].id);

    const shouldIgnoreDelay = useRef(false);
    const headerRef = useRef<HTMLHeadingElement>(null);

    const {initialState} = useAnimateIntoView(headerRef);

    const handleTabChange = (tab: AboutTabId) => {
        setCurrentTab(tab);
        shouldIgnoreDelay.current = true;
    };

    return (
        <section className="py-28 w-main max-w-main mx-auto" id="about-section">
            <h2 style={initialState} className="text-5xl font-semibold" ref={headerRef}>
                About my journey
            </h2>

            <SelectableTabs
                parentRef={headerRef}
                tabs={ABOUT_TABS}
                selectedTab={currentTab}
                onSelect={handleTabChange}
                className="mt-8"
            />

            {ABOUT_TABS.map((tab) => {
                const tabPanel = ABOUT_PANEL_CONTENTS[tab.id];
                const isActivePanel = tab.id === currentTab;
                return (
                    <div
                        className="mt-4"
                        id={tab.ariaControls}
                        hidden={!isActivePanel}
                        key={tab.id}
                    >
                        {isActivePanel && (
                            <AboutActivePanel
                                ignoreDelay={shouldIgnoreDelay.current}
                                tabPanel={tabPanel}
                                siblingRef={headerRef}
                            />
                        )}
                    </div>
                );
            })}
        </section>
    );
}
