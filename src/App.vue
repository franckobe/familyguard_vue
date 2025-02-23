<script setup lang="ts">
import {ref} from "vue";
import {switchTheme} from "./utils/utils.ts";

let isDarkTheme = ref(false);

</script>

<template>
  <ToggleSwitch v-model="isDarkTheme" @change="switchTheme(isDarkTheme)">
    <template #handle="{ checked }">
      <i :class="['pi pi-sm', { 'pi-moon': checked, 'pi-sun': !checked }]" />
    </template>
  </ToggleSwitch>
</template>

<style scoped>

</style>
