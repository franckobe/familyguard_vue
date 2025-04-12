import type CalendarEvent from "../utils/objects/CalendarEvent.ts";
import CalendarEventFixtures from "../utils/fixtures/CalendarEventFixtures.ts";

export default class CalendarEventApi {

    static getAllInPeriod(fromDate: Date|null, toDate: Date|null): CalendarEvent[] {
        if (fromDate === null || toDate === null) {
            return [];
        }
        return CalendarEventFixtures.getCalendarEvents().filter((event: CalendarEvent) => event.fromDate <= toDate && event.toDate >= fromDate);
    }

}