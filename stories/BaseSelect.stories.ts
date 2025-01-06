import BaseSelect from '../components/BaseSelect.vue';
import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/BaseSelect',
  component: BaseSelect,
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
    modelValue: { control: 'text' },
    options: { control: 'array' },
    required: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A component for rendering a select dropdown with customizable options.',
      },
    },
  },
} as Meta<typeof BaseSelect>;

const Template: StoryFn<typeof BaseSelect> = (args) => ({
  components: { BaseSelect },
  setup() {
    return { args };
  },
  template: '<BaseSelect v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  id: 'select',
  label: 'Select an option',
  modelValue: '',
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ],
  required: false,
};
