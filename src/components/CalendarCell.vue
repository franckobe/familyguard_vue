<script lang="ts" setup>

import {isToday} from "../utils/calendarUtils.ts";

defineProps<{
  calendarDay: Date,
  children: string[],
  isDifferentPeriod?: boolean
}>();

</script>

<template>
  <div
      class="flex flex-col items-center justify-center p-2 rounded cursor-pointer hover:bg-primary hover:text-primary-contrast transition border active:bg-primary-emphasis"
      :class="{
               'border-transparent': !isToday(calendarDay),
               'border-accent': isToday(calendarDay),
               'text-muted-color': isDifferentPeriod,
           }"
      v-tooltip.bottom="children.join(', ')"
  >
    {{ calendarDay.getDate() }}
    <div class="flex justify-center gap-0.5 h-[5px]">
      <div v-for="child in children"
           class="bg-accent block h-full w-[5px] rounded-xs"
           :title="child"
      />
    </div>
  </div>
</template>