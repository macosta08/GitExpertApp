import { render, screen } from '@testing-library/react';
import GifItem from '../../src/components/GifItem';

describe('Prueba a GifItem', () => {
  const title = 'Pikachu';
  const url =
    'https://media1.giphy.com/media/U2nN0ridM4lXy/giphy.gif?cid=3f1489d2cglbn6k3kljszmp47u58hm1fmr11b5dgdgpigw7a&ep=v1_gifs_search&rid=giphy.gif&ct=g';
  test('debe de hacer match con el snapshot', () => {
    const { container } = render(<GifItem title={title} url={url} />);
    expect(container).toMatchSnapshot();
  });
  test('debe de mostrar el titulo enviado por props', () => {
    const { getByText } = render(<GifItem title={title} url={url} />);
    expect(getByText(title)).toBeTruthy();
  });
  test('debe mostrar la imagen con el URL y el ALT indicado', () => {
    render(<GifItem title={title} url={url} />);
    screen.debug();
    // expect(screen.getByRole('img').src).toBe(url);
    const { src, alt } = screen.getByRole('img') as HTMLImageElement;
    expect(src).toBe(url);
    expect(alt).toBe(title);
  });
  test('debe mostras titulo', () => {
    render(<GifItem title={title} url={url} />);
    const titleElement = screen.getByText(title) as HTMLElement;
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);
  });
  test('debe renderizar los atributos de la imagen correctamente', () => {
    render(<GifItem title={title} url={url} />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', url);
    expect(imgElement).toHaveAttribute('alt', title);
  });
  test('image tiene el texto alt para la accesibilidad', () => {
    render(<GifItem title={title} url={url} />);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('alt', title);
  });
});
