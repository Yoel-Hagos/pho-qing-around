import { toggleFavorite } from '../js/menu.js';

test('add to favorites', () => {
  const favorites = [];
  toggleFavorite(favorites, 'Pho');
  expect(favorites).toContain('Pho');
});

test('remove from favorites', () => {
  const favorites = ['Pho'];
  toggleFavorite(favorites, 'Pho');
  expect(favorites).not.toContain('Pho');
});
