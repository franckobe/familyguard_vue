<script lang="ts" setup>
import type {MenuItem} from "primevue/menuitem";
import {ref} from "vue";
import DrawerTemplate from "../components/DrawerTemplate.vue";
import ThemeToggleSwitch from "../components/ThemeToggleSwitch.vue";

const items = ref<MenuItem[]>([
  {
    label: 'Accueil',
    icon: 'pi pi-home',
    url: '/'
  },
  {
    label: 'Calendrier',
    icon: 'pi pi-calendar',
    url: '/calendrier'
  },
  {
    label: 'Connexion',
    icon: 'pi pi-user',
    url: '/connexion'
  },
]);
</script>

<template>
  <section class="flex flex-col gap-4 p-4">
    <Menubar :model="items">
      <template #end>
        <div class="flex items-center">
          <ThemeToggleSwitch />
        </div>
      </template>
    </Menubar>

    <RouterView name="secondary" />
    <DrawerTemplate />

  </section>
</template>

<style scoped>

</style>