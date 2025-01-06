import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ErrorMessage from '../../components/ErrorMessage.vue';

describe('ErrorMessage.vue', () => {
  it('renders message when passed', () => {
    const message = 'Error occurred';
    const wrapper = mount(ErrorMessage, {
      props: { message }
    });
    expect(wrapper.text()).toBe(message);
  });
});
