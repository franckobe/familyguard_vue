<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import {computed, ref, watch} from 'vue';
import EventCreationView from "../pages/EventCreationView.vue";

const route = useRoute();
const router = useRouter();

const visible = ref(false);

watch(
    () => route.query.drawer,
    (drawer) => {
      visible.value = !!drawer;
    },
    { immediate: true }
);
const drawerComponent = computed(() => {
  if (route.query.drawer === 'event-creation') {
    return EventCreationView;
  }
  return null;
});

const onHide = () => {
  const newQuery = { ...route.query };
  delete newQuery.drawer;
  router.replace({ query: newQuery });
};
</script>

<template>
  <Drawer
      v-model:visible="visible"
      position="right"
      :dismissable="true"
      :block-scroll="true"
      @hide="onHide"
      class="!w-10/12 md:!w-8/12 lg:!w-1/2"
  >
    <component :is="drawerComponent" />
  </Drawer>
</template>

