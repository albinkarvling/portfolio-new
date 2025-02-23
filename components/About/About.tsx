"use client";
import {useState} from "react";
import {SelectableTabs} from "../SelectableTabs";
import {type SelectableTab} from "../SelectableTabs/SelectableTabs";

type AboutTabId = "about-me" | "how-it-started" | "my-mindset";
const ABOUT_TABS: SelectableTab<AboutTabId>[] = [
    {text: "About me", id: "about-me", ariaControls: "about-me-panel"},
    {text: "How it started", id: "how-it-started", ariaControls: "how-it-started-panel"},
    {text: "My mindset", id: "my-mindset", ariaControls: "my-mindset-panel"},
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
        text: "My name is Albin Kärvling. I have been coding since I was 12, and am currently 20 years old. I am a full stack developer specializing in frontend development, but have knowledge of both backend and cloud solutions. In 2023, I graduated high school specializing in natural sciences, though programming has always been my true calling.",
        bulletPoints: [
            "Full stack developer",
            "Specializing in frontend",
            "Started when I was 12",
            `${getAge()} years old`,
        ],
    },
    "how-it-started": {
        text: "I started coding when I was 12 years old, and I have been coding ever since. I started with simple HTML and CSS, and then moved on to JavaScript. I have always been interested in technology, and programming has always been my true calling.",
        bulletPoints: [
            "Started with HTML and CSS",
            "Moved on to JavaScript",
            "Always been interested in technology",
            "Programming has always been my true calling",
        ],
    },
    "my-mindset": {
        text: "I have a growth mindset, and I am always looking to improve myself. I am constantly learning new things, and I am always looking for new challenges. I am a hard worker, and I am always looking to improve myself. I am always looking to improve my skills, and I am always looking to improve my knowledge.",
        bulletPoints: [
            "Growth mindset",
            "Always looking to improve myself",
            "Constantly learning new things",
            "Always looking for new challenges",
        ],
    },
} as const;

export function About() {
    const [currentTab, setCurrentTab] = useState(ABOUT_TABS[0].id);

    return (
        <section className="py-28 w-main max-w-main mx-auto" id="about-section">
            <h2 className="text-5xl font-semibold">About my journey</h2>

            <SelectableTabs
                tabs={ABOUT_TABS}
                selectedTab={currentTab}
                onSelect={setCurrentTab}
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
                            <>
                                <span>{ABOUT_PANEL_CONTENTS[tab.id].text}</span>
                                <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {tabPanel.bulletPoints.map((bulletPoint, index) => (
                                        <li
                                            className="flex-1 py-3 px-5 font-medium text-sm bg-background-secondary/60 rounded-md"
                                            key={index}
                                        >
                                            {bulletPoint}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                );
            })}
        </section>
    );
}
