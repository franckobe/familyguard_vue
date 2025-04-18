import {createApp} from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";
import {darkThemeClass} from "./utils/constants.ts";
import {fr} from "primelocale/js/fr.js";
/* Styling */
import "./style.css";
import "primeicons/primeicons.css";
import "./assets/style/icons.css";
import "./assets/style/toast.css";

import {createRouter, createWebHistory} from "vue-router";
import {definePreset} from "@primeuix/themes";
import {routes} from "./router/AppRoutes.ts";
import {createPinia} from "pinia";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const pinia = createPinia();

const app = createApp(App);
const MyTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50: "{indigo.50}",
            100: "{indigo.100}",
            200: "{indigo.200}",
            300: "{indigo.300}",
            400: "{indigo.400}",
            500: "{indigo.500}",
            600: "{indigo.600}",
            700: "{indigo.700}",
            800: "{indigo.800}",
            900: "{indigo.900}",
            950: "{indigo.950}",
        },
        accent: {
            50: "{amber.50}",
            100: "{amber.100}",
            200: "{amber.200}",
            300: "{amber.300}",
            400: "{amber.400}",
            500: "{amber.500}",
            600: "{amber.600}",
            700: "{amber.700}",
            800: "{amber.800}",
            900: "{amber.900}",
            950: "{amber.950}",
        },
    },
    extendTheme: {
        colors: {
            accent: "{accent.500}",
        },
    },
    extendPrime: {
        button: {
            accent: {
                root: {
                    class: "bg-accent border-accent text-white hover:bg-accent-700",
                },
            },
        },
    },
});

app.use(PrimeVue, {
    theme: {
        preset: MyTheme,
        options: {
            darkModeSelector: `.${darkThemeClass}`,
        },
    },
    locale: fr,
});
app.use(pinia);
app.use(router);
app.use(ToastService);
app.directive("tooltip", Tooltip);
app.mount("#app");
