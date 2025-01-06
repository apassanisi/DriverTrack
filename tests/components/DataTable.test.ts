import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DataTable from '../../components/DataTable.vue';

describe('DataTable.vue', () => {
  const headers = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' }
  ];
  const rows = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 }
  ];

  it('renders headers correctly', () => {
    const wrapper = mount(DataTable, {
      props: { headers, rows },
      global: {
        components: {
          Icon: {
            template: '<div />'
          },
          BaseButton: {
            template: '<button />'
          }
        }
      }
    });
    const headerElements = wrapper.findAll('th');
    expect(headerElements).toHaveLength(headers.length);
    headers.forEach((header, index) => {
      expect(headerElements[index].text()).toBe(header.label);
    });
  });

  it('renders rows correctly', () => {
    const wrapper = mount(DataTable, {
      props: { headers, rows },
      global: {
        components: {
          Icon: {
            template: '<div />'
          },
          BaseButton: {
            template: '<button />'
          }
        }
      }
    });
    const rowElements = wrapper.findAll('tbody tr');
    expect(rowElements).toHaveLength(rows.length);
    rows.forEach((row, rowIndex) => {
      const cellElements = rowElements[rowIndex].findAll('td');
      headers.forEach((header, colIndex) => {
        expect(cellElements[colIndex].text()).toBe(String(row[header.key]));
      });
    });
  });
});
