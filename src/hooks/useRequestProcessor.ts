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
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  InfiniteData,
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

  function useInfinite<TData, TError = any, TPageParam = unknown>(
    queryFunction: QueryFunction<AxiosResponse<TData>, QueryKey, TPageParam>,
    options: UseInfiniteQueryOptions<
      AxiosResponse<TData>,
      AxiosError<TError>,
      InfiniteData<AxiosResponse<TData>, TPageParam>,
      AxiosResponse<TData>,
      QueryKey,
      TPageParam
    >
  ) {
    return useInfiniteQuery<
      AxiosResponse<TData>,
      AxiosError<TError>,
      InfiniteData<AxiosResponse<TData>, TPageParam>,
      QueryKey,
      TPageParam
    >({
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
    invalidateQueryKeys?: QueryKey
  ) {
    return useMutation<AxiosResponse<TData>, AxiosError<TError>, TVar>({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () =>
        invalidateQueryKeys !== undefined &&
        invalidateQueryKeys.forEach((queryKey) => {
          queryClient.invalidateQueries({
            queryKey: [queryKey],
          });
        }),
      ...options,
    });
  }

  return { query, useInfinite, useMutate };
}
