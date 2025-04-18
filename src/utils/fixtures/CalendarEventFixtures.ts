import CalendarEvent from "../objects/CalendarEvent.ts";
import Child from "../objects/Child.ts";
import ChildFixtures from "./ChildFixtures.ts";

export default class CalendarEventFixtures {
    private static calendarEvents: CalendarEvent[] = [
        new CalendarEvent(
            1,
            new Date(2025, 3, 11, 8),
            new Date(2025, 3, 11, 18),
            [],
            "Chez Mamina",
        ),
        new CalendarEvent(
            2,
            new Date(2025, 3, 3, 18),
            new Date(2025, 3, 4, 16),
            [],
            "Chez Mamina",
        ),
        new CalendarEvent(
            3,
            new Date(2025, 3, 25, 18),
            new Date(2025, 3, 27, 10),
            [],
            "Chez Mamina",
        ),
        new CalendarEvent(
            4,
            new Date(2025, 3, 25, 16),
            new Date(2025, 3, 25, 20),
            [],
            "Chez Papino",
        ),
    ];

    public static getCalendarEvents(): CalendarEvent[] {
        const children: Child[] = ChildFixtures.getChildren();
        const dispatch: { [index: string]: number[] } = {
            "1": [1, 4],
            "2": [2, 3],
            "3": [2, 3, 5],
            "4": [1],
        };
        this.calendarEvents
            .sort((a, b) => a.fromDate!.getTime() - b.fromDate!.getTime())
            .forEach((calendarEvent) => {
                calendarEvent.children = children.filter((child) => {
                    return dispatch[calendarEvent.id!.toString()].includes(child.id);
                });
            });
        return this.calendarEvents;
    }

    public static add(calendarEvent: CalendarEvent): CalendarEvent {
        calendarEvent.id = this.calendarEvents.length + 1;
        this.calendarEvents.push(calendarEvent);
        return calendarEvent;
    }
}
