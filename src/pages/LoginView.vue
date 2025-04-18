<script lang="ts" setup>
import {ref} from "vue";
import {Form, type FormSubmitEvent} from "@primevue/forms";
import * as validator from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import type {LoginFormModel} from "../utils/types/LoginFormModel.ts";
import {useRouter} from "vue-router";
import {useCustomToast} from "../services/ToastService.ts";
import AnonymFormContainer from "../components/AnonymFormContainer.vue";

const router = useRouter();
const toast = useCustomToast();

const user = ref<LoginFormModel>({
    email: "",
    password: "",
});

const resolver = ref(
    validator.yupResolver(
        yup.object().shape({
            email: yup
                .string()
                .email("Format incorrect")
                .required("Ce champ est requis"),
            password: yup.string().required("Ce champ est requis"),
        }),
    ),
);

const onSubmit = (formSubmitEvent: FormSubmitEvent) => {
    if (formSubmitEvent.valid) {
        toast.success("Bienvenue");
        router.replace("/");
    } else {
        toast.error("Formulaire invalide");
    }
};
</script>

<template>
    <AnonymFormContainer
        subtitle="Connexion"
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
            <div class="flex flex-col gap-1">
                <FloatLabel variant="in">
                    <Password
                        id="password"
                        v-model="user.password"
                        :feedback="false"
                        fluid
                        name="password"
                        toggle-mask
                    />
                    <label for="password">Mot de passe</label>
                </FloatLabel>
                <Message
                    v-if="$form.password?.invalid"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ $form.password.error.message }}
                </Message>
            </div>
            <Button
                label="Connexion"
                size="large"
                type="submit"
            />
            <RouterLink
                :to="{ name: 'forgotPassword' }"
                class="self-end"
            >
                <Button
                    label="Mot de passe oublié ?"
                    variant="link"
                />
            </RouterLink>
        </Form>
        <Divider />
        <div class="w-full flex gap-3 items-center justify-center">
            <span>Pas encore inscrit ?</span>
            <RouterLink :to="{ name: 'signup' }">
                <Button
                    label="Créer un compte"
                    variant="outlined"
                />
            </RouterLink>
        </div>
    </AnonymFormContainer>
</template>


