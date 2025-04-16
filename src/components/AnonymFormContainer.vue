<script setup lang="ts">
import ThemeToggleSwitch from "./ThemeToggleSwitch.vue";

const props = defineProps({
  title: String || null,
  subtitle: String || null,
})
</script>

<template>
  <div class="absolute top-0 right-0 p-4">
    <ThemeToggleSwitch />
  </div>
  <section class="relative flex items-center justify-center w-full min-h-[100vh] max-w-[1000px] mx-auto">
    <div class="flex flex-col gap-3 w-full md:w-2/3 p-8">
      <h1 v-if="props.title" class="text-center text-4xl">{{ props.title }}</h1>
      <h2 v-if="props.subtitle" class="text-center text-2xl">{{ props.subtitle }}</h2>
      <slot />
    </div>
  </section>
</template>

<style scoped>

</style>