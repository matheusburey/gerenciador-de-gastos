<template>
  <div
    class="bg-white rounded-l-full py-1 rounded-r-xl shadow-sm flex justify-between items-center"
  >
    <div
      class="bg-blue-100 flex items-center justify-center rounded-full h-14 w-14"
    >
      <component :is="icon" class="h-6 w-6" :class="color" />
    </div>
    <div class="pr-2">
      <p class="text-xs text-gray-600">{{ label }}</p>
      <p class="text-3xl font-bold" :class="color">
        {{
          value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        }}
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  value: {
    type: Number,
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});
</script>
