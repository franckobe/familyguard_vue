<script lang="ts" setup>
import type {MenuItem} from "primevue/menuitem";
import {ref} from "vue";
import DrawerTemplate from "../components/DrawerTemplate.vue";
import ThemeToggleSwitch from "../components/ThemeToggleSwitch.vue";

const items = ref<MenuItem[]>([
  {
    label: "Accueil",
    icon: "pi pi-home",
    route: {name: "home"}
  },
  {
    label: "Calendrier",
    icon: "pi pi-calendar",
    route: {name: "calendar"}
  },
  {
    label: "Connexion",
    icon: "pi pi-user",
    route: {name: "login"}
  },
]);
</script>

<template>
  <section
      class="flex flex-col gap-4 p-4"
  >
    <Menubar
        :model="items"
    >
      <template
          #end
      >
        <div
            class="flex items-center"
        >
          <ThemeToggleSwitch/>
        </div>
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon"/>
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon"/>
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down"/>
        </a>
      </template>
    </Menubar>

    <RouterView
        name="secondary"
    />
    <DrawerTemplate/>
  </section>
</template>


