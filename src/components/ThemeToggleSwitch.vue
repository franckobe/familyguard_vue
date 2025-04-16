<script setup lang="ts">
import {useThemeStore} from "../utils/store/ThemeStore.ts";

const themeStore = useThemeStore();
</script>

<template>
  <ToggleSwitch @change="themeStore.toggleTheme" :default-value="themeStore.isDarkTheme">
    <template #handle="{ checked }">
      <i :class="['pi pi-sm', { 'pi-moon': checked, 'pi-sun': !checked }]"/>
    </template>
  </ToggleSwitch>
</template>

<style scoped>

</style>