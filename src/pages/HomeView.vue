<script lang="ts" setup>
import {ref} from "vue";
import {switchTheme} from "../utils/utils.ts";
import MonthCalendar from "../components/MonthCalendar.vue";
import WeekCalendar from "../components/WeekCalendar.vue";
import {CalendarType} from "../utils/enums.ts";
import type {MenuItem} from "primevue/menuitem";
import CalendarEventFixtures from "../utils/fixtures/CalendarEventFixtures.ts";

const isDarkTheme = ref(true);
switchTheme(isDarkTheme.value);
const calendarType = ref<CalendarType>(CalendarType.monthly);
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

const fromDate = ref<Date | null>(null);
const toDate = ref<Date | null>(null);
const selectedDate = ref<Date | null>(null);

const handlePeriodChange = (calendarFromDate: Date, calendarToDate: Date): void => {
  fromDate.value = calendarFromDate;
  toDate.value = calendarToDate;
}
const handleDateSelected = (calendarSelectedDate: Date|null): void => {
  selectedDate.value = calendarSelectedDate;
}

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
        <div class="flex flex-col">
          <h2 class="text-2xl">Calendrier</h2>
          <h3 class="text-xl" v-if="fromDate && toDate">{{ fromDate.toLocaleDateString() }} - {{ toDate.toLocaleDateString()
            }}</h3>
        </div>
      </template>
      <template #icons>
        <SelectButton
            v-model="calendarType"
            :options="Object.values(CalendarType)"
        />
      </template>
      <MonthCalendar
          v-if="calendarType === CalendarType.monthly"
          :calendar-events="CalendarEventFixtures.getCalendarEvents()"
          @period-change="handlePeriodChange"
          @date-selected="handleDateSelected"
      />
      <WeekCalendar
          v-else-if="calendarType === CalendarType.weekly"
          :calendar-events="CalendarEventFixtures.getCalendarEvents()"
          @period-change="handlePeriodChange"
          @date-selected="handleDateSelected"
      />
    </Panel>

  </section>
</template>

<style scoped>

</style>