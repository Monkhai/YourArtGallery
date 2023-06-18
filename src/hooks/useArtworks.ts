import { useState, useEffect } from 'react';
import { instance } from '../utilities/BASE_URL';

export interface Art {
  name: string;
  title: string;
  category: string;
  medium: string;
  date: string;
  slug: string;
  _links: {
    [key: string]: {
      href: string;
    };
  };
  id: string;
  description?: string;
}

const useArtwork = (query: string) => {
  const [art, setArt] = useState<Art[]>();
  useEffect(() => {
    instance
      .get('artworks', { params: { size: 20 } })
      .then((response) => {
        setArt(response.data._embedded.artworks);
      })
      .catch((err) => console.log(err));
  }, [query]);
  return art;
};
export default useArtwork;
