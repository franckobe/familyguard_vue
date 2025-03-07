<script setup lang="ts">
import {ref} from "vue";

let isDarkTheme = ref(false);
import {switchTheme} from "../utils/utils.ts";
</script>

<template>
  <ToggleSwitch v-model="isDarkTheme" @change="switchTheme(isDarkTheme)">
    <template #handle="{ checked }">
      <i :class="['pi pi-sm', { 'pi-moon': checked, 'pi-sun': !checked }]" />
    </template>
  </ToggleSwitch>
  <RouterLink to="/connexion">
    <Button>Login</Button>
  </RouterLink>
</template>

<style scoped>

</style>