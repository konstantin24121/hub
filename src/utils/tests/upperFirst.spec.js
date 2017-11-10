import upperFirst from '../upperFirst';

test('Should uppercase first charachter', () => {
  expect(upperFirst('test')).toBe('Test');
});
