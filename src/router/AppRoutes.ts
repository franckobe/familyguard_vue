import HomeView from "../pages/HomeView.vue";
import type {RouteRecordRaw} from "vue-router";
import {anonymRoutes} from "./AnonymRoutes.ts";

export const routes: Readonly<RouteRecordRaw[]> = [
    ...anonymRoutes,
    { path: '/', component: HomeView },
]