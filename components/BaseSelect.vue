<template>
  <div class="mb-4 relative">
    <label :for="id" class="block text-xs sm:text-sm font-medium text-dark-gray">{{ label }}</label>
    <div @click="toggleDropdown" class="mt-1 block w-full border border-light-gray rounded-md shadow-sm text-xs sm:text-sm bg-white text-dark-gray cursor-pointer flex justify-between items-center px-3 py-2">
      <span>{{ selectedLabel }}</span>
      <Icon :name="dropdownOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
    </div>
    <div v-if="dropdownOpen" class="absolute mt-1 w-full rounded-md shadow-lg bg-white z-10">
      <ul class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        <li v-for="option in options" :key="option.value" @click="selectOption(option)" class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-swift-blue hover:text-white">
          <span :class="{'font-semibold': option.value === modelValue, 'font-normal': option.value !== modelValue}" class="block truncate">
            {{ option.label }}
          </span>
          <span v-if="option.value === modelValue" class="absolute inset-y-0 right-0 flex items-center pr-4 text-swift-blue">
            <Icon name="mdi-check" />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  id: String,
  label: String,
  modelValue: [String, Number],
  options: {
    type: Array as () => Array<{ value: string | number; label: string }>,
    default: () => [],
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectOption = (option: { value: string | number; label: string }) => {
  dropdownOpen.value = false;
  emit('update:modelValue', option.value);
};

const selectedLabel = computed(() => {
  const selectedOption = props.options.find(option => option.value === props.modelValue);
  return selectedOption ? selectedOption.label : 'Select an option';
});
</script>
