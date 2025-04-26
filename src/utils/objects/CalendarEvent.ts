import Child from "./Child.ts";
import User from "./User.ts";
import {EventStatus} from "../enums.ts";

export default class CalendarEvent {
    constructor(
        public id: number | null = null,
        public fromDate: Date | null = null,
        public toDate: Date | null = null,
        public children: Child[] = [],
        public location: string | null = null,
        public sitter: User | null = null,
        public status: EventStatus = EventStatus.PENDING,
    ) {
    }

    getChildrenFirstnames(): string[] | undefined {
        return this.children.map((child) => child.firstname);
    }

    isSingleDay(): boolean {
        return (
            this.fromDate?.toLocaleDateString() === this.toDate?.toLocaleDateString()
        );
    }

    isWholeDay(dayStr: string): boolean {
        return ![
            this.fromDate?.toLocaleDateString(),
            this.toDate?.toLocaleDateString(),
        ].includes(dayStr);
    }

    hasPreviousDay(dayStr: string): boolean {
        return this.fromDate?.toLocaleDateString() !== dayStr;
    }

    hasNextDay(dayStr: string): boolean {
        return this.toDate?.toLocaleDateString() !== dayStr;
    }

    static fromJson(json: any): CalendarEvent {
        return new CalendarEvent(
            json.id ?? null,
            json.fromDate ? new Date(json.fromDate) : null,
            json.toDate ? new Date(json.toDate) : null,
            json.children?.map(Child.fromJson) ?? [],
            json.location ?? null,
            json.sitter ? User.fromJson(json.sitter) : null
        );
    }
}
