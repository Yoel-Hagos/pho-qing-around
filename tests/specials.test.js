import { fetchSpecials } from '../js/specials.js';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ specials: [] }),
  })
);

test('fetchSpecials returns specials', async () => {
  const specials = await fetchSpecials();
  expect(specials).toEqual([]);
});

test('fetchSpecials handles fetch errors', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.reject('API is down')
  );
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  await fetchSpecials();
  expect(consoleSpy).toHaveBeenCalledWith('Error fetching specials:', 'API is down');
  consoleSpy.mockRestore();
});
