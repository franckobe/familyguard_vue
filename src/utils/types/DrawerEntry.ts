import type {Component} from "vue";

export type DrawerEntry<TProps extends Record<string, any> = any> = {
    component: Component;
    props?: TProps;
};
