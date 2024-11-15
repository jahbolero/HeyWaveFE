import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';

export const useOpportunities = (filters) => {
  return useQuery({
    queryKey: ['opportunities', filters],
    queryFn: () => api.getOpportunities(filters),
    keepPreviousData: true,
  });
};

export const useOpportunity = (id) => {
  return useQuery({
    queryKey: ['opportunity', id],
    queryFn: () => api.getOpportunityById(id),
    enabled: !!id,
  });
};

export const usePlaceBid = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bidData) => api.placeBid(bidData),
    onSuccess: () => {
      queryClient.invalidateQueries(['opportunities']);
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  });
}; 