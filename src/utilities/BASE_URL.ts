import axios from 'axios';

const getToken = async () => {
  const clientId = '70252995ceb28017ac70';
  const clientSecret = '5417609b7df7b3b2d94e48de648880e1';

  try {
    const response = await axios.post('https://api.artsy.net/api/tokens/xapp_token', {
      client_id: clientId,
      client_secret: clientSecret,
    });

    const token = response.data.token;

    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const instance = axios.create({
  baseURL: 'https://api.artsy.net/api/',
  timeout: 10000,
  headers: { 'X-Xapp-Token': '' }, // Placeholder, will be updated with the actual token
});

const initializeInstance = async () => {
  const token = await getToken();
  instance.defaults.headers['X-Xapp-Token'] = token;
};

initializeInstance().catch((error) => {
  console.error('Failed to initialize instance:', error);
});

export { instance };
