<template>
  <div class="p-6 bg-white rounded-lg shadow-lg space-y-6">
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-3xl font-extrabold text-dark-gray">Runs</h1>
      <NuxtLink
        to="/runs/create"
        class="inline-block"
      >
        <BaseButton>Create New</BaseButton>
      </NuxtLink>
    </div>
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-if="error" :message="error" />
    <DataTable v-else :headers="headers" :rows="rows">
      <template #actions="{ row }">
        <NuxtLink :to="`/runs/${row.id}`" class="text-blue-600">
          <BaseButton>View</BaseButton>
        </NuxtLink>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useApi } from "@/composables/useApi";
import type { Run, Profile, Assignment } from "~/types";
import {
  formatDistance,
  formatDuration,
  mapAssignmentsToRuns,
} from "@/composables/utils";

const loading = ref(true);

const { data: runs, error: runsError } = useApi<Run[]>("runs");
const { data: drivers, error: driversError } = useApi<Profile[]>("profiles");
const { data: assignments, error: assignmentsError } =
  useApi<Assignment[]>("assignments");

type RunWithDriverName = Run & { driver_name: string };

const runsWithDriverNames = computed((): RunWithDriverName[] => {
  if (!runs.value || !drivers.value || !assignments.value) return [];
  return mapAssignmentsToRuns(runs.value, drivers.value, assignments.value);
});

const headers = [
  { key: "name", label: "Name" },
  { key: "distance", label: "Distance" },
  { key: "duration", label: "Duration" },
  { key: "driver_name", label: "Assigned Driver" },
  { key: "actions", label: "Actions" },
];

const rows = computed(() =>
  runsWithDriverNames.value
    .filter((run: RunWithDriverName) => run.id !== undefined)
    .map(
      (
        run: RunWithDriverName
      ): {
        id: number;
        name: string;
        distance: string;
        duration: string;
        driver_name: string;
      } => ({
        id: run.id as number,
        name: run.name,
        distance: formatDistance(Number(run.distance)),
        duration: formatDuration(Number(run.duration)),
        driver_name: run.driver_name,
      })
    )
);

const error = computed(
  () => runsError.value || driversError.value || assignmentsError.value
);

onMounted(() => {
  if (runsError.value) console.error("Failed to load runs data");
  if (driversError.value) console.error("Failed to load drivers data");
  if (assignmentsError.value) console.error("Failed to load assignments data");
  loading.value = false;
});
</script>
