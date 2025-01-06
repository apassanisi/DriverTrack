<template>
  <div class="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col space-y-2">
    <div v-for="detail in details" :key="detail.label" class="flex justify-between">
      <span class="font-bold">{{ detail.label }}:</span>
      <span>{{ detail.value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

interface Detail {
  label: string;
  value: string | number;
}

const props = defineProps<{
  details: Detail[];
}>();
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f7fafc;
}
</style>
