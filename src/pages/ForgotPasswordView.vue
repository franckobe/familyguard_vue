<script lang="ts" setup>
import {ref} from "vue";
import {Form, type FormSubmitEvent} from "@primevue/forms";
import * as validator from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import {useRouter} from "vue-router";
import type {ForgotPasswordFormModel} from "../utils/types/ForgotPasswordFormModel.ts";
import {useCustomToast} from "../services/ToastService.ts";
import AnonymFormContainer from "../components/AnonymFormContainer.vue";

const router = useRouter();
const toast = useCustomToast();

const user = ref<ForgotPasswordFormModel>({
    email: "",
});

const resolver = ref(
    validator.yupResolver(
        yup.object().shape({
            email: yup
                .string()
                .email("Format incorrect")
                .required("Ce champ est requis"),
            password: yup.string().required("Ce champ est requis"),
            passwordConfirmation: yup.string().required("Ce champ est requis"),
        }),
    ),
);

const onSubmit = (formSubmitEvent: FormSubmitEvent) => {
    if (formSubmitEvent.valid) {
        toast.success("Procédure envoyée");
        router.replace("/");
    } else {
        toast.error("Formulaire invalide");
    }
};
</script>

<template>
    <AnonymFormContainer
        subtitle="Mot de passe oublié"
        title="FamilyGuard"
    >
        <Form
            v-slot="$form"
            :resolver
            class="flex flex-col gap-3"
            @submit="onSubmit"
        >
            <div class="flex flex-col gap-1">
                <FloatLabel variant="in">
                    <InputText
                        id="email"
                        v-model="user.email"
                        fluid
                        name="email"
                    />
                    <label for="email">Email</label>
                </FloatLabel>
                <Message
                    v-if="$form.email?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ $form.email.error.message }}
                </Message>
            </div>
            <Button
                label="Envoyer"
                size="large"
                type="submit"
            />
        </Form>
        <Divider />
        <div class="w-full flex gap-3 items-center justify-center">
            <RouterLink :to="{ name: 'login' }">
                <Button
                    label="Se connecter"
                    variant="outlined"
                />
            </RouterLink>
        </div>
    </AnonymFormContainer>
</template>


