import {
  InvalidateQueryFilters,
  MutationFunction,
  MutationKey,
  QueryFunction,
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export function useRequestProcessor() {
  const queryClient = useQueryClient();

  function query<TData, TError = any>(
    queryFunction: QueryFunction<AxiosResponse<TData>>,
    options: UseQueryOptions<AxiosResponse<TData>, AxiosError<TError>>
  ) {
    return useQuery<AxiosResponse<TData>, AxiosError<TError>>({
      queryFn: queryFunction,
      staleTime: 1000,
      ...options,
    });
  }

  function useMutate<TData, TVar = void, TError = any>(
    key: MutationKey,
    mutationFunction: MutationFunction<AxiosResponse<TData>, TVar>,
    options: UseMutationOptions<
      AxiosResponse<TData>,
      AxiosError<TError>,
      TVar
    > = {}
  ) {
    return useMutation<AxiosResponse<TData>, AxiosError<TError>, TVar>({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () =>
        queryClient.invalidateQueries(key as InvalidateQueryFilters),
      ...options,
    });
  }

  return { query, useMutate };
}
