<script setup lang="ts">
import {ref} from "vue";
import {Form, type FormSubmitEvent} from "@primevue/forms";
import * as validator from '@primevue/forms/resolvers/yup';
import * as yup from "yup";
import {useRouter} from "vue-router";
import type {SignupFormModel} from "../utils/types/SignupFormModel.ts";
import {useCustomToast} from "../services/ToastService.ts";
import AnonymFormContainer from "../components/AnonymFormContainer.vue";

const router = useRouter();
const toast = useCustomToast();

const user = ref<SignupFormModel>({
  email: "",
  password: "",
  passwordConfirmation: "",
});

const resolver = ref(validator.yupResolver(
    yup.object().shape({
      email: yup.string().email('Format incorrect').required('Ce champ est requis'),
      password: yup.string().required('Ce champ est requis'),
      passwordConfirmation: yup.string().required('Ce champ est requis'),
    })
));

const onSubmit = (formSubmitEvent: FormSubmitEvent) => {
  if (formSubmitEvent.valid) {
    toast.success('Bienvenue');
    router.replace("/");
  }
  else {
    toast.error('Formulaire invalide');
  }
}
</script>

<template>
  <AnonymFormContainer title="FamilyGuard" subtitle="Nous rejoindre">
    <Form v-slot="$form" @submit="onSubmit" :resolver class="flex flex-col gap-3">
      <div class="flex flex-col gap-1">
        <FloatLabel variant="in">
          <InputText id="email" name="email" v-model="user.email" fluid />
          <label for="email">Email</label>
        </FloatLabel>
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <FloatLabel variant="in">
          <Password id="password" name="password" v-model="user.password" fluid toggle-mask :feedback="false" />
          <label for="password">Mot de passe</label>
        </FloatLabel>
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error.message }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <FloatLabel variant="in">
          <Password id="passwordConfirmation" name="passwordConfirmation" v-model="user.passwordConfirmation" fluid toggle-mask :feedback="false" />
          <label for="passwordConfirmation">Confirmation mot de passe</label>
        </FloatLabel>
        <Message v-if="$form.passwordConfirmation?.invalid" severity="error" size="small" variant="simple">{{ $form.passwordConfirmation.error.message }}</Message>
      </div>
      <Button label="Inscription" size="large" type="submit" />
    </Form>
    <Divider />
    <div class="w-full flex gap-3 items-center justify-center">
      <span>Déjà inscrit ?</span>
      <RouterLink to="/connexion">
        <Button variant="outlined" label="Se connecter"/>
      </RouterLink>
    </div>
  </AnonymFormContainer>
</template>

<style scoped>

</style>