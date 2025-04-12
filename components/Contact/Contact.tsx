"use client";
import {useRef, useState} from "react";
import {Input} from "../Input";
import {Button} from "../Button";
import {RevealElement} from "../RevealElement/RevealElement";
import useAnimateIntoView from "@/hooks/useAnimateIntoView";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const INITIAL_STATE = {
    name: "",
    email: "",
    message: "",
};
export function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [info, setInfo] = useState(INITIAL_STATE);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const updateProperty = (property: keyof typeof info) => (text: string) => {
        setError("");
        setSuccess("");
        setInfo({...info, [property]: text});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const {name, email, message} = info;
        if (!name || !email || !message) {
            setError("Please fill out all fields.");
            return;
        }
        if (!EMAIL_REGEX.test(email)) {
            setError("Please enter a valid email.");
            return;
        }

        setLoading(true);
        const res = await fetch("/api/send-message", {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.message);
            return;
        }

        setLoading(false);
        setSuccess(data.message);
        setInfo(INITIAL_STATE);
    };

    const {isVisible} = useAnimateIntoView(containerRef, {
        initialState: {opacity: 1, transform: "translate(0,0"},
    });

    return (
        <section
            className="bg-background-secondary border-t-[1px] border-t-background-tertiary"
            ref={containerRef}
        >
            <RevealElement
                direction="top"
                className="py-20 w-full"
                isVisible={isVisible}
                color="quaternary"
            >
                <h2 id="contact-header" className="text-center text-4xl font-semibold">
                    Let&apos;s get in touch.
                </h2>
                <form
                    className="mt-8 w-[550px] max-w-main mx-auto grid gap-2"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {error && (
                        <span
                            className="p-4 border-[1px] border-error/20 bg-error/10 rounded-md"
                            role="alert"
                        >
                            {error}
                        </span>
                    )}
                    {success && (
                        <span
                            className="p-4 border-[1px] border-success/20 bg-success/10 rounded-md"
                            role="alert"
                        >
                            {success}
                        </span>
                    )}
                    <Input
                        placeholder="Name"
                        label="Name"
                        onChange={updateProperty("name")}
                        value={info.name}
                    />
                    <Input
                        placeholder="Email"
                        label="Email"
                        onChange={updateProperty("email")}
                        type="email"
                        value={info.email}
                    />
                    <Input
                        placeholder="Message"
                        label="Message"
                        onChange={updateProperty("message")}
                        value={info.message}
                        textArea
                    />
                    <Button
                        disabled={loading}
                        className="mt-2 justify-self-center"
                        color="quaternary"
                        type="submit"
                    >
                        {loading ? "Sending..." : "Start conversation"}
                    </Button>
                </form>
            </RevealElement>
        </section>
    );
}
