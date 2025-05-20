import createApiClient from "../../../lib/axiosConfig";

const API_URL = import.meta.env.VITE_URL_BACKEND;
const apiClient = createApiClient(API_URL);


export const addTransactions = async (transaction) => {
  try {
    const response = await apiClient.post('', {
      amount: transaction.amount,
      business: transaction.business,
      tenpistaName: transaction.tenpistaName,
      transactionDate: transaction.transactionDate,
    });
    return response; 
  } catch (error) { 
    throw error;
  }
};

export const updateTransactions = async (transaction) => {
  try {
    const response = await apiClient.put('',
      {
        id: transaction.id,
        amount: transaction.amount,
        business: transaction.business,
        tenpistaName: transaction.tenpistaName,
        transactionDate: transaction.transactionDate
      })
    return response;
  } catch (error) {
    throw error;
  }
}

export const getTransactions = async (page = 0, size = 10, sortBy = 'id') => {
  try {
    const response = await apiClient.get('', {
      params: {
        page,
        size,
        sortBy
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const deleteTransactions = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};


