<script lang="ts" setup>
import {CalendarType} from "../utils/enums.ts";
import {computed, type ComputedRef, ref} from "vue";
import CalendarEvent from "../utils/objects/CalendarEvent.ts";
import CalendarEventApi from "../api/CalendarEventApi.ts";
import type {CalendarEventsByDays} from "../utils/types/CalendarEventsByDays.ts";
import {getCalendarEventsByDays} from "../utils/calendarEventUtils.ts";
import MonthCalendar from "../components/calendar/MonthCalendar.vue";
import WeekCalendar from "../components/calendar/WeekCalendar.vue";
import PeriodEventList from "./PeriodEventList.vue";

const calendarType = ref<CalendarType>(CalendarType.monthly);
const fromDate = ref<Date | null>(null);
const toDate = ref<Date | null>(null);
const selectedDate = ref<Date | null>(null);
const calendarEvents = ref<CalendarEvent[]>([]);

const handlePeriodChange = async (
    calendarFromDate: Date,
    calendarToDate: Date,
): Promise<void> => {
    fromDate.value = calendarFromDate;
    toDate.value = calendarToDate;
    selectedDate.value = null;
    calendarEvents.value = await new CalendarEventApi().getAllInPeriod(fromDate.value, toDate.value);
};
const handleDateSelected = (calendarSelectedDate: Date | null): void => {
    selectedDate.value = calendarSelectedDate;
};

const calendarEventsByDays: ComputedRef<CalendarEventsByDays> = computed(() =>
    getCalendarEventsByDays(calendarEvents.value),
);
const periodEvents: ComputedRef<CalendarEventsByDays> = computed(() => {
    if (selectedDate.value) {
        const selectedDateStr: string = selectedDate.value.toLocaleDateString();
        return calendarEventsByDays.value[selectedDateStr]
            ? ({
                [selectedDateStr]: calendarEventsByDays.value[selectedDateStr],
            } as CalendarEventsByDays)
            : {};
    }
    return calendarEventsByDays.value;
});
</script>

<template>
    <Panel class="container mx-auto">
        <template #header>
            <div class="flex flex-col">
                <h2 class="text-2xl">
                    Calendrier
                </h2>
                <h3
                    v-if="fromDate && toDate"
                    class="text-xl"
                >
                    {{ fromDate.toLocaleDateString() }} -
                    {{ toDate.toLocaleDateString() }}
                </h3>
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

      <PeriodEventList
          :period-events="periodEvents"
          :selected-date="selectedDate"
      />
    </Panel>
</template>


