import { defineStore } from 'pinia';
import { watch } from 'vue';
import {darkThemeClass} from "../constants.ts";
import {useStorage} from "@vueuse/core";

export const useThemeStore = defineStore('theme', () => {
    const isDarkTheme = useStorage('isDarkTheme', true);

    const toggleTheme = () => {
        isDarkTheme.value = !isDarkTheme.value;
    };

    watch(isDarkTheme, (newVal) => {
        const html = document.documentElement;
        if (newVal) {
            html.classList.add(darkThemeClass);
        }
        else {
            html.classList.remove(darkThemeClass);
        }
    }, { immediate: true });

    return {
        isDarkTheme,
        toggleTheme
    };
});
