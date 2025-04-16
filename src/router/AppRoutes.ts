import HomeView from "../pages/HomeView.vue";
import type {RouteRecordRaw} from "vue-router";
import {anonymRoutes} from "./AnonymRoutes.ts";
import CalendarView from "../pages/CalendarView.vue";

export const routes: Readonly<RouteRecordRaw[]> = [
    ...anonymRoutes,
    {
        path: '/',
        component: HomeView,
        children: [
            {
                path: '',
                name: 'home',
                components: {
                    default: HomeView,
                    secondary: CalendarView,
                },
            },
            {
                path: 'calendrier',
                name: 'calendar',
                components: {
                    default: HomeView,
                    secondary: CalendarView,
                }
            },
        ]
    },
]