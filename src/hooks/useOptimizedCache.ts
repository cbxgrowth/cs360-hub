
import { useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useOptimizedCache = () => {
  const queryClient = useQueryClient();

  const invalidateQueries = useCallback((queryKeys: string[]) => {
    queryKeys.forEach(key => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });
  }, [queryClient]);

  const prefetchData = useCallback((queryKey: string, queryFn: () => Promise<any>) => {
    queryClient.prefetchQuery({
      queryKey: [queryKey],
      queryFn,
      staleTime: 5 * 60 * 1000, // 5 minutos
    });
  }, [queryClient]);

  const getCachedData = useCallback((queryKey: string) => {
    return queryClient.getQueryData([queryKey]);
  }, [queryClient]);

  const clearCache = useCallback(() => {
    queryClient.clear();
  }, [queryClient]);

  const getCacheStats = useMemo(() => {
    const queries = queryClient.getQueryCache().getAll();
    return {
      totalQueries: queries.length,
      staleQueries: queries.filter(q => q.isStale()).length,
      activeQueries: queries.filter(q => q.observers.length > 0).length,
    };
  }, [queryClient]);

  return {
    invalidateQueries,
    prefetchData,
    getCachedData,
    clearCache,
    getCacheStats
  };
};
