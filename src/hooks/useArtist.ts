import { useState, useEffect } from 'react';
import { instance } from '../utilities/BASE_URL';

interface Artist {
  name: string;
}

const useArtist = (artistLink: string | undefined, id: string | undefined) => {
  const [artist, setArtist] = useState<Artist>();

  useEffect(() => {
    const fetchArtist = async () => {
      if (artistLink) {
        try {
          const response = await instance.get(artistLink);
          setArtist(response.data._embedded.artists[0]);
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (artistLink) fetchArtist();
  }, [id]);
  return artist;
};

export default useArtist;
