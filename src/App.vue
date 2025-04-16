<script setup lang="ts">
import {useThemeStore} from "./utils/store/ThemeStore.ts";

useThemeStore();
</script>

<template>
  <Toast />
  <RouterView />
</template>

<style scoped>

</style>
