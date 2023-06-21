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

const useArtwork = () => {
  const [art, setArt] = useState<Art[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getArtworks();
  }, []);

  const getArtworks = () => {
    instance
      .get('artworks', { params: { size: 20, page } })
      .then((response) => {
        setArt((prevArt) => [...prevArt, ...response.data._embedded.artworks]);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((err) => console.log(err));
  };

  return { art, loadMore: getArtworks };
};

export default useArtwork;
