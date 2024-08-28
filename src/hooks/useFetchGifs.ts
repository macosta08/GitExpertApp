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
  const getImages = async () => {
    const newImages = await getGifs(category);

    setImages(newImages);
    setisLoading(false);
  };
  useEffect(() => {
    getImages();
  }, []);

  return {
    images,
    isLoading,
  };
};

export default useFetchGifs;
