import axios from 'axios';

const createApiClient = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
  });

  instance.interceptors.response.use(
    (response) => {
      return {
        retcode: 0,
        message: response.data?.statusMsg || "Operación exitosa",
        data: response.data,
      }
    },
    (error) => {
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.errorMessage ||
        error.message;

      console.error("Error HTTP:", backendMessage);

      return Promise.resolve({
        retcode: 1,
        message: backendMessage || 'Error desconocido',
        errorDetails: {
          status: error.response?.status,
          path: error.response?.config?.url,
          raw: error.response?.data,
        },
      });
    }
  );

  return instance;
};

export default createApiClient;
