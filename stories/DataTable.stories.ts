import DataTable from '../components/DataTable.vue';
import BaseButton from '../components/BaseButton.vue';
import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/DataTable',
  component: DataTable,
  argTypes: {
    headers: { control: 'array' },
    rows: { control: 'array' },
    searchQuery: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A component to display data in a table with sorting, searching, and pagination features.',
      },
    },
  },
} as Meta<typeof DataTable>;

const Template: StoryFn<typeof DataTable> = (args) => ({
  components: { DataTable, BaseButton },
  setup() {
    return { args };
  },
  template: '<DataTable v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  headers: [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'email', label: 'Email' },
  ],
  rows: [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { id: 3, name: 'Sam Johnson', age: 35, email: 'sam@example.com' },
  ],
  searchQuery: '',
};
