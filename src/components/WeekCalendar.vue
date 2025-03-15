<script lang="ts" setup>
import {computed, ref} from "vue";
import type {CalendarEventModel} from "../utils/types/CalendarEventModel.ts";
import {allMonths} from "../utils/constants.ts";
import {getAllDaysInWeek, getWeekNumber} from "../utils/calendarUtils.ts";
import {getISOWeeksInYear} from "date-fns";
import CalendarCell from "./CalendarCell.vue";
import CalendarTemplate from "./CalendarTemplate.vue";

const previousWeek = () => {
  if (currentWeek.value <= 1) {
    currentYear.value--;
    currentWeek.value = getISOWeeksInYear(new Date(currentYear.value, 0, 1));
  } else {
    currentWeek.value--;
  }
};
const nextWeek = () => {
  const weeksInYear = getISOWeeksInYear(new Date(currentYear.value, 0, 1));
  if (currentWeek.value >= weeksInYear) {
    currentYear.value++;
    currentWeek.value = 1;
  } else {
    currentWeek.value++;
  }
};
const initialWeek = () => {
  currentWeek.value = todayWeekNumber;
  currentYear.value = todayYear;
};

const today = new Date();
const todayWeekNumber = getWeekNumber(today);
const todayYear = today.getFullYear();

let currentWeek = ref<number>(todayWeekNumber);
let currentYear = ref<number>(todayYear);
let monthEvents = ref<Array<CalendarEventModel>>([
  {
    fromDate: new Date(2025, 2, 11),
    toDate: new Date(2025, 2, 12),
    children: ['Emma', 'Zoé']
  },
  {
    fromDate: new Date(2025, 2, 3),
    toDate: new Date(2025, 2, 4),
    children: ['Camille', 'Zoé']
  },
  {
    fromDate: new Date(2025, 2, 25),
    toDate: new Date(2025, 2, 27),
    children: ['Louisa', 'Eve', 'Emma']
  }
]);
let allDaysInWeek = computed(() => getAllDaysInWeek(currentWeek.value, currentYear.value));
let startMonth = computed(() => allMonths[allDaysInWeek.value[0].getMonth()]);
let endMonth = computed(() => allMonths[allDaysInWeek.value[6].getMonth()]);

// TODO
const getDayChildren = (calendarDate: Date): string[] => {
  const key = calendarDate.toISOString().split('T')[0];
  return eventMap.value.get(key) || [];
};
const eventMap = computed(() => {
  const map = new Map<string, string[]>();
  monthEvents.value.forEach(event => {
    let currentDate = new Date(event.fromDate);
    while (currentDate <= event.toDate) {
      const key = currentDate.toISOString().split('T')[0]; // Clé au format YYYY-MM-DD
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(...event.children);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });
  return map;
});
</script>

<template>
  <section>
    <CalendarTemplate
        :title="`S${currentWeek} ${startMonth+(endMonth !== startMonth ? `-${endMonth}` : '')} ${currentYear}`"
        @previous-click="previousWeek()"
        @next-click="nextWeek()"
        @reset-click="initialWeek()"
    >
      <CalendarCell v-for="calendarDay in allDaysInWeek"
                    :calendarDay="calendarDay"
                    :children="getDayChildren(calendarDay)"
      />
    </CalendarTemplate>
  </section>
</template>