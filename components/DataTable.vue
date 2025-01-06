<template>
  <div class="">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search..."
      class="mb-4 p-2 border border-gray-300 rounded w-full text-xs sm:text-sm"
    />
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white text-xs sm:text-sm border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th
              v-for="header in headers"
              :key="header.key"
              class="py-2 px-4 border-b border-gray-300 cursor-pointer text-left"
              @click="sortTable(header.key)"
            >
              {{ header.label }}
              <Icon v-if="sortKey === header.key" :name="sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down'" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedRows.length === 0">
            <td :colspan="headers.length" class="py-2 px-4 text-center">No results found</td>
          </tr>
          <tr v-else v-for="row in paginatedRows" :key="row.id" class="hover:bg-gray-100">
            <td v-for="header in headers" :key="header.key" class="py-2 px-4 border-b border-gray-300">
              <slot :name="header.key" :row="row">
                {{ row[header.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="totalPages > 1" class="flex justify-center items-center mt-4 space-x-2">
      <BaseButton
        @click="prevPage"
        :disabled="currentPage === 1"
        variant="secondary"
      >
        <Icon name="mdi-chevron-left" />
      </BaseButton>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <BaseButton
        @click="nextPage"
        :disabled="currentPage === totalPages"
        variant="secondary"
      >
        <Icon name="mdi-chevron-right" />
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Row {
  id: number;
  [key: string]: any;
}

interface Header {
  key: string;
  label: string;
}

const props = defineProps({
  headers: {
    type: Array as PropType<Header[]>,
    required: true,
  },
  rows: {
    type: Array as PropType<Row[]>,
    required: true,
  }
});

const sortKey = ref('');
const sortOrder = ref('asc');
const searchQuery = ref('');

const sortTable = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows;

  return [...props.rows].sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder.value === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });
});

const filteredRows = computed(() => {
  if (!searchQuery.value) return sortedRows.value;

  return sortedRows.value.filter((row: Row) =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

const currentPage = ref(1);
const rowsPerPage = ref(10);

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredRows.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredRows.value.length / rowsPerPage.value);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>
