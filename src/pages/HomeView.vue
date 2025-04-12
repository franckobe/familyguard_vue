<script lang="ts" setup>
import {computed, type ComputedRef, ref} from "vue";
import {switchTheme} from "../utils/utils.ts";
import MonthCalendar from "../components/MonthCalendar.vue";
import WeekCalendar from "../components/WeekCalendar.vue";
import {CalendarType} from "../utils/enums.ts";
import type {MenuItem} from "primevue/menuitem";
import {getCalendarEventsByDays} from "../utils/calendarEventUtils.ts";
import type {CalendarEventsByDays} from "../utils/types/CalendarEventsByDays.ts";
import CalendarEvent from "../utils/objects/CalendarEvent.ts";
import {format} from "date-fns";
import CalendarEventApi from "../api/CalendarEventApi.ts";

const isDarkTheme = ref(true);
switchTheme(isDarkTheme.value);
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

const calendarType = ref<CalendarType>(CalendarType.monthly);
const fromDate = ref<Date | null>(null);
const toDate = ref<Date | null>(null);
const selectedDate = ref<Date | null>(null);

const handlePeriodChange = (calendarFromDate: Date, calendarToDate: Date): void => {
  fromDate.value = calendarFromDate;
  toDate.value = calendarToDate;
  selectedDate.value = null;
}
const handleDateSelected = (calendarSelectedDate: Date|null): void => {
  selectedDate.value = calendarSelectedDate;
}

const calendarEvents: ComputedRef<CalendarEvent[]> = computed(() => CalendarEventApi.getAllInPeriod(fromDate.value, toDate.value));
const calendarEventsByDays: ComputedRef<CalendarEventsByDays> = computed(() => getCalendarEventsByDays(calendarEvents.value));
const periodEvents: ComputedRef<CalendarEventsByDays|null> = computed(() => {
  if (selectedDate.value) {
    const selectedDateStr: string = selectedDate.value.toLocaleDateString();
    return calendarEventsByDays.value[selectedDateStr] ? {
      [selectedDateStr]: calendarEventsByDays.value[selectedDateStr]
    } as CalendarEventsByDays: null;
  }
  return calendarEventsByDays.value;
});
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
          :calendar-events="calendarEvents"
          @period-change="handlePeriodChange"
          @date-selected="handleDateSelected"
      />
      <WeekCalendar
          v-else-if="calendarType === CalendarType.weekly"
          :calendar-events="calendarEvents"
          @period-change="handlePeriodChange"
          @date-selected="handleDateSelected"
      />

      <Divider />

      <div class="flex flex-col gap-4">
        <div v-if="periodEvents && Object.keys(periodEvents).length > 0"
             v-for="(events, dateStr) in periodEvents"
             v-bind:key="dateStr"
             class="flex gap-4 border-l-accent border-l-3 pl-2"
        >
          <span class="text-muted-color">{{ dateStr }}</span>
          <div class="flex flex-col">
            <div v-for="event in events">
              {{ event.getChildrenFirstnames() }}
              <span v-if="event.fromDate.toLocaleDateString() === event.toDate.toLocaleDateString()">{{ format(event.fromDate, 'HH:mm') }}</span>
              <span v-else>{{ format(event.fromDate, 'dd/MM/yyyy HH:mm') }}</span>
               =>
              <span v-if="event.fromDate.toLocaleDateString() === event.toDate.toLocaleDateString()">{{ format(event.toDate, 'HH:mm') }}</span>
              <span v-else>{{ format(event.toDate, 'dd/MM/yyyy HH:mm') }}</span>
            </div>
          </div>
        </div>
        <div v-else>
          Aucun évènement pour cette période
        </div>
      </div>

    </Panel>

  </section>
</template>

<style scoped>

</style>