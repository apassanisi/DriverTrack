<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />
    <div class="flex pl-12">
      <Sidebar v-if="user" />
      <div :class="user ? 'flex-1 container mx-auto p-4 pl-16 pt-8' : 'flex-1 container mx-auto p-4 pt-8'">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const user = computed(() => userStore.user);
</script>
