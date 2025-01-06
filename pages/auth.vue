<template>
  <div class="p-8 bg-white rounded-lg shadow-lg space-y-6 max-w-md mx-auto">
    <h1 class="text-3xl font-extrabold text-dark-gray">{{ isLogin ? 'Log In' : 'Sign Up' }}</h1>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <ErrorMessage v-if="error" :message="error" />
      <BaseInput id="email" label="Email" v-model="email" type="email" required />
      <BaseInput id="password" label="Password" v-model="password" type="password" required />
      <template v-if="!isLogin">
        <BaseInput id="first_name" label="First Name" v-model="firstName" required />
        <BaseInput id="last_name" label="Last Name" v-model="lastName" required />
        <div class="flex items-center space-x-4">
          <label class="flex items-center">
            <input v-model="isDriver" type="checkbox" class="mr-2" />
            Driver
          </label>
          <label class="flex items-center">
            <input v-model="isAdmin" type="checkbox" class="mr-2" />
            Admin
          </label>
        </div>
      </template>
      <BaseButton type="submit">{{ isLogin ? 'Log In' : 'Sign Up' }}</BaseButton>
    </form>
    <BaseButton @click="toggleForm" class="">
      {{ isLogin ? 'Need an account? Register' : 'Already have an account? Log In' }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { signUp, logIn } from "@/composables/useAuth";
import type { User } from '~/types';

const userStore = useUserStore();
const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const isLogin = ref(true);
const isDriver = ref(false);
const isAdmin = ref(false);
const error = ref<string | null>(null);
const router = useRouter();

const handleSubmit = async () => {
  try {
    error.value = null;
    const { user, error: authError } = isLogin.value
      ? await logIn(email.value, password.value)
      : await signUp(email.value, password.value, firstName.value, lastName.value, isDriver.value, isAdmin.value);
    if (authError) {
      error.value = "Authentication failed";
      return;
    } else {
      userStore.setUser(user as User);
      router.push("/");
    }
  } catch (err) {
    error.value = "Error during authentication";
  }
};

const toggleForm = () => {
  isLogin.value = !isLogin.value;
};
</script>
