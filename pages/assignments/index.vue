<template>
  <div class="p-6 bg-white rounded-lg shadow-lg space-y-6">
    <h1 class="text-3xl font-extrabold text-dark-gray">Assignments</h1>
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-if="error" :message="error" />
    <DataTable v-else :headers="headers" :rows="rows">
      <template #actions="{ row }">
        <NuxtLink
          :to="`/assignments/${row.id}`"
          class="text-blue-600"
        >
          <BaseButton>View</BaseButton>
        </NuxtLink>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useApi } from "@/composables/useApi";
import { mapAssignmentsWithDetails } from "@/composables/utils";
import type { Assignment, Profile, Run } from "~/types";

const loading = ref(true);

const { data: assignments, error: assignmentsError } = useApi<Assignment[]>("assignments");
const { data: profiles, error: profilesError } = useApi<Profile[]>("profiles");
const { data: runs, error: runsError } = useApi<Run[]>("runs");

const assignmentsWithDetails = computed(() => {
  if (!assignments.value || !profiles.value || !runs.value) {
    return [];
  }
  return mapAssignmentsWithDetails(
    assignments.value,
    profiles.value,
    runs.value
  );
});

const headers = [
  { key: "driver_name", label: "Driver Name" },
  { key: "run_name", label: "Run Name" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];

const rows = computed(() =>
  assignmentsWithDetails.value.map((assignment: Assignment) => ({
    id: assignment.id,
    driver_name: assignment.driver?.name ?? "Unknown",
    run_name: assignment.run?.name ?? "Unknown",
    status: assignment.status,
  }))
);

const error = computed(() => assignmentsError.value || profilesError.value || runsError.value);

onMounted(() => {
  loading.value = false;
});
</script>
