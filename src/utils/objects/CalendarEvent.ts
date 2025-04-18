import type Child from "./Child.ts";

export default class CalendarEvent {
    constructor(
        public id: number | null = null,
        public fromDate: Date | null = null,
        public toDate: Date | null = null,
        public children: Child[] = [],
        public location: string | null = null,
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
}
