<template>
  <div class="flex bg-gray-50">
    <SidebarDashboard />
    <div class="w-full h-screen">
      <header class="flex justify-between items-center p-4 h-1/12">
        <h1 class="text-2xl font-bold">{{ getTitle() }}</h1>
      </header>
      <div class="h-11/12">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const url = useRoute();
function getTitle() {
  const name = url.name as string;
  const names: Record<string, string> = {
    dashboard: "Dashboard",
  };
  return names[name] || "Dashboard";
}
</script>
