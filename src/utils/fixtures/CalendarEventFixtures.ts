import CalendarEvent from "../types/CalendarEvent.ts";
import Child from "../types/Child.ts";
import ChildFixtures from "./ChildFixtures.ts";

export default class CalendarEventFixtures {

    private static calendarEvents: CalendarEvent[] = [
        new CalendarEvent(1, new Date(2025, 2, 11), new Date(2025, 2, 11), []),
        new CalendarEvent(2, new Date(2025, 2, 3), new Date(2025, 2, 4), []),
        new CalendarEvent(3, new Date(2025, 2, 25), new Date(2025, 2, 27), []),
    ];

    public static getOneCalendarEvent(): CalendarEvent {
        return this.calendarEvents[0];
    }

    public static getCalendarEvents(): CalendarEvent[] {
        const children: Child[] = ChildFixtures.getChildren();
        const dispatch: {[index: string]: number[]} = {
            '1': [1,4],
            '2': [2,3],
            '3': [2,3,5],
        };
        this.calendarEvents.forEach(calendarEvent => {
            calendarEvent.children = children.filter(child => {
                return dispatch[calendarEvent.id.toString()].includes(child.id);
            });
        });
        return this.calendarEvents;
    }

}