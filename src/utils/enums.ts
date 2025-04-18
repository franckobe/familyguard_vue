import EventCreationView from "../pages/EventCreationView.vue";
import type {DrawerEntry} from "./types/DrawerEntry.ts";

export enum CalendarType {
    monthly = "Mois",
    weekly = "Semaine",
}

type EventCreationViewProps = InstanceType<typeof EventCreationView>["$props"];

export const DrawerRegistry = {
    EVENT_CREATION: {
        component: EventCreationView,
    } as DrawerEntry<EventCreationViewProps>,
};
