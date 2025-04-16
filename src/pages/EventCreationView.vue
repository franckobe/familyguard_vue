<script setup lang="ts">
import {computed, ref} from "vue";
import ChildApi from "../api/ChildApi.ts";
import type Child from "../utils/objects/Child.ts";
import CalendarEvent from "../utils/objects/CalendarEvent.ts";
import * as validator from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import type {FormSubmitEvent} from "@primevue/forms";
import {useCustomToast} from "../services/ToastService.ts";
import CalendarEventApi from "../api/CalendarEventApi.ts";
import {useRouter} from "vue-router";

const toast = useCustomToast();
const router = useRouter();

const newEvent = ref<CalendarEvent>(new CalendarEvent());
const childrenField = computed(() => newEvent.value.children.length);

const availableChildren: Child[] = ChildApi.getMyChildren();
newEvent.value.children = [...availableChildren];

const resolver = ref(validator.yupResolver(
    yup.object().shape({
      fromDate: yup.date()
          .typeError('Format invalide')
          .required('Ce champ est requis'),
      toDate: yup.date()
          .typeError('Format invalide')
          .required('Ce champ est requis'),
      children: yup.number()
          .transform(() => {
            return newEvent.value.children.length;
          })
          .required('Ce champ est requis')
          .min(1, 'Au moins un choix est requis'),
      location: yup.string()
          .required('Ce champ est requis')
    })
));

const handleChildSelection = (child: Child) => {
  const index = newEvent.value.children.findIndex(c => c.id === child.id);
  if (index !== -1) {
    newEvent.value.children.splice(index, 1);
  } else {
    newEvent.value.children.push(child);
  }
};
const handleFormSubmit = (formSubmitEvent: FormSubmitEvent) => {
  if (formSubmitEvent.valid) {
    if (CalendarEventApi.create(newEvent.value)) {
      toast.success('Evènement créé');
      router.replace({
        name: router.currentRoute.value.name,
        query: {}
      });
    }
    else {
      toast.error('Erreur');
    }
  }
  else {
    toast.error('Formulaire invalide');
  }
};
</script>

<template>
  <Panel class="container mx-auto">
    <template #header>
      <h2 class="text-2xl">Nouvelle demande</h2>
    </template>
    <Form
        class="flex flex-col gap-4"
        @submit="handleFormSubmit"
        v-slot="$form"
        :resolver
    >
      <div class="flex flex-wrap gap-2">
        <div class="grow">
          <FloatLabel variant="in">
            <DatePicker
                v-model="newEvent.fromDate"
                inputId="from-date"
                name="fromDate"
                :showIcon="true"
                iconDisplay="input"
                variant="filled"
                hour-format="24"
                :show-time="true"
                :manual-input="false"
                :step-minute="15"
                fluid
                :show-button-bar="true"
            />
            <label for="from-date">Début</label>
          </FloatLabel>
          <Message v-if="$form.fromDate?.invalid" severity="error" size="small" variant="simple">{{ $form.fromDate.error.message }}</Message>
        </div>
        <div class="grow">
          <FloatLabel variant="in">
            <DatePicker
                v-model="newEvent.toDate"
                inputId="to-date"
                name="toDate"
                :showIcon="true"
                iconDisplay="input"
                variant="filled"
                hour-format="24"
                :show-time="true"
                :manual-input="false"
                :step-minute="15"
                fluid
                :show-button-bar="true"
            />
            <label for="to-date">Fin</label>
          </FloatLabel>
          <Message v-if="$form.toDate?.invalid" severity="error" size="small" variant="simple">{{ $form.toDate.error.message }}</Message>
        </div>
      </div>
      <div>
        <div class="flex flex-wrap gap-2">
          <Chip
              v-for="child in availableChildren"
              :key="child.id"
              :label="child.firstname"
              :icon="newEvent.children.includes(child) ? 'pi pi-check': 'pi pi-times'"
              @click="handleChildSelection(child)"
              class="cursor-pointer border"
              :class="{
              'border-transparent': !newEvent.children.includes(child),
              'border-primary': newEvent.children.includes(child)
            }"
          />
          <InputNumber
            name="children"
            v-model="childrenField"
            class="!hidden"
          />
        </div>
        <Message v-if="$form.children?.invalid" severity="error" size="small" variant="simple">{{ $form.children.error.message }}</Message>
      </div>
      <div>
        <FloatLabel variant="in">
          <InputText
              variant="filled"
              v-model="newEvent.location"
              id="location"
              name="location"
          />
          <label for="location">Lieu</label>
        </FloatLabel>
        <Message v-if="$form.location?.invalid" severity="error" size="small" variant="simple">{{ $form.location.error.message }}</Message>
      </div>
      <Button
        label="Valider"
        type="submit"
      />
    </Form>
  </Panel>
</template>

<style scoped>

</style>