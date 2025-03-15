<script lang="ts" setup>
import {computed, ref} from "vue";
import type {CalendarEventModel} from "../utils/types/CalendarEventModel.ts";
import {allMonths} from "../utils/constants.ts";
import {getAllDaysInMonth} from "../utils/calendarUtils.ts";
import CalendarCell from "./CalendarCell.vue";
import CalendarTemplate from "./CalendarTemplate.vue";

const previousMonth = () => {
  if (currentMonth.value <= 1) {
    currentMonth.value = 12;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
}
const nextMonth = () => {
  if (currentMonth.value >= 12) {
    currentMonth.value = 1;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
}
const initialMonth = () => {
  currentMonth.value = todayMonth;
  currentYear.value = todayYear;
}
const isDifferentMonth = (calendarDate: Date): boolean => {
  return calendarDate.getMonth() !== currentMonth.value - 1;
}

const today = new Date();
const todayMonth = today.getMonth() + 1;
const todayYear = today.getFullYear();

let currentMonth = ref<number>(todayMonth);
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
        :title="`${allMonths[currentMonth - 1]} ${currentYear}`"
        @previous-click="previousMonth()"
        @next-click="nextMonth()"
        @reset-click="initialMonth()"
    >
      <CalendarCell v-for="calendarDay in getAllDaysInMonth(currentMonth, currentYear)"
                    :calendarDay="calendarDay"
                    :children="getDayChildren(calendarDay)"
                    :is-different-period="isDifferentMonth(calendarDay)"
      />
    </CalendarTemplate>
  </section>
</template>

<style scoped>

</style>