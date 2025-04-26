import type CalendarEvent from "../utils/objects/CalendarEvent.ts";
import ApiClient from "./ApiClient.ts";

export default class CalendarEventApi extends ApiClient {
    async getAllInPeriod(
        fromDate: Date | null,
        toDate: Date | null,
    ): Promise<CalendarEvent[]> {
        if (fromDate === null || toDate === null) {
            return [];
        }

        const calendarEvents = await this.get<CalendarEvent[]>('/fixtures/eventFixture.json', 'CalendarEvent');

        return calendarEvents.filter(
            (event: CalendarEvent) =>
                event.fromDate! <= toDate && event.toDate! >= fromDate,
        );
    }

    public create(calendarEvent: CalendarEvent): boolean {
        console.log(calendarEvent);
        return true;
    }
}
