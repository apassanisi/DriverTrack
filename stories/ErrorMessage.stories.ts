import ErrorMessage from '../components/ErrorMessage.vue';
import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  argTypes: {
    message: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A component to display error messages in red text.',
      },
    },
  },
} as Meta<typeof ErrorMessage>;

const Template: StoryFn<typeof ErrorMessage> = (args) => ({
  components: { ErrorMessage },
  setup() {
    return { args };
  },
  template: '<ErrorMessage v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  message: 'This is an error message.',
};
