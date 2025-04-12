<script lang="ts" setup>
import {computed, ref} from "vue";
import {allMonths} from "../utils/constants.ts";
import {getAllDaysInMonth} from "../utils/calendarUtils.ts";
import CalendarCell from "./CalendarCell.vue";
import CalendarTemplate from "./CalendarTemplate.vue";
import type CalendarEvent from "../utils/objects/CalendarEvent.ts";
import {getCalendarEventsByDays} from "../utils/calendarEventUtils.ts";

const emit = defineEmits<{
  (e: 'periodChange', fromDate: Date, toDate: Date): void,
  (e: 'dateSelected', date: Date|null): void,
}>()
const props = defineProps<{
  calendarEvents: CalendarEvent[]
}>();

const previousMonth = () => {
  if (currentMonth.value <= 1) {
    currentMonth.value = 12;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  emitChange();
}
const nextMonth = () => {
  if (currentMonth.value >= 12) {
    currentMonth.value = 1;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  emitChange();
}
const initialMonth = () => {
  currentMonth.value = todayMonth;
  currentYear.value = todayYear;
  if (currentMonth.value !== todayMonth || currentYear.value !== todayYear) {
    emitChange();
  }
}
const emitChange = () => {
  emit("periodChange", allDaysInMonth.value[0], allDaysInMonth.value[allDaysInMonth.value.length - 1]);
}
const handleSelectedDate = (calendarSelectedDate: Date): void => {
  selectedDate.value = selectedDate.value === calendarSelectedDate ? null : calendarSelectedDate;
  emit('dateSelected', selectedDate.value)
}

const isDifferentMonth = (calendarDate: Date): boolean => {
  return calendarDate.getMonth() !== currentMonth.value - 1;
}

const today = new Date();
const todayMonth = today.getMonth() + 1;
const todayYear = today.getFullYear();

const currentMonth = ref<number>(todayMonth);
const currentYear = ref<number>(todayYear);
const selectedDate = ref<Date|null>(null);

const allDaysInMonth = computed(() => getAllDaysInMonth(currentMonth.value, currentYear.value));

emitChange();

const getDayChildren = (calendarDate: Date): string[] => {
  const key = calendarDate.toLocaleDateString();
  return getCalendarEventsByDays(props.calendarEvents)[key]?.map((calendarEvent: CalendarEvent) => calendarEvent.getChildrenFirstnames()).flat() || [];
};
</script>

<template>
  <section>
    <CalendarTemplate
        :title="`${allMonths[currentMonth - 1]} ${currentYear}`"
        @previous-click="previousMonth()"
        @next-click="nextMonth()"
        @reset-click="initialMonth()"
    >
      <CalendarCell v-for="calendarDay in allDaysInMonth"
                    :calendarDay="calendarDay"
                    :children="getDayChildren(calendarDay)"
                    :is-different-period="isDifferentMonth(calendarDay)"
                    :is-selected="calendarDay === selectedDate"
                    @click="handleSelectedDate(calendarDay)"
      />
    </CalendarTemplate>
  </section>
</template>

<style scoped>

</style>