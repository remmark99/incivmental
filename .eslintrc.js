module.exports = {
    "root": true,
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb",
        "airbnb-typescript"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": [
            "./tsconfig.json"
        ],
        "tsconfigRootDir": __dirname
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "indent": "off",
        "@typescript-eslint/indent": [
            "error",
            4
        ],
        "linebreak-style": "off",
        "react/jsx-indent": [
            "error",
            4
        ],
        "react/jsx-indent-props": [
            "error",
            4
        ],
        "no-restricted-exports": ["error", {
            "restrictedNamedExports": [
                "then"
            ]
        }],
        "react/function-component-definition": "off",
        "no-param-reassign": ["error", {
            props: true,
            ignorePropertyModificationsFor: [
                'state'
            ]
        }]
    },
    "ignorePatterns": [
        "src/**/*.test.ts",
        "src/frontend/generated/*"
    ]
}
