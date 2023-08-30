module.exports = {
    extends: [
        "next/core-web-vitals",
        "airbnb",
        "airbnb/hooks",
        "airbnb-typescript",
        "prettier",
    ],
    plugins: ["prettier"],
    parserOptions: {
        project: "./tsconfig.json",
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
            },
        ],
        "react/react-in-jsx-scope": "off",
        "no-plusplus": "off",
        "react/require-default-props": [2, { functions: "defaultArguments" }],
        "no-param-reassign": [2, { props: false }],
        "no-unused-vars": [2, { argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-unused-vars": [2, { argsIgnorePattern: "^_" }],
    },
};
