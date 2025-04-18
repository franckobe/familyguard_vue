import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import vuePlugin from 'eslint-plugin-vue';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import pluginVue from "eslint-plugin-vue";
import unusedImports from "eslint-plugin-unused-imports";
export default [
    ...pluginVue.configs['flat/recommended'],
    {
        files: ["**/*.js", "**/*.ts"],
        ignores: ["node_modules/"],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module",
                extraFileExtensions: [".vue"],
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            import: importPlugin,
            "@typescript-eslint": typescriptPlugin,
            vue: vuePlugin,
            "unused-imports": unusedImports,
        },
        settings: {
            'import/resolver': {
                vite: {
                    config: './vite.config.js',
                },
            },
        },
        rules: {
            semi: ['error', 'always'],
            "no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    "vars": "all",
                    "varsIgnorePattern": "^_",
                    "args": "after-used",
                    "argsIgnorePattern": "^_",
                },
            ],
            "eol-last": ["error", "always"],
        },
    },
    {
        files: ["**/*.vue"],
        ignores: ["node_modules/"],
        languageOptions: {
            parser: vuePlugin['vue-eslint-parser'],
            parserOptions: {
                parser: typescriptParser,
                ecmaVersion: 2020,
                sourceType: "module",
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            vue: vuePlugin,
            "unused-imports": unusedImports,
        },
        settings: {
            'import/resolver': {
                vite: {
                    config: './vite.config.js',
                },
            },
        },
        rules: {
            semi: ['error', 'always'],
            "vue/script-indent": ["error", 4, {"baseIndent": 0}],
            "vue/html-indent": ["error", 4, {"baseIndent": 1}],
            "vue/html-comment-indent": ["error", 4],
            "no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    "vars": "all",
                    "varsIgnorePattern": "^_",
                    "args": "after-used",
                    "argsIgnorePattern": "^_",
                },
            ],
            "vue/enforce-style-attribute": [
                "error",
                { "allow": ["scoped", "module", "plain"] }
            ],
            "vue/match-component-file-name": ["error", {
                "extensions": ["vue"],
                "shouldMatchCase": false
            }],
            "vue/no-empty-component-block": "error",
            "eol-last": ["error", "always"],
        },
    },
];
