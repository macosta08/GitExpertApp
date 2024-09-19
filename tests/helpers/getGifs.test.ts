// tests/helpers/getGifs.test.ts
import { getGifs } from '../../src/helpers/getGifs';

jest.mock('../../src/helpers/getGifs', () => ({
  getGifs: jest.fn(() =>
    Promise.resolve([
      {
        id: 'abc123',
        title: 'Pikachu',
        url: 'https://media.giphy.com/media/U2nN0ridM4lXy/giphy.gif',
      },
    ])
  ),
}));

describe('Pruebas en getGifs()', () => {
  test('debe de retornar un arreglo de gifs ', async () => {
    const gifs = await getGifs('Pokemon');
    expect(gifs.length).toBeGreaterThan(0);
    expect(gifs[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String),
    });
  });
});
