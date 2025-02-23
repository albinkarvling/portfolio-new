"use client";
import {useState} from "react";
import {Input} from "../Input";
import {Button} from "../Button";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export function Contact() {
    const [info, setInfo] = useState({
        name: "",
        email: "",
        message: "",
    });
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
        setInfo({name: "", email: "", message: ""});
    };

    return (
        <section className="py-20 bg-background-secondary border-t-[1px] border-t-background-tertiary">
            <h2 className="text-center text-5xl font-semibold">
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
                />
                <Input
                    placeholder="Email"
                    label="Email"
                    onChange={updateProperty("email")}
                    type="email"
                />
                <Input
                    placeholder="Message"
                    label="Message"
                    onChange={updateProperty("message")}
                    textArea
                />
                <Button disabled={loading} className="mt-2 justify-self-center">
                    {loading ? "Sending..." : "Start conversation"}
                </Button>
            </form>
        </section>
    );
}
