import EventCreationView from "../pages/EventCreationView.vue";
import type { EventCreationViewProps } from "./types/EventCreationViewProps.ts";
import type {DrawerEntry} from "./types/DrawerEntry.ts";

export enum CalendarType {
    monthly = "Mois",
    weekly = "Semaine",
}

export const DrawerRegistry = {
    EVENT_CREATION: {
        component: EventCreationView,
    } as DrawerEntry<EventCreationViewProps>,
};

export enum UserRole {
    PARENT = 'parent',
    SITTER = 'sitter',
}

export enum EventStatus {
    PENDING = 'pending',
    VALIDATED = 'validated',
    REJECTED = 'rejected',
}
