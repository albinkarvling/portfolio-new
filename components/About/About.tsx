"use client";
import {useRef, useState} from "react";
import {useAnimateIntoView} from "@/hooks";
import {ABOUT_SECTIONS, AboutTabId} from "@/assets";
import {SelectableTabs, type SelectableTab} from "@/ui";
import {AboutActivePanel} from "./AboutActivePanel";

const ABOUT_TABS: SelectableTab<AboutTabId>[] = [
    {text: "Experience", id: "experience", ariaControls: "experience-panel"},
    {text: "About me", id: "about-me", ariaControls: "about-me-panel"},
];

export function About() {
    const [currentTab, setCurrentTab] = useState(ABOUT_TABS[0].id);

    const headerRef = useRef<HTMLHeadingElement>(null);
    const selectableTabsRef = useRef<HTMLDivElement>(null);

    const {initialState} = useAnimateIntoView(headerRef);
    useAnimateIntoView(selectableTabsRef, {
        delay: 100,
        siblingRef: headerRef,
    });

    return (
        <section className="py-28 w-main max-w-main mx-auto">
            <h2
                id="about-header"
                style={initialState}
                className="text-5xl font-semibold"
                ref={headerRef}
            >
                My journey
            </h2>

            <div className="mt-8" style={initialState} ref={selectableTabsRef}>
                <SelectableTabs
                    tabs={ABOUT_TABS}
                    selectedTab={currentTab}
                    onSelect={setCurrentTab}
                />
            </div>

            {ABOUT_TABS.map((tab) => {
                const tabPanel = ABOUT_SECTIONS[tab.id];
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
