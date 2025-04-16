import LoginView from "../pages/LoginView.vue";
import SignupView from "../pages/SignupView.vue";
import ForgotPasswordView from "../pages/ForgotPasswordView.vue";
import type {RouteRecordRaw} from "vue-router";

export const anonymRoutes: RouteRecordRaw[] = [
    { path: '/connexion', name: 'login', component: LoginView },
    { path: '/inscription', name: 'signup', component: SignupView },
    { path: '/mot-de-passe-oublie', name: 'forgotPassword', component: ForgotPasswordView },
]