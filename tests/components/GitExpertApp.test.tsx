import { fireEvent, render, screen } from '@testing-library/react';
import GitExpertApp from '../../src/components/GitExpertApp';

describe('Prueba en GitExpertApp', () => {
  test('Debe renderizar el componente correctamente', () => {
    render(<GitExpertApp />);

    expect(screen.getByText('Git expert app')).toBeInTheDocument();
    expect(
      screen.getByText('Make your list of your favorite gifs.')
    ).toBeInTheDocument();
    expect(screen.getByText('Pokemon')).toBeInTheDocument();
  });

  test('Debe agregar una nueva categoría y mostrarla en la lista', () => {
    render(<GitExpertApp />);

    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');

    // Simular escribir una nueva categoría y enviar el formulario
    fireEvent.input(input, { target: { value: 'Dragon Ball' } });
    fireEvent.submit(form);

    // Verificar que la nueva categoría ha sido agregada
    expect(screen.getByText('Dragon Ball')).toBeInTheDocument();
  });

  test('No debe agregar categorías duplicadas', () => {
    render(<GitExpertApp />);

    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');

    // Intentar agregar la categoría 'Pokemon' nuevamente
    fireEvent.input(input, { target: { value: 'Pokemon' } });
    fireEvent.submit(form);

    // Verificar que la categoría no ha sido agregada otra vez
    const items = screen.getAllByText('Pokemon');
    expect(items.length).toBe(1);
  });
});
