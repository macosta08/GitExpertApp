import AddCategory from '../../src/components/AddCategory';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Pruebas en <AddCategory/>', () => {
  const inputValue = 'Saitana';

  test('debe de cambiar el valor de la caja de texto', () => {
    render(<AddCategory onAddElement={() => {}} />);

    const input = screen.getByRole('textbox') as HTMLInputElement; // Castear a HTMLInputElement

    fireEvent.input(input, { target: { value: inputValue } });

    expect(input.value).toBe(inputValue);
  });

  test('debe de llmar el onAddElement si el input tiene un valor', () => {
    const onAddElement = jest.fn();
    render(<AddCategory onAddElement={onAddElement} />);

    const input = screen.getByRole('textbox') as HTMLInputElement; // Castear a HTMLInputElement
    const form = screen.getByRole('form') as HTMLInputElement;

    fireEvent.input(input, { target: { value: inputValue } });
    screen.debug();
    fireEvent.submit(form);

    expect(input.value).toBe('');
    expect(onAddElement).toHaveBeenCalled(); // la función fue llamada
    expect(onAddElement).toHaveBeenCalledTimes(1); // cuantas veces fue llamada la función
    expect(onAddElement).toHaveBeenCalledWith(inputValue);
    screen.debug();
  });

  test('no debe llamar el onAddElement si el input tiene un valor vacio', () => {
    const onAddElement = jest.fn();
    render(<AddCategory onAddElement={onAddElement} />);

    const form = screen.getByRole('form') as HTMLInputElement;
    fireEvent.submit(form);

    expect(onAddElement).toHaveBeenCalledTimes(0);
    expect(onAddElement).not.toHaveBeenCalled(); // la función no fue llamada
  });
});
