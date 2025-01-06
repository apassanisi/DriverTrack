import BaseInput from '../components/BaseInput.vue';
import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/BaseInput',
  component: BaseInput,
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
    type: { control: 'text' },
    modelValue: { control: 'text' },
    required: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A component for rendering an input field with customizable type and validation.',
      },
    },
  },
} as Meta<typeof BaseInput>;

const Template: StoryFn<typeof BaseInput> = (args) => ({
  components: { BaseInput },
  setup() {
    return { args };
  },
  template: '<BaseInput v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  id: 'input',
  label: 'Input label',
  type: 'text',
  modelValue: '',
  required: false,
};
