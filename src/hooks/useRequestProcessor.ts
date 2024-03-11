import {
  MutationFunction,
  MutationKey,
  QueryFunction,
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  UseQueryOptions,
  QueryKey,
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
      staleTime: Infinity,
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
    > = {},
    invalidateQueryKey?: QueryKey
  ) {
    return useMutation<AxiosResponse<TData>, AxiosError<TError>, TVar>({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () =>
        invalidateQueryKey !== undefined &&
        queryClient.invalidateQueries({
          queryKey: invalidateQueryKey,
        }),
      ...options,
    });
  }

  return { query, useMutate };
}
