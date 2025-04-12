import {render, screen, within} from "@testing-library/react";
import {Button} from "./Button";
import userEvent from "@testing-library/user-event";

const renderComponent = ({
    children,
    ...rest
}: Partial<React.ComponentProps<typeof Button>> = {}) =>
    render(<Button {...rest}>{children || "Button Text"}</Button>);

describe("Button", () => {
    const getButton = ({
        name = "Button Text",
        isLink,
    }: {
        name?: string;
        isLink?: boolean;
    } = {}) =>
        screen.getByRole(isLink ? "link" : "button", {name: new RegExp(name, "i")});

    it("should render a button with the correct text", () => {
        renderComponent({children: "testy testy"});
        const button = getButton({name: "testy testy"});
        expect(button).toBeInTheDocument();
    });

    it("should render a button with an icon", () => {
        renderComponent({icon: <span data-testid="button-icon">icon</span>});

        const button = getButton();
        const icon = within(button).getByTestId("button-icon");
        expect(icon).toBeInTheDocument();
    });

    it("should render a link with the correct href", () => {
        const href = "https://albinkarvling.com";
        renderComponent({href});

        const button = getButton({isLink: true});

        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("href", href);
    });

    it("should call onClick when clicked", async () => {
        const onClick = jest.fn();
        renderComponent({onClick});

        const button = getButton();
        await userEvent.click(button);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should be disabled when the disabled prop is true", () => {
        renderComponent({disabled: true});

        const button = getButton();
        expect(button).toBeDisabled();
    });

    it("should default to type 'button'", () => {
        renderComponent();
        const button = getButton();
        expect(button).toHaveAttribute("type", "button");
    });

    it("should set the type attribute when specified", () => {
        renderComponent({type: "submit"});
        const button = getButton();
        expect(button).toHaveAttribute("type", "submit");
    });
});
