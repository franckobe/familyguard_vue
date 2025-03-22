import type Child from "./Child.ts";

export default class CalendarEvent {
    constructor(
        public id: number,
        public fromDate: Date,
        public toDate: Date,
        public children: Child[],
    ) {
    }

    getChildrenFirstnames(): string[] {
        return this.children.map(child => child.firstname);
    }
}