import React from 'react';
import useForm from '@/hooks/useForm';
import { Input } from './ui/input';

interface AddCategoryProps {
  onAddElement: (newCategory: string) => void;
}

/**
 * `AddCategory` es un componente funcional de React que permite al usuario ingresar una nueva categoría
 * mediante un formulario. Utiliza el hook personalizado `useForm` para manejar el estado del formulario
 * y la entrada de texto.
 *
 * @component
 *
 * @param {Object} props - Las propiedades que se pasan al componente.
 * @param {Function} props.onAddElement - Una función que se llama cuando se envía el formulario,
 * pasándole la nueva categoría como argumento.
 *
 * @returns {JSX.Element} Un formulario que contiene un campo de entrada de texto.
 *
 * @example
 * <AddCategory onAddElement={(newCategory) => console.log(newCategory)} />
 */

const AddCategory = ({ onAddElement }: AddCategoryProps) => {
  const { onSubmit, inputValue, onChangeInput } = useForm({ onAddElement });
  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="Buscar gifs"
        value={inputValue}
        onChange={onChangeInput}
      />
    </form>
  );
};

export default AddCategory;
