import CalendarEvent from "./objects/CalendarEvent.ts";
import type {CalendarEventsByDays} from "./types/CalendarEventsByDays.ts";
import {eachDayOfInterval} from "date-fns";

export const getCalendarEventsByDays = (
    calendarEvents: CalendarEvent[],
): CalendarEventsByDays => {
    const eventsByDay: CalendarEventsByDays = {};
    calendarEvents.forEach((calendarEvent) => {
        eachDayOfInterval({
            start: calendarEvent.fromDate!,
            end: calendarEvent.toDate!,
        }).forEach((date) => {
            const dateStr: string = date.toLocaleDateString();
            if (!Object.prototype.hasOwnProperty.call(eventsByDay, dateStr)) {
                eventsByDay[dateStr] = [];
            }
            eventsByDay[dateStr].push(calendarEvent);
        });
    });
    return eventsByDay;
};
