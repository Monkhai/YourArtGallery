import APIClient from '../utilities/BASE_URL';
import { useQuery } from '@tanstack/react-query';

const apiClient = new APIClient('');

export interface Artist {
  name: string;
}

const useGetArtist = (artistLink: string = '', id: string | undefined) => {
  return useQuery<Artist, Error>({
    queryKey: ['artists', id],
    queryFn: () => apiClient.getArtist(artistLink),
    staleTime: 10 * 1000, //10s
  });
};

export default useGetArtist;
