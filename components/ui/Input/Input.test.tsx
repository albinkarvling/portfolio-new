import {render, screen} from "@testing-library/react";
import {Input} from "./Input";
import React from "react";
import userEvent from "@testing-library/user-event";

const renderComponent = (props: Partial<React.ComponentProps<typeof Input>> = {}) =>
    render(
        <Input onChange={jest.fn()} label="Testing" placeholder="Testing" {...props} />,
    );

describe("Input", () => {
    it("should render an input field", () => {
        renderComponent();
        const input = screen.getByPlaceholderText("Testing");
        expect(input).toBeInTheDocument();
        expect(input.tagName).toBe("INPUT");
    });

    it("should render a textarea field", () => {
        renderComponent({textArea: true});
        const input = screen.getByPlaceholderText("Testing");
        expect(input).toBeInTheDocument();
        expect(input.tagName).toBe("TEXTAREA");
    });

    it("should render a label for screen readers", () => {
        renderComponent();
        const input = screen.getByLabelText("Testing");
        const label = screen.getByText("Testing");
        expect(input).toBeInTheDocument();
        expect(label).toHaveClass("sr-only");
    });

    it("should properly pass input props", () => {
        const onChange = jest.fn();
        const type = "email";
        const value = "Test Value";
        const placeholder = "Test Placeholder";
        renderComponent({value, onChange, type, placeholder});

        const input = screen.getByPlaceholderText(placeholder);

        expect(input).toHaveValue(value);
        expect(input).toHaveAttribute("type", type);
        expect(input).toHaveAttribute("placeholder", placeholder);
    });

    it("should call onChange when the value changes", async () => {
        const onChange = jest.fn();
        const {getByPlaceholderText} = renderComponent({onChange});
        const input = getByPlaceholderText("Testing");

        const value = "New Value";
        await userEvent.type(input, value);

        expect(onChange).toHaveBeenCalledTimes(value.length);
        expect(onChange).toHaveBeenLastCalledWith(value);
    });
});
