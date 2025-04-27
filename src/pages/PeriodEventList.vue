<script lang="ts" setup>
import {DrawerRegistry} from "../utils/enums.ts";
import {useDrawerStore} from "../utils/store/DrawerStore.ts";
import {format} from "date-fns";
import type {CalendarEventsByDays} from "../utils/types/CalendarEventsByDays.ts";

const drawerStore = useDrawerStore();

const props = defineProps<{
  periodEvents: CalendarEventsByDays,
  selectedDate?: Date | null | undefined
}>();

</script>

<template>
  <div class="flex flex-col gap-4">
    <div
        v-if="props.periodEvents && Object.keys(props.periodEvents).length > 0"
        class="flex flex-col gap-2"
    >
      <div
          v-for="(events, dateStr) in props.periodEvents"
          :key="dateStr"
          class="flex gap-2 border-l-accent border-l-3 pl-2 py-2 bg-current/1 border border-current/10 rounded-r-md rounded-l-sm"
      >
        <span class="text-muted-color font-semibold font-mono pt-1">
            {{ dateStr }}
        </span>
        <div class="flex flex-col gap-1">
          <div
              v-for="event in events"
              :key="event.toString()"
              class="flex flex-col"
          >
            <span class="flex items-center gap-1 text-xl">
                <i
                    :class="{
                        'pi-user': event.children.length === 1,
                        'pi-users': event.children.length > 1,
                    }"
                    class="pi pi-xl text-accent"
                />
                {{ event.getChildrenFirstnames()?.join(", ") }}
            </span>
            <div>
              <span
                  v-if="event.isWholeDay(dateStr)"
                  class="flex items-center gap-2"
              >
                  <i class="pi pi-calendar"/>Jour & nuit<i
                  class="pi pi-moon"
              />
              </span>
              <div
                  v-else
                  class="flex items-center gap-2"
              >
                <i
                    :class="{
                        'pi-clock': event.isSingleDay(),
                        'pi-history': event.hasPreviousDay(dateStr),
                        'pi-moon': event.hasNextDay(dateStr),
                    }"
                    class="pi"
                />
                <span v-if="!event.hasPreviousDay(dateStr)">
                                        {{
                    format(
                        event.fromDate!,
                        event.isSingleDay() || !event.hasPreviousDay(dateStr)
                            ? "HH:mm"
                            : "dd/MM/yyyy HH:mm",
                    )
                  }}
                                    </span>
                <i class="pi pi-arrow-right pi-sm"/>
                <span>
                                        {{
                    format(
                        event.toDate!,
                        event.isSingleDay() || !event.hasNextDay(dateStr)
                            ? "HH:mm"
                            : "dd/MM/yyyy HH:mm",
                    )
                  }}
                                    </span>
              </div>
            </div>
            <div class="flex items-center gap-2 text-muted-color">
              <i class="pi pi-map-marker text-red-300"/>
              {{ event.location }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Aucun évènement pour cette période
    </div>
    <div class="w-full">
      <Button
          label="Ajouter une demande"
          variant="text"
          severity="dashed"
          class="!py-4"
          fluid
          @click="drawerStore.open(DrawerRegistry.EVENT_CREATION, {
                    fromDate: props.selectedDate,
                })
            "
      />
    </div>
  </div>
</template>
