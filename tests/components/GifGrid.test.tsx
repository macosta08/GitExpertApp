import { render, screen } from '@testing-library/react';
import GifGrid from '../../src/components/GifGrid';
import useFetchGifs from '../../src/hooks/useFetchGifs';

jest.mock('../../src/hooks/useFetchGifs'); // Mockear useFetchGif con jest.mock para simular el hook

describe('Pruebas en <GifGrid />', () => {
  const category = 'One Punch';
  const mockUseFetchGifs = useFetchGifs as jest.Mock;

  // Verificación de LoadingCard cuando isLoading es true.
  // Verificación de los GIFs cargados.
  // Mostrar correctamente el título de la categoría.
  // Manejar el caso de no encontrar GIFs.
  // Verificación de accesibilidad (alt text).
  // Manejo de errores (si aplica).

  // beforeEach(() => {
  //   //  controlamos su comportamiento para que isLoading sea true
  //   mockUseFetchGifs.mockReturnValue({
  //     isLoading: true,
  //     images: [],
  //   });
  // });
  test('debe de mostrar el loading inicialmente', () => {
    // Mockear la respuesta del hook con el estado de carga
    mockUseFetchGifs.mockReturnValue({
      isLoading: true,
      images: [],
    });
    render(<GifGrid category={category} />);

    // Verifica que el componente LoadingCard se está renderizando 6 veces (según arrayLoading)
    const loadingCards = screen.getAllByLabelText('Loading'); // Busca todos los elementos que tengan el atributo aria-label="Loading", que es lo que define el componente LoadingCard para ser accesible.
    expect(loadingCards.length).toBe(6); // Verifica que se muestran 6 tarjetas de carga
  });

  test('debe de mostrar items cuando se cargan las imagenes useFetchGifs', () => {
    const gifs = [
      {
        id: 'ABC',
        title: 'Saitama',
        url: 'https://localhost/saitama.jpg',
      },
      {
        id: 'ABCDF',
        title: 'Pikachu',
        url: 'https://localhost/pikachu.jpg',
      },
    ];
    // Mockear la respuesta del hook con el estado de carga
    mockUseFetchGifs.mockReturnValue({
      isLoading: false,
      images: gifs,
    });
    render(<GifGrid category={category} />);
    screen.debug();
    expect(screen.getAllByRole('img').length).toBe(2);
    // Verificar que los componentes GifItem se renderizan con las imágenes
    gifs.forEach((gif) => {
      const gifItem = screen.getByText(gif.title);
      expect(gifItem).toBeInTheDocument();
    });
  });

  test('debe mostrar el título de la categoría', () => {
    mockUseFetchGifs.mockReturnValue({
      isLoading: true,
      images: [],
    });

    render(<GifGrid category={category} />);

    // Verificar que se muestra el título de la categoría
    expect(screen.getByText(category)).toBeInTheDocument();
  });

  test('debe manejar el caso cuando no se encuentran GIFs', () => {
    mockUseFetchGifs.mockReturnValue({
      isLoading: false,
      images: [],
    });

    render(<GifGrid category="Unknown" />);

    // Verificar que no se renderizan GIFs
    const gifItems = screen.queryAllByRole('img');
    expect(gifItems.length).toBe(0);
  });

  test('debe renderizar imágenes con descripciones accesibles', () => {
    const gifs = [
      { id: '1', title: 'Cat 1', url: 'http://example.com/cat1.gif' },
    ];

    mockUseFetchGifs.mockReturnValue({
      isLoading: false,
      images: gifs,
    });

    render(<GifGrid category="Cats" />);

    // Verificar que las imágenes tienen el atributo alt correcto
    const gifImage = screen.getByAltText(gifs[0].title);
    expect(gifImage).toHaveAttribute('src', gifs[0].url);
  });

  test('debe mostrar un mensaje de error si falla la carga de GIFs', () => {
    // Mockear el hook para devolver un error
    (useFetchGifs as jest.Mock).mockReturnValue({
      isLoading: false,
      images: [],
      error:
        'Error al cargar los GIFs. Por favor, inténtalo de nuevo más tarde.',
    });

    render(<GifGrid category="Cats" />);

    // Verificar que se muestra el mensaje de error
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Error al cargar los GIFs. Por favor, inténtalo de nuevo más tarde.'
    );
  });
});
