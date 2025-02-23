import {NextResponse} from "next/server";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async ({
    name,
    email,
    message,
}: {
    name: string;
    email: string;
    message: string;
}) => {
    const {error} = await resend.emails.send({
        from: `${name} <notification@poxen.dev>`,
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
