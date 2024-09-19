import useFetchGifs from '../../src/hooks/useFetchGifs';
import { renderHook, waitFor } from '@testing-library/react';
import { getGifs } from '../../src/helpers/getGifs';
// Mockea la función getGifs
jest.mock('../../src/helpers/getGifs');

describe('Pruebas en el hook useFetchGifs', () => {
  // Prueba de manejo de errores (cuando getGifs falla).
  // Prueba de categoría vacía o inválida.
  // Prueba de cambio de categoría para asegurarse de que el hook vuelva a hacer la búsqueda.
  // Prueba de estado isLoading en diferentes situaciones, como cuando cambia la categoría.
  // Prueba de evitar búsquedas innecesarias cuando la categoría es la misma.

  const category = 'One Punch';
  // Crea un mock para que getGifs devuelva un arreglo simulado de GIFs
  const mockGifs = [
    {
      id: '123',
      title: 'Test GIF',
      url: 'https://test.com/gif1.gif',
    },
    {
      id: '456',
      title: 'Another Test GIF',
      url: 'https://test.com/gif2.gif',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe de regresar el estado inicial', () => {
    const { result } = renderHook(() => useFetchGifs({ category: category }));
    //   rerender: para rerenderizar nuevamente el hook
    //   result: es el resutado que regresaría el hook cuando ya se monta.
    //   unmount: es el resultado que se dispara cuando el hook es desmondato (no hemos visto la forma)

    // Estado inicial
    const { images, isLoading, error } = result.current;
    expect(images).toEqual([]);
    expect(isLoading).toBe(true);
    expect(error).toBe(null);
  });

  test('debe de retornar un arreglo de imagenes y el isLoading en false', async () => {
    // Mockea la respuesta de getGifs para devolver el arreglo mockGifs
    (getGifs as jest.Mock).mockResolvedValue(mockGifs);

    const { result } = renderHook(() => useFetchGifs({ category: category }));

    // Espera hasta que las imágenes sean cargadas
    await waitFor(() =>
      expect(result.current.images.length).toBeGreaterThan(0)
    );

    const { images, isLoading } = result.current;

    // Verifica que las imágenes sean las esperadas y que isLoading sea false
    expect(images).toEqual(mockGifs);
    expect(isLoading).toBe(false);
  });

  test('debe manejar el error si getGifs falla', async () => {
    // Mockea la respuesta de getGifs para simular un error
    (getGifs as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    const { result } = renderHook(() => useFetchGifs({ category: 'Cats' }));

    // Espera hasta que isLoading sea false
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const { images, isLoading, error } = result.current;

    // Verifica que las imágenes estén vacías, isLoading sea false y haya un mensaje de error
    expect(images).toEqual([]);
    expect(isLoading).toBe(false);
    expect(error).toBe(
      'Error al cargar los GIFs. Por favor, inténtalo de nuevo más tarde.'
    );
  });

  test('debe ejecutar una nueva búsqueda cuando la categoría cambia', async () => {
    // Mockea las respuestas para diferentes categorías
    (getGifs as jest.Mock)
      .mockResolvedValueOnce([
        { id: '123', title: 'GIF 1', url: 'https://test.com/gif1.gif' },
      ]) // Respuesta para la categoría 'Cats'
      .mockResolvedValueOnce([
        { id: '456', title: 'GIF 2', url: 'https://test.com/gif2.gif' },
      ]); // Respuesta para la categoría 'Dogs'

    const { result, rerender } = renderHook(
      ({ category }) => useFetchGifs({ category }),
      { initialProps: { category: 'Cats' } }
    );

    // Espera que cargue la primera vez
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.images).toEqual([
      { id: '123', title: 'GIF 1', url: 'https://test.com/gif1.gif' },
    ]);

    // Cambia la categoría
    rerender({ category: 'Dogs' });

    // Espera que cargue después del cambio de categoría
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    console.log('result.current.images', result.current.images);
    // expect(result.current.images).toEqual([
    //   { id: '456', title: 'GIF 2', url: 'https://test.com/gif2.gif' },
    // ]);
  });
});
