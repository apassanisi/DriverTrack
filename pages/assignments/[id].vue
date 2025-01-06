<template>
  <div class="p-6 bg-white rounded-lg shadow-lg flex flex-col space-y-6">
    <LoadingSpinner v-if="loading" />
    <div v-else class="flex flex-col space-y-6">
      <ErrorMessage v-if="error" :message="error" />
      <div v-else class="flex flex-col space-y-6">
        <h1 class="text-3xl font-extrabold text-dark-gray">Assignment Details</h1>
        <DetailsCard :details="assignmentDetails" />
        <div v-if="assignment" class="flex flex-col space-y-4">
          <div class="">
            <BaseSelect
              v-model="assignment.status"
              id="status"
              label="Status"
              :options="[
                { value: 'pending', label: 'Pending' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' }
              ]"
            />
            <BaseButton @click="saveAssignment">Save</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import type { Assignment, Profile, Run  } from '~/types';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const assignment = ref<Assignment>({
  id: undefined, 
  driver_id: 0,
  run_id: 0,
  status: "pending",
  metrics: {
    delays: undefined,
    fuel_used: undefined,
    completion_time: undefined,
  },
});

const { data: assignmentData, error: assignmentError, update: updateAssignment, get: fetchAssignment } = useApi<Assignment>("assignments", route.params.id as string);
const { data: drivers, error: driversError, get: fetchDrivers } = useApi<Profile[]>("profiles");
const { data: runs, error: runsError, get: fetchRuns, update: updateRun } = useApi<Run[]>("runs");

const driverName = computed(() => {
  if (!assignment.value.driver_id || !drivers.value) return "Unknown";
  const driver = drivers.value.find((d: Profile) => d.id === assignment.value.driver_id);
  return driver ? `${driver.first_name} ${driver.last_name}` : "Unknown";
});

const runName = computed(() => {
  if (!assignment.value.run_id || !runs.value) return "Unknown";
  const run = runs.value
    ? runs.value.find((r: Run) => r.id === assignment.value.run_id)
    : null;
  return run ? run.name : "Unknown";
});

const assignmentDetails = computed(() => [
  { label: "Driver Name", value: driverName.value },
  { label: "Run Name", value: runName.value },
  { label: "Delays", value: assignment.value.metrics?.delays ?? "N/A" },
  { label: "Fuel Used", value: assignment.value.metrics?.fuel_used ?? "N/A" },
  { label: "Completion Time", value: assignment.value.metrics?.completion_time ?? "N/A" },
]);

const updateStatus = async () => {
  if (assignment.value.status === "completed") {
    updateMetrics();
    await unassignRun();
  }
};

const updateMetrics = () => {
  assignment.value.metrics = {
    delays: Math.floor(Math.random() * 60).toString(),
    fuel_used: (Math.random() * 50).toFixed(2),
    completion_time: `${Math.floor(Math.random() * 5)}h ${Math.floor(Math.random() * 60)}m`,
  };
};

const unassignRun = async () => {
  const run = runs.value?.find((r: Run) => r.id === assignment.value.run_id);
  if (run) {
    updateStatus()
    await updateRun({ assigned_to: null }, run.id);
  }
};

const saveAssignment = async () => {
  if (assignment.value.status === "completed") {
    updateMetrics();
  }
  const { error: updateError } = await updateAssignment({
    status: assignment.value.status,
    metrics: assignment.value.metrics,
  });
  if (updateError) {
    return;
  } else {
    router.push("/assignments");
  }
};

const error = computed(() => assignmentError.value || driversError.value || runsError.value);

onMounted(async () => {
  try {
    await fetchAssignment();
    await fetchDrivers();
    await fetchRuns();
  } finally {
    loading.value = false;
  }
});

watch(assignmentData, (newData: Assignment) => {
  if (newData) {
    assignment.value = newData;
  }
});
</script>
