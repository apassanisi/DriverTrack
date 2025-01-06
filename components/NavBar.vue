<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center">
      <NuxtLink
        to="/"
        class="text-gray-200 text-xs sm:text-sm font-bold transition-colors duration-200"
      >
        DriverTrack
      </NuxtLink>
      <div class="flex space-x-4">
        <BaseButton
          v-if="!user"
          @click="navigateToAuth"
          class="flex flex-row items-center justify-center gap-4 text-xs sm:text-sm text-gray-200 transition-colors duration-200"
        >
          <Icon name="mdi-login" /> Log In / Register
        </BaseButton>
        <div v-else class="text-gray-200 flex flex-row items-center justify-center gap-4 text-xs sm:text-sm">
          <span>{{ profile?.username }} </span>
          <span>({{ user.is_driver ? "Driver" : "Admin" }})</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const router = useRouter();

const user = computed(() => userStore.user);
const profile = computed(() => userStore.profile);

const navigateToAuth = () => {
  router.push("/auth");
};
</script>
