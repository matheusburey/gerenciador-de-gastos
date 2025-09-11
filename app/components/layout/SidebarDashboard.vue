<template>
  <aside class="w-54 py-2">
    <nav>
      <NuxtLink to="/dashboard">
        <LogoUi />
      </NuxtLink>
      <div class="px-4">
        <div v-for="link in links" :key="link.label" class="my-2 w-full">
          <NuxtLink
            :to="link.to"
            class="flex items-center gap-2 p-2 rounded-lg w-full"
            :class="{ 'bg-blue-500 text-white': activeLink === link }"
          >
            <component :is="link.icon" />
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </aside>
</template>
<script lang="ts" setup>
import * as icons from "lucide-vue-next";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: icons.LayoutDashboard },
  { to: "/dashboard/banks", label: "Bancos", icon: icons.Landmark },
  {
    to: "/dashboard/transactions",
    label: "Transações",
    icon: icons.List,
  },
];

const route = useRoute();

const activeLink = computed(() => {
  return links.find((link) => link.to === route.path);
});
</script>
