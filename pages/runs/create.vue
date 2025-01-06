<template>
  <div class="p-8 bg-white rounded-lg shadow-lg space-y-6">
    <h1 class="text-3xl font-extrabold text-dark-gray">Create a New Run</h1>
    <BackButton to="/runs" />
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-if="error" :message="error" />
    <form v-else @submit.prevent="saveRun" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseInput id="name" label="Name" v-model="run.name" required />
        <BaseInput
          id="description"
          label="Description"
          v-model="run.description"
          type="textarea"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseSelect
          id="start_city"
          label="Start City"
          v-model="run.start_city"
          :options="cityOptions"
          required
        />
        <BaseSelect
          id="end_city"
          label="End City"
          v-model="run.end_city"
          :options="cityOptions"
          required
        />
      </div>
      <BaseButton type="submit" :disabled="loading" class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">{{
        loading ? "Creating..." : "Create"
      }}</BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useApi } from "@/composables/useApi";
import type { Run, City } from "~/types";
import { calculateDistance, calculateDuration } from "@/composables/utils";

const router = useRouter();
const loading = ref(false);
const error = ref<string | null>(null);
const run = ref<Run>({
  name: "",
  distance: "0",
  duration: "0",
  start_city: "",
  end_city: "",
  description: "",
  assigned_to: null,
  start_location: { lat: 0, lng: 0 },
  end_location: { lat: 0, lng: 0 },
});

const cities = [
  { name: "Phoenix", lat: 33.4484, lng: -112.074 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Chicago", lat: 41.8781, lng: -87.6298 },
  { name: "Houston", lat: 29.7604, lng: -95.3698 },
  { name: "Miami", lat: 25.7617, lng: -80.1918 },
  { name: "Dallas", lat: 32.7767, lng: -96.797 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { name: "Seattle", lat: 47.6062, lng: -122.3321 },
  { name: "Denver", lat: 39.7392, lng: -104.9903 },
];

const cityOptions = cities.map((city) => ({
  value: city.name,
  label: city.name,
}));

const { create: createRun } = useApi<Run>("runs");

const setRunDetails = (startCity: City, endCity: City) => {
  run.value = {
    ...run.value,
    start_location: { lat: startCity.lat, lng: startCity.lng },
    end_location: { lat: endCity.lat, lng: endCity.lng },
    distance: calculateDistance(
      startCity.lat,
      startCity.lng,
      endCity.lat,
      endCity.lng
    ).toString(),
    duration: calculateDuration(parseFloat(run.value.distance)).toFixed(2),
  };
};

const saveRun = async (): Promise<void> => {
  loading.value = true;
  error.value = null;
  const startCity = cities.find((city) => city.name === run.value.start_city);
  const endCity = cities.find((city) => city.name === run.value.end_city);
  if (startCity && endCity) {
    setRunDetails(startCity, endCity);
  }
  const runData: Run = { ...run.value };
  delete runData.start_city;
  delete runData.end_city;
  const { error: createError } = await createRun(runData);
  loading.value = false;
  if (createError) {
    error.value = "Failed to create run";
    console.error("Failed to create run");
    return;
  }
  router.push("/runs");
};
</script>
