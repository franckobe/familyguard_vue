<script lang="ts" setup>
import {useThemeStore} from "./utils/store/ThemeStore.ts";

useThemeStore();
</script>

<template>
    <Toast />
    <RouterView />
</template>


