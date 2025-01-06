<template>
  <div
    :class="[isCollapsed ? 'w-12' : 'w-40']"
    class="fixed flex rounded-tr-lg flex-col justify-between left-0 top-16 bottom-0 bg-gray-800 transition-all duration-300 pt-2 z-50"
  >
    <div class="px-2 flex w-full items-center justify-center flex-col gap-2">
      <div @click="toggleCollapse" class="w-full flex items-center justify-end">
        <BaseButton
          class="bg-transparent hover:bg-transparent flex flex-row gap-2 justify-end items-center p-2 text-xs sm:text-sm text-white hover:bg-gray-700 hover:text-black rounded transition-colors duration-200"
        >
          <Icon :name="isCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
        </BaseButton>
      </div>
      <SidebarLinks :links="links" :isCollapsed="isCollapsed" />
    </div>
    <div class="px-2 pb-4 flex w-full items-center justify-center flex-col gap-2">
      <SidebarLinks :links="profileLinks" :isCollapsed="isCollapsed" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { logOut } from "@/composables/useAuth";

const isCollapsed = ref(true);
const userStore = useUserStore();
const router = useRouter();

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleLogOut = async () => {
  const { error } = await logOut();
  if (error) {
    console.error("Error during logout:", error.message);
    return;
  }
  userStore.clearUserData();
  router.push("/");
};

const links = [
  { to: "/", label: "Home", icon: "mdi-truck" },
  { to: "/profiles", label: "Profiles", icon: "mdi-account-group" },
  { to: "/runs", label: "Runs", icon: "mdi-road-variant" },
  { to: "/assignments", label: "Assignments", icon: "mdi-clipboard-list" },
  { to: "/performance", label: "Performance", icon: "mdi-chart-line" },
];

const profileLinks = [
  {
    to: userStore.profile ? `/profiles/${userStore.profile.id}` : "#",
    label: "Profile",
    icon: "mdi-account-outline",
    condition: !!userStore.profile,
  },
  {
    to: "#",
    label: "Log Out",
    icon: "mdi-logout-variant",
    action: handleLogOut,
  },
];
</script>
