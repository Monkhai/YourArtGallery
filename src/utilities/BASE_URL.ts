import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.artsy.net/api/',
  timeout: 10000,
});

// Placeholder token
let token = '';

const getClientCredentials = async () => {
  const clientId = '70252995ceb28017ac70';
  const clientSecret = '5417609b7df7b3b2d94e48de648880e1';

  try {
    const response = await axios.post('https://api.artsy.net/api/tokens/xapp_token', {
      client_id: clientId,
      client_secret: clientSecret,
    });

    token = response.data.token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Get initial token
getClientCredentials();

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    // Get a new token before each request
    await getClientCredentials();

    // Set the header with the new token
    config.headers['X-Xapp-Token'] = token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance };
