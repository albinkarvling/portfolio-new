import {render, screen} from "@testing-library/react";
import {SelectableTab, SelectableTabs} from "./SelectableTabs";
import {ComponentProps} from "react";
import userEvent from "@testing-library/user-event";

const TABS = [
    {text: "tab 1", id: "tab1", ariaControls: "tab1-content"},
    {text: "tab 2", id: "tab2", ariaControls: "tab2-content"},
] satisfies SelectableTab<string>[];

const renderComponent = (props: Partial<ComponentProps<typeof SelectableTabs>> = {}) =>
    render(
        <SelectableTabs
            onSelect={jest.fn()}
            selectedTab={TABS[0].id}
            tabs={TABS}
            {...props}
        />,
    );

describe("SelectableTabs", () => {
    const getTab = (name: string) => screen.getByRole("tab", {name});

    it("should render each tab", () => {
        renderComponent();
        TABS.forEach((tab) => {
            expect(getTab(tab.text)).toBeInTheDocument();
        });
    });

    it("should call onSelect when a tab is clicked", async () => {
        const onSelect = jest.fn();
        renderComponent({onSelect});

        await userEvent.click(getTab(TABS[1].text));

        expect(onSelect).toHaveBeenCalledWith(TABS[1].id);
    });

    it("should set the selected tab as active", () => {
        renderComponent({selectedTab: TABS[1].id});

        const previousTab = getTab(TABS[0].text);
        const activeTab = getTab(TABS[1].text);

        expect(activeTab).toHaveAttribute("aria-selected", "true");
        expect(previousTab).toHaveAttribute("aria-selected", "false");
    });

    it("should set the correct aria-controls attribute for each tab", () => {
        renderComponent();

        TABS.forEach((tab) => {
            const tabElement = getTab(tab.text);
            expect(tabElement).toHaveAttribute("aria-controls", tab.ariaControls);
        });
    });
});
