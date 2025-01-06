<template>
  <div class="p-6 bg-white rounded-lg shadow-lg flex flex-col space-y-6">
    <LoadingSpinner v-if="loading" />
    <div v-else class="flex flex-col space-y-6">
      <h1 class="text-3xl font-extrabold text-dark-gray">Profile Details</h1>
      <ErrorMessage v-if="error" :message="error" />
      <div v-else-if="profile" class="flex flex-col space-y-6">
        <DetailsCard :details="profileDetails" />
        <div v-if="assignment" class="flex flex-col space-y-4">
          <div class="flex flex-row justify-between items-center">
            <h2 class="text-lg font-bold text-dark-gray">Current Assignment</h2>
            <NuxtLink :to="`/assignments/${assignment.id}`" class="text-blue-600">
              <BaseButton>View Assignment</BaseButton>
            </NuxtLink>
          </div>
          <DetailsCard :details="assignmentDetails" />
        </div>
      </div>
      <div v-if="assignmentsForProfile.length" class="flex flex-col space-y-4">
        <h2 class="text-lg font-bold text-dark-gray">All Assignments</h2>
        <DataTable :headers="headers" :rows="rows">
          <template #actions="{ row }">
            <NuxtLink :to="`/assignments/${row.id}`" class="text-blue-600">
              <BaseButton>View</BaseButton>
            </NuxtLink>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from "@/composables/useApi";
import type { Profile, Assignment, Run } from "~/types";
import DataTable from "@/components/DataTable.vue";

const route = useRoute();
const profile = ref<Profile | null>(null);
const assignment = ref<Assignment | null>(null);
const loading = ref(false);

const {
  data: profileData,
  error: profileError,
  get: fetchProfile,
} = useApi<Profile>("profiles", route.params.id as string);
const {
  data: assignments,
  error: assignmentsError,
  get: fetchAssignments,
} = useApi<Assignment[]>("assignments");
const { data: runs, error: runsError, get: fetchRuns } = useApi<Run[]>("runs");

const fetchAssignmentForProfile = () => {
  if (!assignments.value || !runs.value || !profile.value) return;
  const currentAssignment = assignments.value.find(
    (a: Assignment) =>
      a.driver_id === profile.value?.id && a.status === "in-progress"
  );
  if (currentAssignment) {
    const run = runs.value.find((r: Run) => r.id === currentAssignment.run_id);
    assignment.value = {
      ...currentAssignment,
      run_name: run?.name ?? "Unknown",
    };
  }
};

const assignmentsForProfile = computed(() => {
  if (!assignments.value || !runs.value || !profile.value) return [];
  return assignments.value
    .filter((a: Assignment) => a.driver_id === profile.value?.id)
    .map((a: Assignment) => ({
      ...a,
      run_name: runs.value
        ? runs.value.find((r: Run) => r.id === a.run_id)?.name ?? "Unknown"
        : "Unknown",
    }));
});

const headers = [
  { key: "run_name", label: "Run Name" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];

const rows = computed(() =>
  assignmentsForProfile.value.map((assignment: Assignment) => ({
    id: assignment.id,
    run_name: assignment.run_name,
    status: assignment.status,
  }))
);

const profileDetails = computed(() => [
  { label: "Username", value: profile.value.username },
  { label: "First Name", value: profile.value.first_name },
  { label: "Last Name", value: profile.value.last_name },
  { label: "Email", value: profile.value.email },
  { label: "Role", value: profile.value.is_driver ? "Driver" : "Admin" },
]);

const assignmentDetails = computed(() => [
  { label: "Run Name", value: assignment.value.run_name },
  { label: "Status", value: assignment.value.status },
]);

watch(profileData, () => {
  if (profileData.value) {
    profile.value = profileData.value;
    fetchAssignmentForProfile();
  }
});

onMounted(async () => {
  loading.value = true;
  try {
    await fetchProfile();
    await fetchAssignments();
    await fetchRuns();
  } finally {
    loading.value = false;
  }
});

const error = computed(
  () => profileError.value || assignmentsError.value || runsError.value
);
</script>
