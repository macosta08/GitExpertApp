import { getGifs } from '@/helpers/getGifs';
import { useEffect, useState } from 'react';

interface GifGridProps {
  category: string;
}

interface GetGifProps {
  id: string;
  title: string;
  url: string;
}

const useFetchGifs = ({ category }: GifGridProps) => {
  const [images, setImages] = useState<[GetGifProps] | []>([]);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const getImages = async () => {
    try {
      const newImages = await getGifs(category);
      setImages(newImages);
    } catch {
      setError(
        'Error al cargar los GIFs. Por favor, inténtalo de nuevo más tarde.'
      );
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    getImages();
  }, []);

  return {
    images,
    isLoading,
    error,
  };
};

export default useFetchGifs;
