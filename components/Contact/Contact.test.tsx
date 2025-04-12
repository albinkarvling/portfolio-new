import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {mockFetch} from "@/test-utils";
import {Contact} from "./Contact";

jest.mock("@/hooks/useHasReducedMotion", () => ({
    useHasReducedMotion: () => false,
}));

const FIELDS = ["Name", "Email", "Message"];

describe("Contact", () => {
    const getInput = (name: string) => screen.getByPlaceholderText(name);
    const getSubmitButton = () =>
        screen.getByRole("button", {name: /start conversation/i});

    const populateValidForm = async () => {
        for (const field of FIELDS) {
            if (field === "Email") {
                await userEvent.type(getInput(field), "test@test.com");
            }
            await userEvent.type(getInput(field), "test");
        }
    };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should render all input fields", () => {
        render(<Contact />);
        expect(getInput("Name")).toBeInTheDocument();
        expect(getInput("Email")).toBeInTheDocument();
        expect(getInput("Message")).toBeInTheDocument();
    });

    describe("Validation Errors", () => {
        describe("should show an error when an empty value is submitted for", () => {
            it.each(FIELDS)("%s", async (field) => {
                render(<Contact />);
                const button = getSubmitButton();

                await populateValidForm();
                await userEvent.clear(getInput(field));
                await userEvent.click(button);

                expect(
                    screen.getByText(/please fill out all fields/i),
                ).toBeInTheDocument();
            });
        });

        it("should show an error if the email is invalid", async () => {
            render(<Contact />);
            const button = getSubmitButton();

            await populateValidForm();
            await userEvent.type(getInput("Email"), "invalid-email");
            await userEvent.click(button);

            expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
        });
    });

    describe("Form Submission", () => {
        it("should clean the form and show a success message on successful submission", async () => {
            mockFetch({
                ok: true,
                status: 200,
                json: {message: "success-message"},
            });

            render(<Contact />);
            const button = getSubmitButton();

            await populateValidForm();
            await userEvent.click(button);

            for (const field of FIELDS) {
                await waitFor(() => expect(getInput(field)).toHaveValue(""));
            }
            expect(screen.getByText(/success-message/i)).toBeInTheDocument();
        });

        it("should show an error message on failed submission", async () => {
            mockFetch({
                ok: false,
                status: 500,
                json: {message: "error-message"},
            });

            render(<Contact />);
            const button = getSubmitButton();

            await populateValidForm();
            await userEvent.click(button);

            expect(screen.getByText(/error-message/i)).toBeInTheDocument();
        });
    });
});
