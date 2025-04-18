<script lang="ts" setup>
import {useDrawerStore} from "../utils/store/DrawerStore.ts";

const drawerStore = useDrawerStore();
</script>

<template>
    <Drawer
        v-model:visible="drawerStore.isVisible"
        :block-scroll="true"
        :dismissable="true"
        class="!w-10/12 md:!w-8/12 lg:!w-1/2"
        position="right"
        @hide="drawerStore.close"
    >
        <component
            :is="drawerStore.component"
            v-bind="drawerStore.props"
        />
    </Drawer>
</template>
