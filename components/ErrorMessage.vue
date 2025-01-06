<template>
  <div class="text-red-600 text-xs sm:text-sm">{{ message }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{ message: string }>();
</script>
