<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :class="['mt-1 py-2 pl-4 block w-full border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm', inputClasses]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :required="required"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  modelValue: String,
  required: {
    type: Boolean,
    default: false,
  },
});

const inputClasses = computed(() => {
  return props.required ? 'border-red-500' : '';
});
</script>
