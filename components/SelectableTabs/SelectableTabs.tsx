import useAnimateIntoView from "@/hooks/useAnimateIntoView";
import {createRef, useCallback, useEffect, useRef} from "react";
import {twMerge} from "tailwind-merge";

export type SelectableTab<T> = {
    text: string;
    id: T;
    ariaControls: string;
};

type Props<T> = {
    selectedTab: T;
    tabs: SelectableTab<T>[];
    onSelect: (id: T) => void;
    className?: string;
    parentRef?: React.RefObject<HTMLElement | null>;
};

export function SelectableTabs<T extends string>({
    tabs,
    selectedTab,
    onSelect,
    className,
    parentRef,
}: Props<T>) {
    const containerRef = useRef<HTMLUListElement>(null);
    const selectedIndicatorRef = useRef<HTMLSpanElement>(null);
    const tabRefs = tabs.map(() => createRef<HTMLLIElement>());

    const {initialState, isVisible} = useAnimateIntoView(tabRefs[0], {
        siblingRef: parentRef,
        delay: 100,
    });
    useAnimateIntoView(tabRefs[1], {
        siblingRef: parentRef,
        delay: 200,
    });
    useAnimateIntoView(tabRefs[2], {
        siblingRef: parentRef,
        delay: 250,
    });
    useAnimateIntoView(selectedIndicatorRef, {
        siblingRef: parentRef,
        delay: 300,
    });

    const getActiveTabIndex = useCallback(
        () => tabs.findIndex((tab) => tab.id === selectedTab) || 0,
        [tabs, selectedTab],
    );

    // Update selected indicator position and width
    const updateSelectedIndicator = useCallback(() => {
        const activeTabIndex = getActiveTabIndex();

        const selectedTabRef = tabRefs[activeTabIndex];
        if (!selectedTabRef?.current) return;

        const {left, width} = selectedTabRef.current.getBoundingClientRect();
        const {left: containerLeft} = containerRef.current!.getBoundingClientRect();

        selectedIndicatorRef.current!.style.left = `${left - containerLeft}px`;
        selectedIndicatorRef.current!.style.width = `${width}px`;
    }, [tabRefs, getActiveTabIndex]);

    useEffect(() => {
        window.addEventListener("resize", updateSelectedIndicator);
        return () => window.removeEventListener("resize", updateSelectedIndicator);
    }, [updateSelectedIndicator]);

    useEffect(updateSelectedIndicator, [selectedTab, updateSelectedIndicator]);

    const handleSelect = (id: T) => {
        if (selectedTab === id) return;
        onSelect(id);
    };

    return (
        <div className={twMerge("relative", className)}>
            <ul
                role="tablist"
                className={twMerge(
                    "relative flex gap-5",
                    "after:absolute after:bottom-0 after:h-[1px] after:bg-background-secondary after:left-0 after:transition-[width] after:duration-1000 after:delay-500",
                    isVisible ? "after:w-full" : "after:w-0",
                )}
                ref={containerRef}
            >
                {tabs.map((tab, index) => (
                    <li style={initialState} ref={tabRefs[index]} key={tab.id}>
                        <button
                            role="tab"
                            aria-controls={tab.ariaControls}
                            onClick={() => handleSelect(tab.id)}
                            className={twMerge(
                                "pb-3 text-lg text-text-secondary hover:text-text-primary transition-colors",
                                tab.id === selectedTab && "text-text-primary",
                            )}
                        >
                            {tab.text}
                        </button>
                    </li>
                ))}
            </ul>
            <span
                style={initialState}
                className="absolute h-[1px] bottom-0 bg-text-primary transition-[left,width] duration-300 ease-in-out"
                ref={selectedIndicatorRef}
            />
        </div>
    );
}
