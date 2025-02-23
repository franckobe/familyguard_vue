import {darkThemeClass} from "./constants.ts";

export function switchTheme(isDarkTheme: boolean): void {
    if (isDarkTheme) {
        document.documentElement.classList.add(darkThemeClass);
    } else {
        document.documentElement.classList.remove(darkThemeClass);
    }
}