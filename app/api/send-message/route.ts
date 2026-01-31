import {NextResponse} from "next/server";
import {Resend} from "resend";

export const runtime = "nodejs";

let resend: Resend | undefined;

function getResend() {
    if (resend) return resend;

    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is missing");

    resend = new Resend(key);
    return resend;
}

const sendMail = async ({
    name,
    email,
    message,
}: {
    name: string;
    email: string;
    message: string;
}) => {
    const {error} = await getResend().emails.send({
        from: `${name} <notification@albinkarvling.com>`,
        to: `albin.karvling@hotmail.com`,
        subject: "New message from portfolio",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    if (error) {
        throw new Error(error.message);
    }
};

export async function POST(req: Request) {
    const {message, email, name} = await req.json();

    if (!name) {
        return NextResponse.json({error: "Name is required"}, {status: 400});
    }
    if (!email) {
        return NextResponse.json({error: "Email is required"}, {status: 400});
    }
    if (!message) {
        return NextResponse.json({error: "Message is required"}, {status: 400});
    }

    try {
        await sendMail({name, email, message});
        return NextResponse.json({
            message: "Thanks for reaching out! I'll get back to you soon.",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {message: "Failed to send message. Try again later."},
            {status: 500},
        );
    }
}
