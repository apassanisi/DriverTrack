<template>
  <div class="p-6 bg-white rounded-lg shadow-lg flex flex-col space-y-6">
    <LoadingSpinner v-if="loading" />
    <div v-else class="flex flex-col space-y-6">
      <h1 class="text-3xl font-extrabold text-dark-gray">Run Details</h1>
      <ErrorMessage v-if="error" :message="error" />
      <div v-else class="flex flex-col space-y-6">
        <DetailsCard :details="runDetails" />
        <div v-if="assignedDriver" class="flex flex-col space-y-4">
          <div class="flex flex-row items-center justify-between gap-2">
            <h2 class="text-lg font-bold text-dark-gray">Assigned Driver</h2>
            <BaseButton @click="unassignDriver" class="w-fit"
              >Unassign</BaseButton
            >
          </div>
          <p>{{ assignedDriver.first_name }} {{ assignedDriver.last_name }}</p>
        </div>
        <div v-else class="flex flex-col space-y-4">
          <h2 class="text-lg font-bold text-dark-gray">Assign Driver</h2>
          <form @submit.prevent="assignDriver(selectedDriver)">
            <BaseSelect
              v-model="selectedDriver"
              id="driver"
              label="Driver"
              :options="availableDrivers.map((driver: Profile) => ({ value: driver.id, label: `${driver.first_name} ${driver.last_name}` }))"
              required
            />
            <BaseButton type="submit">Assign</BaseButton>
          </form>
        </div>
        <BaseButton @click="deleteRun" variant="danger" class="w-fit"
          >Delete Run</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useApi } from "@/composables/useApi";
import type { Run, Profile, Assignment } from "~/types";

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref<string | null>(null);

const run = ref<Run>({
  name: "",
  distance: "",
  duration: "",
  start_location: { lat: 0, lng: 0 },
  end_location: { lat: 0, lng: 0 },
  description: "",
  assigned_to: null,
});

const {
  data,
  remove: deleteData,
  get: fetchRun,
  update: updateRun,
} = useApi<Run>("runs", route.params.id as string);
const { data: profiles, get: fetchProfiles } = useApi<Profile[]>("profiles");
const {
  data: assignments,
  get: fetchAssignments,
  create: createAssignment,
  update: updateAssignment,
} = useApi<Assignment>("assignments");

const selectedDriver = ref<number | null>(null);
const assignmentId = ref<number | null>(null);

const assignDriver = async (driverId: number | null) => {
  const updateRunResult = await updateRun(
    { assigned_to: driverId },
    route.params.id as string
  );
  if (updateRunResult.error) {
    console.error("Failed to update run");
    error.value = "Failed to update run";
    return;
  }

  const assignment = Array.isArray(assignments.value)
    ? assignments.value.find(
        (a: Assignment) => a.run_id === Number(route.params.id)
      )
    : null;
  if (assignment) {
    const updateAssignmentResult = await updateAssignment(
      { ...assignment, status: driverId ? "in-progress" : "pending" },
      assignment.id?.toString()
    );
    if (updateAssignmentResult.error) {
      console.error("Failed to update assignment");
      error.value = "Failed to update assignment";
      return;
    }
  } else if (driverId !== null) {
    const createAssignmentResult = await createAssignment({
      id: undefined,
      driver_id: driverId,
      run_id: Number(route.params.id),
      status: "in-progress",
      metrics: {},
    });
    if (createAssignmentResult.error) {
      console.error("Failed to create assignment");
      error.value = "Failed to create assignment";
      return;
    }
  }
  await fetchRun();
  await fetchAssignments();
};

const unassignDriver = async (): Promise<void> => {
  await assignDriver(null);
};

const deleteRun = async (): Promise<void> => {
  const deleteResult = await deleteData();
  if (deleteResult.error) {
    error.value = deleteResult.error.message || "Failed to delete run";
    return;
  }
  router.push("/runs");
};

const assignedDriver = computed((): Profile | null => {
  if (!run.value.assigned_to || !profiles.value) return null;
  return (
    profiles.value.find(
      (profile: Profile) => profile.id === run.value.assigned_to
    ) || null
  );
});

const availableDrivers = computed((): Profile[] => {
  if (!profiles.value || !Array.isArray(assignments.value)) return [];
  const assignedDriverIds: number[] = (assignments.value as Assignment[])
    .filter((assignment: Assignment) => assignment.status === "in-progress")
    .map((assignment: Assignment) => assignment.driver_id);
  return profiles.value.filter(
    (driver: any) => !assignedDriverIds.includes(driver.id)
  );
});

const runDetails = computed(() => [
  { label: "Name", value: run.value.name },
  { label: "Distance", value: run.value.distance },
  { label: "Duration", value: run.value.duration },
  {
    label: "Start Location",
    value: `Lat: ${run.value.start_location.lat}, Lng: ${run.value.start_location.lng}`,
  },
  {
    label: "End Location",
    value: `Lat: ${run.value.end_location.lat}, Lng: ${run.value.end_location.lng}`,
  },
  { label: "Description", value: run.value.description },
]);

watch(data, (newData: Run) => {
  if (newData) {
    run.value = newData;
  }
});

watch(assignments, (newAssignments: Assignment[]) => {
  if (newAssignments) {
    const assignment = Array.isArray(newAssignments)
      ? newAssignments.find((a) => a.run_id === Number(route.params.id))
      : null;
    if (assignment) {
      assignmentId.value = assignment.id ?? null;
    }
  }
});

onMounted(async () => {
  try {
    await fetchRun();
    await fetchAssignments();
    await fetchProfiles();
  } catch (err) {
    console.error("Failed to fetch data", err);
    error.value = "Failed to fetch data";
  } finally {
    loading.value = false;
  }
});
</script>
