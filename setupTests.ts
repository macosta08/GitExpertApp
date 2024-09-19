import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

beforeAll(() => {
  process.env.VITE_KEY_API_GIF = 'test-api-key';
  fetchMock.enableMocks();
  // Simular una respuesta exitosa con datos JSON válidos
  fetchMock.mockResponseOnce(
    JSON.stringify({
      data: [
        {
          id: '1',
          title: 'Gif 1',
          images: { downsized_medium: { url: 'https://example.com/gif1.gif' } },
        },
        {
          id: '2',
          title: 'Gif 2',
          images: { downsized_medium: { url: 'https://example.com/gif2.gif' } },
        },
      ],
    })
  );
});
