import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura'
import {darkThemeClass} from "./utils/constants.ts";
/* Styling */
import './style.css'
import 'primeicons/primeicons.css'
import './assets/style/icons.css'

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: `.${darkThemeClass}`,
        }
    }
})
app.mount('#app')
