import HomeView from "../pages/HomeView.vue";
import type {RouteRecordRaw} from "vue-router";
import {anonymRoutes} from "./AnonymRoutes.ts";
import CalendarView from "../pages/CalendarView.vue";

export const routes: Readonly<RouteRecordRaw[]> = [
    ...anonymRoutes,
    {
        path: "/",
        component: HomeView,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "",
                name: "home",
                meta: {
                    requiresAuth: true,
                },
                components: {
                    default: HomeView,
                    secondary: CalendarView,
                },
            },
            {
                path: "calendrier",
                name: "calendar",
                meta: {
                    requiresAuth: true,
                },
                components: {
                    default: HomeView,
                    secondary: CalendarView,
                },
            },
        ],
    },
];
