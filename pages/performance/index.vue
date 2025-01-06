<template>
  <div class="p-6 bg-white rounded-lg shadow-lg space-y-6">
    <h1 class="text-3xl font-extrabold text-dark-gray">Performance</h1>
    <div class="mb-6">
      <BaseSelect
        v-model="selectedDriver"
        id="driver"
        label="Select Driver"
        :options="driverOptions"
        :required="true"
      />
    </div>
    <LoadingSpinner v-if="loading" />
    <div v-else class="relative">
      <p v-if="!selectedDriver" class="text-center text-dark-gray">Please select a driver to view performance data</p>
      <canvas v-if="hasData && selectedDriver" id="performanceChart"></canvas>
      <p v-else-if="selectedDriver" class="text-center text-dark-gray">No data for driver</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import Chart from 'chart.js/auto';
import type { Assignment, Profile } from '~/types';

const loading = ref(true);
const hasData = ref(false);

const { data: assignments,  get: fetchAssignments } = useApi<Assignment[]>('assignments');
const { data: drivers, get: fetchDrivers } = useApi<Profile[]>('profiles');

const selectedDriver = ref<number | null>(null);
let chartInstance: Chart | null = null;

const driverOptions = computed(() => {
  return drivers.value?.map(driver => ({
    value: driver.id,
    label: `${driver.first_name} ${driver.last_name}`
  })) || [];
});

const createChart = (metrics: { delays: number[], fuelUsed: number[], completionTimes: number[] }) => {
  const ctx = document.getElementById('performanceChart') as HTMLCanvasElement;
  if (ctx) {
    const context = ctx.getContext('2d');
    if (context) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      chartInstance = new Chart(context, {
        type: 'line',
        data: {
          labels: metrics.delays.map((_, index) => `Assignment ${index + 1}`),
          datasets: [
            {
              label: 'Delays (minutes)',
              data: metrics.delays,
              borderColor: '#B80000', // knight-red
              backgroundColor: 'rgba(184, 0, 0, 0.2)', // knight-red with opacity
            },
            {
              label: 'Fuel Used (gallons)',
              data: metrics.fuelUsed,
              borderColor: '#0057A6', // swift-blue
              backgroundColor: 'rgba(0, 87, 166, 0.2)', // swift-blue with opacity
            },
            {
              label: 'Completion Time (minutes)',
              data: metrics.completionTimes,
              borderColor: '#333333', // dark-gray
              backgroundColor: 'rgba(51, 51, 51, 0.2)', // dark-gray with opacity
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
};

const updateChart = () => {
  if (assignments.value && selectedDriver.value !== null) {
    const completedAssignments = assignments.value.filter(a => a.status === 'completed' && a.driver_id === selectedDriver.value);
    const metrics = completedAssignments.reduce((acc: { delays: number[], fuelUsed: number[], completionTimes: number[] }, a) => {
      acc.delays.push(Number(a.metrics?.delays || 0));
      acc.fuelUsed.push(Number(a.metrics?.fuel_used || 0));
      const [hours, minutes] = (a.metrics?.completion_time || '0h 0m').split(' ').map(t => parseInt(t));
      acc.completionTimes.push((hours * 60) + minutes);
      return acc;
    }, { delays: [], fuelUsed: [], completionTimes: [] });
    hasData.value = metrics.delays.length > 0 || metrics.fuelUsed.length > 0 || metrics.completionTimes.length > 0;
    if (hasData.value) {
      createChart(metrics);
    } else {
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  }
};

watch([assignments, selectedDriver], updateChart);

watch(selectedDriver, updateChart); // Explicitly watch selectedDriver

onMounted(async () => {
  await fetchAssignments();
  await fetchDrivers();
  loading.value = false;
});
</script>
