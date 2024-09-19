import { useState } from 'react';
import AddCategory from './AddCategory';
import GifGrid from './GifGrid';

/**
 * `GitExpertApp` es el componente principal de la aplicación que permite a los usuarios agregar
 * y visualizar una lista de categorías de GIFs. Cada categoría añadida por el usuario se muestra
 * con una cuadrícula de GIFs correspondientes.
 *
 * @component
 * 
 *   
   * Función 'onAddCategory' que se llama cuando se agrega una nueva categoría.
   * Si la categoría ya existe, no se agrega nuevamente.
   *
   * @param {string} newCategory - La nueva categoría que se va a agregar.
   
 *
 * @example
 * // Uso básico de GitExpertApp
 * <GitExpertApp />
 *
 * @returns {JSX.Element} Un contenedor principal que permite agregar categorías y muestra los GIFs de cada categoría.
 */

const GitExpertApp = () => {
  // Estado que mantiene la lista de categorías. Inicialmente, contiene 'Pokemon'.
  const [category, setCategory] = useState(['Pokemon']);

  const onAddCategory = (newCategory: string) => {
    if (category.includes(newCategory)) return;
    setCategory([newCategory, ...category]);
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto pb-16 flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Git expert app
          </h2>
          <p className="text-lg font-semibold leading-8 text-gray-500">
            Make your list of your favorite gifs.
          </p>
          <AddCategory onAddElement={onAddCategory} />
        </div>
        <div>
          {category.map((cate) => (
            <GifGrid key={cate} category={cate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitExpertApp;
