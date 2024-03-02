import {
  InvalidateQueryFilters,
  MutationFunction,
  MutationKey,
  QueryFunction,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

export function useRequestProcessor() {
  const queryClient = useQueryClient();

  function query(key: QueryKey, queryFunction: QueryFunction, options = {}) {
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  }

  function useMutate(
    key: MutationKey,
    mutationFunction: MutationFunction,
    options: UseMutationOptions = {}
  ) {
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () =>
        queryClient.invalidateQueries(key as InvalidateQueryFilters),
      ...options,
    });
  }

  return { query, useMutate };
}
