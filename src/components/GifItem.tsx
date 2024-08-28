import React from 'react';

interface GifProps {
  id: string;
  title: string;
  url: string;
}

/**
 * `GifItem` es un componente que representa una tarjeta visual para mostrar un GIF con su título.
 *
 * @component
 * @param {GifProps} props - Las propiedades necesarias para renderizar el componente.
 * @param {string} props.id - El identificador único del GIF.
 * @param {string} props.title - El título o descripción del GIF.
 * @param {string} props.url - La URL de la imagen del GIF.
 *
 * @example
 * // Uso básico de GifItem
 * <GifItem id="abc123" title="Sunset in the mountains" url="https://example.com/image.jpg" />
 *
 * @returns {JSX.Element} Un elemento `div` que contiene una imagen y su título.
 */

const GifItem = ({ title, url }: GifProps) => {
  return (
    <div>
      <div className="relative w-full h-0 pb-[100%] overflow-hidden rounded-lg bg-gray-200">
        <img
          src={url}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h4 className="mt-4 font-bold text-xl capitalize text-gray-700">
        {title}
      </h4>
    </div>
  );
};

export default GifItem;
