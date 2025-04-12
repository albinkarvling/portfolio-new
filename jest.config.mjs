const config = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    moduleDirectories: ["node_modules", "<rootDir>/"],
    moduleNameMapper: {
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
        "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "^@/(.*)$": "<rootDir>/$1",
    },
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    transformIgnorePatterns: ["/node_modules/"],
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    collectCoverageFrom: ["components/**/*.{ts,tsx}"],
    coverageReporters: ["text", "lcov"],
};

export default config;
