<script lang="ts" setup>
import {useThemeStore} from "../utils/store/ThemeStore.ts";

const themeStore = useThemeStore();
</script>

<template>
    <ToggleSwitch
        :default-value="themeStore.isDarkTheme"
        @change="themeStore.toggleTheme"
    >
        <template
            #handle="{ checked }"
        >
            <i
                :class="['pi pi-sm', { 'pi-moon': checked, 'pi-sun': !checked }]"
            />
        </template>
    </ToggleSwitch>
</template>


