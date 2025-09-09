<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
      {
        // Primary
        'border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500': variant === 'primary',
        // Secondary
        'border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500': variant === 'secondary',
        // Outline
        'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500': variant === 'outline',
        // Danger
        'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500': variant === 'danger',
        // Text
        'border-transparent text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 focus:ring-indigo-500': variant === 'text',
        // Sizes
        'px-2.5 py-1.5 text-xs': size === 'xs',
        'px-3 py-2 text-sm': size === 'sm',
        'px-4 py-2 text-sm': size === 'md',
        'px-6 py-3 text-base': size === 'lg',
        'px-8 py-4 text-base': size === 'xl',
        // Full width
        'w-full': fullWidth,
        // Disabled
        'opacity-50 cursor-not-allowed': disabled
      },
      $attrs.class
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <span v-if="loading" class="mr-2">
      <svg class="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

type ButtonType = 'button' | 'submit' | 'reset'
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'text'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

defineOptions({
  name: 'ButtonUi'
})

defineProps({
  type: {
    type: String as PropType<ButtonType>,
    default: 'button',
    validator: (value: string): value is ButtonType => 
      ['button', 'submit', 'reset'].includes(value)
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'primary',
    validator: (value: string): value is ButtonVariant => 
      ['primary', 'secondary', 'outline', 'danger', 'text'].includes(value)
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'md',
    validator: (value: string): value is ButtonSize => 
      ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const);
</script>
