import {useRef} from "react";
import {AboutSection} from "@/assets";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";
import {AboutCard} from "./AboutCard";
import {AboutBulletPoint} from "./AboutBulletPoint";

export function AboutActivePanel({
    tabPanel,
    siblingRef,
}: {
    tabPanel: AboutSection;
    siblingRef: React.RefObject<HTMLElement | null>;
}) {
    const headerRef = useRef<HTMLHeadingElement>(null);

    const {initialState} = useAnimateIntoView(headerRef, {
        delay: 0,
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
                                delay={index * 250 + 150}
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
                                delay={index * 150 + 150}
                                siblingRef={headerRef}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
