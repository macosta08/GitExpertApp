export const getGifs = async (category: string) => {
  const apiKey = import.meta.env.VITE_KEY_API_GIF;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${category}&limit=${9}`;
  const resp = await fetch(url);
  const { data } = await resp.json();
  const gifData = data?.map(
    (git: {
      id: string;
      title: string;
      images: { downsized_medium: { url: string } };
    }) => ({
      id: git?.id,
      title: git?.title,
      url: git?.images?.downsized_medium?.url,
    })
  );
  return gifData;
};
