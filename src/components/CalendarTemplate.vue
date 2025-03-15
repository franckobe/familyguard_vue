<script lang="ts" setup>
import {allDaysShort} from "../utils/constants.ts";

defineProps<{
  title: string,
}>();

defineEmits<{
  previousClick: [];
  nextClick: [];
  resetClick: [];
}>();
</script>

<template>
  <div class="flex items-center justify-center pb-2 gap-2">
    <Button icon="pi pi-chevron-left"
            severity="secondary"
            size="small"
            variant="text"
            @click="() => $emit('previousClick')"
    />
    <span class="min-w-[15ch] inline-block text-center">
      {{ title }}
    </span>
    <Button icon="pi pi-calendar"
            severity="secondary"
            size="small"
            variant="outlined"
            @click="() => $emit('resetClick')"
    />
    <Button icon="pi pi-chevron-right"
            severity="secondary"
            size="small"
            variant="text"
            @click="() => $emit('nextClick')"
    />
  </div>
  <div class="grid w-full grid-cols-7 gap-1">
    <div v-for="dayShort in allDaysShort"
         class="text-center font-semibold"
    >
      {{ dayShort }}
    </div>
    <slot/>
  </div>
</template>
