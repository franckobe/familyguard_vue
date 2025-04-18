import {defineStore} from "pinia";
import {computed, markRaw, ref} from "vue";
import type {DrawerEntry} from "../types/DrawerEntry.ts";

export const useDrawerStore = defineStore("drawer", () => {
    const current = ref<DrawerEntry | null>(null);
    const isVisible = ref(false);

    const open = <TProps extends Record<string, any>>(
        entry: DrawerEntry<TProps>,
        props?: TProps,
    ) => {
        current.value = {
            component: markRaw(entry.component),
            props,
        };
        isVisible.value = true;
    };

    const close = () => {
        isVisible.value = false;
        current.value = null;
    };

    const component = computed(() => current.value?.component ?? null);
    const props = computed(() => current.value?.props ?? {});

    return {
        isVisible,
        component,
        props,
        open,
        close,
    };
});
