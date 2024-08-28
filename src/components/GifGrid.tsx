import React from 'react';
import useFetchGifs from '@/hooks/useFetchGifs';
import LoadingCard from './LoadingCard';
import GifItem from './GifItem';

interface GifGridProps {
  category: string;
}

interface GetGifProps {
  id: string;
  title: string;
  url: string;
}

/**
 * `GifGrid` es un componente que muestra una cuadrícula de GIFs basada en una categoría proporcionada.
 * Mientras las imágenes se están cargando, muestra un conjunto de tarjetas de carga.
 *
 * @component
 * @param {GifGridProps} props - Las propiedades necesarias para renderizar el componente.
 * @param {string} props.category - La categoría de GIFs que se desea mostrar.
 *
 * @example
 * // Uso básico de GifGrid
 * <GifGrid category="Cats" />
 *
 * @returns {JSX.Element} Un elemento `div` que contiene el título de la categoría y una cuadrícula de GIFs o tarjetas de carga.
 */

const GifGrid = ({ category }: GifGridProps) => {
  const { isLoading, images } = useFetchGifs({ category });
  const arrayLoading = Array(6).fill('');
  return (
    <div className="py-6">
      <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-10 py-2 border-b border-gray-500">
        {category}
      </h3>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {isLoading ? (
          <>
            {arrayLoading.map((_, idx) => (
              <LoadingCard key={idx} />
            ))}
          </>
        ) : (
          <>
            {images?.map((img: GetGifProps) => (
              <GifItem key={img?.id} {...img} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default GifGrid;
