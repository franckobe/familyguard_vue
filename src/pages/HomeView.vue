<script lang="ts" setup>
import {switchTheme} from "../utils/utils.ts";
import type {MenuItem} from "primevue/menuitem";
import {ref} from "vue";
import DrawerTemplate from "../components/DrawerTemplate.vue";

const isDarkTheme = ref(true);
switchTheme(isDarkTheme.value);
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
          <ToggleSwitch v-model="isDarkTheme" @change="switchTheme(isDarkTheme)">
            <template #handle="{ checked }">
              <i :class="['pi pi-sm', { 'pi-moon': checked, 'pi-sun': !checked }]"/>
            </template>
          </ToggleSwitch>
        </div>
      </template>
    </Menubar>

    <RouterView name="secondary" />
    <DrawerTemplate />

  </section>
</template>

<style scoped>

</style>