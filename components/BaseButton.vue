<template>
  <button
    :class="[
      'py-2 px-4 rounded transition-colors duration-200 flex flex-row items-center justify-center text-xs sm:text-sm',
      variantClasses,
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-light-gray text-text-black hover:bg-dark-gray';
    case 'danger':
      return 'bg-knight-red text-text-white hover:bg-dark-gray';
    default:
      return 'bg-swift-blue text-text-white hover:bg-dark-gray';
  }
});
</script>
