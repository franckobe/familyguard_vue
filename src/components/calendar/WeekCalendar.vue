<script lang="ts" setup>
import {computed, ref} from "vue";
import {allMonths} from "../../utils/constants.ts";
import {getAllDaysInWeek, getWeekNumber} from "../../utils/calendarUtils.ts";
import {getISOWeeksInYear} from "date-fns";
import CalendarCell from "./CalendarCell.vue";
import CalendarTemplate from "./CalendarTemplate.vue";
import type CalendarEvent from "../../utils/objects/CalendarEvent.ts";
import {getCalendarEventsByDays} from "../../utils/calendarEventUtils.ts";

const emit = defineEmits<{
    (e: "periodChange", fromDate: Date, toDate: Date): void;
    (e: "dateSelected", date: Date | null): void;
}>();
const props = defineProps<{
    calendarEvents: CalendarEvent[];
}>();

const previousWeek = () => {
    if (currentWeek.value <= 1) {
        currentYear.value--;
        currentWeek.value = getISOWeeksInYear(new Date(currentYear.value, 0, 1));
    } else {
        currentWeek.value--;
    }
    emitChange();
};
const nextWeek = () => {
    const weeksInYear = getISOWeeksInYear(new Date(currentYear.value, 0, 1));
    if (currentWeek.value >= weeksInYear) {
        currentYear.value++;
        currentWeek.value = 1;
    } else {
        currentWeek.value++;
    }
    emitChange();
};
const initialWeek = () => {
    currentWeek.value = todayWeekNumber;
    currentYear.value = todayYear;
    if (
        currentWeek.value !== todayWeekNumber ||
        currentYear.value !== todayYear
    ) {
        emitChange();
    }
};
const emitChange = () => {
    emit(
        "periodChange",
        allDaysInWeek.value[0],
        allDaysInWeek.value[allDaysInWeek.value.length - 1],
    );
};
const handleSelectedDate = (calendarSelectedDate: Date): void => {
    selectedDate.value =
        selectedDate.value === calendarSelectedDate ? null : calendarSelectedDate;
    emit("dateSelected", selectedDate.value);
};

const today = new Date();
const todayWeekNumber = getWeekNumber(today);
const todayYear = today.getFullYear();

const currentWeek = ref<number>(todayWeekNumber);
const currentYear = ref<number>(todayYear);
const selectedDate = ref<Date | null>(null);

const allDaysInWeek = computed(() =>
    getAllDaysInWeek(currentWeek.value, currentYear.value),
);
const startMonth = computed(() => allMonths[allDaysInWeek.value[0].getMonth()]);
const endMonth = computed(() => allMonths[allDaysInWeek.value[6].getMonth()]);

emitChange();

const getDayChildren = (calendarDate: Date): string[] => {
    const key = calendarDate.toLocaleDateString();
    return (
        getCalendarEventsByDays(props.calendarEvents)
            [key]?.map((calendarEvent: CalendarEvent) =>
                calendarEvent.getChildrenFirstnames(),
            )
            .flat() || []
    );
};
</script>

<template>
    <section>
        <CalendarTemplate
            :title="`S${currentWeek} ${startMonth + (endMonth !== startMonth ? `-${endMonth}` : '')} ${currentYear}`"
            @previous-click="previousWeek()"
            @next-click="nextWeek()"
            @reset-click="initialWeek()"
        >
            <CalendarCell
                v-for="calendarDay in allDaysInWeek"
                :key="calendarDay.getTime()"
                :calendar-day="calendarDay"
                :children="getDayChildren(calendarDay)"
                :is-selected="calendarDay === selectedDate"
                @click="handleSelectedDate(calendarDay)"
            />
        </CalendarTemplate>
    </section>
</template>
