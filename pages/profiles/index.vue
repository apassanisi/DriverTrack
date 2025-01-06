<template>
  <div class="p-6 bg-white rounded-lg shadow-lg space-y-6">
    <h1 class="text-3xl font-extrabold text-dark-gray">Profiles</h1>
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-if="error" :message="error" />
    <DataTable v-else :headers="headers" :rows="rows">
      <template #actions="{ row }">
        <NuxtLink :to="`/profiles/${row.id}`" class="text-blue-600">
          <BaseButton>View</BaseButton>
        </NuxtLink>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import type { Profile, Assignment } from '~/types';
import { mapProfilesWithAssignments } from '~/composables/utils';

const loading = ref(true);

const { data: profiles, error: profilesError } = useApi<Profile[]>('profiles');
const { data: assignments, error: assignmentsError } = useApi<Assignment[]>('assignments');

const profilesWithAssignmentStatus = computed(() => {
  if (!profiles.value || !assignments.value) return [];
  return mapProfilesWithAssignments(profiles.value, assignments.value);
});

const headers = [
  { key: 'username', label: 'Username' },
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'assigned', label: 'Assigned' },
  { key: 'actions', label: 'Actions' }
];

const rows = computed(() => profilesWithAssignmentStatus.value.map((profile: Profile) => ({
  id: profile.id,
  username: profile.username,
  name: `${profile.first_name} ${profile.last_name}`,
  role: profile.is_driver ? 'Driver' : 'Admin',
  assigned: profile.assigned ? 'Assigned' : 'Unassigned'
})));

const error = computed(() => profilesError.value || assignmentsError.value);

onMounted(() => {
  loading.value = false;
});
</script>
