import type Child from "./Child.ts";

export default class CalendarEvent {
    constructor(
        public id: number,
        public fromDate: Date,
        public toDate: Date,
        public children: Child[],
        public location: string
    ) {
    }

    getChildrenFirstnames(): string[] {
        return this.children.map(child => child.firstname);
    }

    isSingleDay(): boolean {
        return this.fromDate.toLocaleDateString() === this.toDate.toLocaleDateString();
    }

    isWholeDay(dayStr: string): boolean {
        return ![
            this.fromDate.toLocaleDateString(),
            this.toDate.toLocaleDateString()
        ].includes(dayStr);
    }

    hasPreviousDay(dayStr: string): boolean {
        return this.fromDate.toLocaleDateString() !== dayStr;
    }

    hasNextDay(dayStr: string): boolean {
        return this.toDate.toLocaleDateString() !== dayStr;
    }

}