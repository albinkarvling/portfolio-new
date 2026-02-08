declare global {
    namespace NodeJS {
        interface ProcessEnv {
            RESEND_API_KEY_V2: string;
        }
    }
}

export {};
