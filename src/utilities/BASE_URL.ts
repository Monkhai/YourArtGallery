import axios from 'axios';
import { Artist } from '../hooks/useGetArtist';
import { Art } from '../hooks/useGetArtwork';

const instance = axios.create({
  baseURL: 'https://api.artsy.net/api/',
  timeout: 10000,
});

// Placeholder token
let token = '';
let tokenExpirationDate: number;

const getClientCredentials = async () => {
  const clientId = '70252995ceb28017ac70';
  const clientSecret = '5417609b7df7b3b2d94e48de648880e1';

  try {
    const response = await axios.post('https://api.artsy.net/api/tokens/xapp_token', {
      client_id: clientId,
      client_secret: clientSecret,
    });

    token = response.data.token;
    tokenExpirationDate = new Date(response.data.expires_at).getTime();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    if (!token || (tokenExpirationDate && Date.now() >= tokenExpirationDate))
      await getClientCredentials();

    // Set the header with the new token
    config.headers['X-Xapp-Token'] = token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface ArtworkResponse {
  total_count?: number | null;
  _embedded: {
    artworks: Art[];
  };
  _links: {
    next: {
      href: string;
    };
    self: {
      href: string;
    };
  };
}

interface Params {
  size?: number;
  cursor?: string;
}

class APIClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getArtist = (artistLink: string) => instance.get<Artist>(artistLink).then((res) => res.data);

  getArtwork = (params: Params = { size: 20 }) =>
    instance.get<ArtworkResponse>(this.endpoint, { params: params }).then((res) => res.data);
}

export { instance };
export default APIClient;
