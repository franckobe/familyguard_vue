<script lang="ts" setup>
import {computed, ref} from "vue";
import ChildApi from "../api/ChildApi.ts";
import type Child from "../utils/objects/Child.ts";
import CalendarEvent from "../utils/objects/CalendarEvent.ts";
import * as validator from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import type {FormSubmitEvent} from "@primevue/forms";
import {useCustomToast} from "../services/ToastService.ts";
import CalendarEventApi from "../api/CalendarEventApi.ts";
import {useDrawerStore} from "../utils/store/DrawerStore.ts";

const toast = useCustomToast();
const drawerStore = useDrawerStore();

const props = defineProps<{
    fromDate?: Date | null;
    toDate?: Date | null;
}>();

const newEvent = ref<CalendarEvent>(new CalendarEvent());
const childrenField = computed(() => newEvent.value.children.length);

const availableChildren: Child[] = ChildApi.getMyChildren();
newEvent.value.children = [...availableChildren];

const resolver = ref(
    validator.yupResolver(
        yup.object().shape({
            fromDate: yup
                .date()
                .typeError("Format invalide")
                .required("Ce champ est requis"),
            toDate: yup
                .date()
                .typeError("Format invalide")
                .required("Ce champ est requis"),
            children: yup
                .number()
                .transform(() => {
                    return newEvent.value.children.length;
                })
                .required("Ce champ est requis")
                .min(1, "Au moins un choix est requis"),
            location: yup.string().required("Ce champ est requis"),
        }),
    ),
);

const handleChildSelection = (child: Child) => {
    const index = newEvent.value.children.findIndex((c) => c.id === child.id);
    if (index !== -1) {
        newEvent.value.children.splice(index, 1);
    } else {
        newEvent.value.children.push(child);
    }
};
const handleFormSubmit = (formSubmitEvent: FormSubmitEvent) => {
    if (formSubmitEvent.valid) {
        if (CalendarEventApi.create(newEvent.value)) {
            toast.success("Evènement créé");
            drawerStore.close();
        } else {
            toast.error("Erreur");
        }
    } else {
        toast.error("Formulaire invalide");
    }
};
</script>

<template>
    <Panel class="container mx-auto">
        <template #header>
            <h2 class="text-2xl">
                Nouvelle demande
            </h2>
        </template>
        <Form
            v-slot="$form"
            :resolver
            class="flex flex-col gap-4"
            @submit="handleFormSubmit"
        >
            <div class="flex flex-wrap gap-2">
                <div class="grow">
                    <FloatLabel variant="in">
                        <DatePicker
                            v-model="newEvent.fromDate"
                            :default-value="props.fromDate"
                            :manual-input="false"
                            :show-button-bar="true"
                            :show-icon="true"
                            :show-time="true"
                            :step-minute="15"
                            fluid
                            hour-format="24"
                            icon-display="input"
                            input-id="from-date"
                            name="fromDate"
                            variant="filled"
                        />
                        <label for="from-date">Début</label>
                    </FloatLabel>
                    <Message
                        v-if="$form.fromDate?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                    >
                        {{ $form.fromDate.error.message }}
                    </Message>
                </div>
                <div class="grow">
                    <FloatLabel variant="in">
                        <DatePicker
                            v-model="newEvent.toDate"
                            :default-value="props.toDate"
                            :manual-input="false"
                            :show-button-bar="true"
                            :show-icon="true"
                            :show-time="true"
                            :step-minute="15"
                            fluid
                            hour-format="24"
                            icon-display="input"
                            input-id="to-date"
                            name="toDate"
                            variant="filled"
                        />
                        <label for="to-date">Fin</label>
                    </FloatLabel>
                    <Message
                        v-if="$form.toDate?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                    >
                        {{ $form.toDate.error.message }}
                    </Message>
                </div>
            </div>
            <div>
                <div class="flex flex-wrap gap-2">
                    <Chip
                        v-for="child in availableChildren"
                        :key="child.id"
                        :class="{
                            'border-transparent': !newEvent.children.includes(child),
                            'border-primary': newEvent.children.includes(child),
                        }"
                        :icon="
                            newEvent.children.includes(child) ? 'pi pi-check' : 'pi pi-times'
                        "
                        :label="child.firstname"
                        class="cursor-pointer border"
                        @click="handleChildSelection(child)"
                    />
                    <InputNumber
                        v-model="childrenField"
                        class="!hidden"
                        name="children"
                    />
                </div>
                <Message
                    v-if="$form.children?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ $form.children.error.message }}
                </Message>
            </div>
            <div>
                <FloatLabel variant="in">
                    <InputText
                        id="location"
                        v-model="newEvent.location"
                        name="location"
                        variant="filled"
                    />
                    <label for="location">Lieu</label>
                </FloatLabel>
                <Message
                    v-if="$form.location?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ $form.location.error.message }}
                </Message>
            </div>
            <Button
                label="Valider"
                type="submit"
            />
        </Form>
    </Panel>
</template>


