import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput from '../../components/BaseInput.vue';

describe('BaseInput.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseInput, {
      props: { id: 'test', label: 'Test Label', modelValue: '' }
    });
    expect(wrapper.find('label').text()).toBe('Test Label');
    expect(wrapper.find('input').attributes('id')).toBe('test');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseInput, {
      props: { modelValue: '' }
    });
    const inputElement = wrapper.find('input');
    await inputElement.setValue('new value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value']);
  });
});
