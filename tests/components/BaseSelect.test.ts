import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSelect from '../../components/BaseSelect.vue';

describe('BaseSelect.vue', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ];

  it('renders options correctly', () => {
    const wrapper = mount(BaseSelect, {
      props: { options }
    });
    const optionElements = wrapper.findAll('option');
    expect(optionElements).toHaveLength(options.length);
    options.forEach((option, index) => {
      expect(optionElements[index].text()).toBe(option.label);
      expect(optionElements[index].element.value).toBe(option.value);
    });
  });

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(BaseSelect, {
      props: { options }
    });
    const selectElement = wrapper.find('select');
    await selectElement.setValue('2');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['2']);
  });
});
