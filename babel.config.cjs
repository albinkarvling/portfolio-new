module.exports = {
    presets: [
        [
            "next/babel",
            {
                "preset-react": {
                    runtime: "automatic", // 👈 This enables the new JSX transform
                },
            },
        ],
    ],
};
