<template>
  <div class="w-full flex items-center justify-center flex-col gap-2">
    <template v-for="link in links" :key="link.to">
      <NuxtLink
        v-if="link.condition !== false"
        :to="link.to"
        class="flex flex-row gap-2 items-center w-full p-2 text-xs sm:text-sm text-white hover:bg-yellow-300 hover:text-black rounded transition-colors duration-200"
        active-class="bg-yellow-300 !text-black"
        @click="handleClick(link)"
      >
        <Icon :name="link.icon" :class="{ 'text-black': $route.path === link.to, 'hover:text-black': true }" />
        <span v-if="!isCollapsed">{{ link.label }}</span>
      </NuxtLink>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});

const handleClick = (link) => {
  if (link.action) {
    link.action();
  }
};

</script>
