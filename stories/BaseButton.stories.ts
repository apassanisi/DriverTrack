import BaseButton from '../components/BaseButton.vue';
import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/BaseButton',
  component: BaseButton,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A button component with different variants and a disabled state.',
      },
    },
  },
} as Meta<typeof BaseButton>;

const Template: StoryFn<typeof BaseButton> = (args) => ({
  components: { BaseButton },
  setup() {
    return { args };
  },
  template: '<BaseButton v-bind="args">Button</BaseButton>',
});

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'primary',
  disabled: true,
};
