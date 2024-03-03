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
import { AxiosError, AxiosResponse } from "axios";

export function useRequestProcessor() {
  const queryClient = useQueryClient();

  function query<TData, TError = any>(
    key: QueryKey,
    queryFunction: QueryFunction<AxiosResponse<TData>>,
    options = {}
  ) {
    return useQuery<AxiosResponse<TData>, AxiosError<TError>>({
      queryKey: key,
      queryFn: queryFunction,
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
