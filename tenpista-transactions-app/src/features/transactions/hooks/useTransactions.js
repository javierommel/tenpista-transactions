import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTransactions,
  addTransactions,
  updateTransactions,
  deleteTransactions,
} from '../services/transactionService';

export const useTransactions = ({ page = 0, size = 10 } = {}) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['transactions', { page, size }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return getTransactions(params.page, params.size);
    },
    staleTime: 1000 * 60, 
  });

  const createMutation = useMutation({
    mutationFn: addTransactions,
    onSuccess: () => queryClient.invalidateQueries(['transactions']),
  });

  const updateMutation = useMutation({
    mutationFn: updateTransactions,
    onSuccess: () => queryClient.invalidateQueries(['transactions']),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTransactions,
    onSuccess: () => queryClient.invalidateQueries(['transactions']),
  });

  return {
    ...query,
    addTransactions: createMutation.mutateAsync,
    updateTransactions: updateMutation.mutateAsync,
    deleteTransactions: deleteMutation.mutateAsync,
  };
};
