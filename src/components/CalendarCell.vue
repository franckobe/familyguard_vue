<script lang="ts" setup>
import {isToday} from "../utils/calendarUtils.ts";

defineProps<{
  calendarDay: Date,
  children: string[],
  isDifferentPeriod?: boolean
  isSelected?: boolean
}>();

</script>

<template>
  <div
      class="relative flex flex-col items-center justify-center p-2 rounded cursor-pointer transition border active:bg-primary-600 active:text-white"
      :class="{
               'border-transparent': !isToday(calendarDay),
               'border-accent': isToday(calendarDay),
               'text-muted-color': isDifferentPeriod,
               'bg-primary-600 text-white': isSelected,
               'hover:bg-primary hover:text-white': !isSelected
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