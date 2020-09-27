import Product from '../Product';

test('проверка создания объекта нового товара', () => {
  const received = new Product('Фен', '500');
  const expected = { name: 'Фен', cost: 500 };
  expect(received).toEqual(expected);
});
