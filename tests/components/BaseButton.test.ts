import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../../components/BaseButton.vue';

describe('BaseButton.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'primary' }
    });
    expect(wrapper.classes()).toContain('bg-blue-500');
  });

  it('emits click event on click', async () => {
    const wrapper = mount(BaseButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
