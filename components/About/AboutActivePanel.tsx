import {AboutPanel} from "./About";
import {useRef} from "react";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";
import {AboutCard} from "./AboutCard";
import {AboutBulletPoint} from "./AboutBulletPoint";

export function AboutActivePanel({
    tabPanel,
    siblingRef,
    ignoreDelay,
}: {
    tabPanel: AboutPanel;
    siblingRef: React.RefObject<HTMLElement | null>;
    ignoreDelay: boolean;
}) {
    const headerRef = useRef<HTMLHeadingElement>(null);

    const BASE_DELAY = ignoreDelay ? 0 : 300;
    const {initialState} = useAnimateIntoView(headerRef, {
        delay: BASE_DELAY,
        siblingRef,
    });

    return (
        <>
            {tabPanel.text && (
                <span className="block" style={initialState} ref={headerRef}>
                    {tabPanel.text}
                </span>
            )}

            {tabPanel.cards.length !== 0 && (
                <ul className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {tabPanel.cards.map((card, index) => (
                        <li key={index}>
                            <AboutCard
                                card={card}
                                delay={BASE_DELAY + index * 250 + 150}
                                siblingRef={headerRef}
                            />
                        </li>
                    ))}
                </ul>
            )}

            {tabPanel.bulletPoints.length !== 0 && (
                <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {tabPanel.bulletPoints.map((bulletPoint, index) => (
                        <li key={index}>
                            <AboutBulletPoint
                                bulletPoint={bulletPoint}
                                delay={BASE_DELAY + index * 150 + 150}
                                siblingRef={headerRef}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
