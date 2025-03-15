<script lang="ts" setup>
import {ref} from "vue";
import {switchTheme} from "../utils/utils.ts";
import MonthCalendar from "../components/MonthCalendar.vue";
import WeekCalendar from "../components/WeekCalendar.vue";
import {CalendarType} from "../utils/enums.ts";
import type {MenuItem} from "primevue/menuitem";

let isDarkTheme = ref(false);
let calendarType = ref<CalendarType>(CalendarType.monthly);
const items = ref<MenuItem[]>([
  {
    label: 'Accueil',
    icon: 'pi pi-home',
    url: '/'
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

    <Panel>
      <template #header>
        <h2 class="text-2xl">Calendrier</h2>
      </template>
      <template #icons>
        <SelectButton
            v-model="calendarType"
            :options="Object.values(CalendarType)"
        />
      </template>
      <MonthCalendar v-if="calendarType === CalendarType.monthly"/>
      <WeekCalendar v-else-if="calendarType === CalendarType.weekly"/>
    </Panel>

  </section>
</template>

<style scoped>

</style>