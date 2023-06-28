import { useInfiniteQuery } from '@tanstack/react-query';
import APIClient, { ArtworkResponse } from '../utilities/BASE_URL';

const apiClient = new APIClient('artworks');

export interface ArtworkQuery {
  size: number;
  cursor?: string;
}

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

const useGetArtwork = () => {
  return useInfiniteQuery<ArtworkResponse, Error, ArtworkResponse>({
    queryKey: ['artworks'],
    queryFn: ({ pageParam }) => {
      if (pageParam) return apiClient.getArtwork({ size: 20, cursor: pageParam });
      return apiClient.getArtwork({ size: 20 });
    },
    getNextPageParam: (lastPage) => {
      const nextLink = new URL(lastPage._links.next.href);
      const params = new URLSearchParams(nextLink.search);
      return params.get('cursor');
    },
    onError: (error) => error,
  });
};

export default useGetArtwork;
