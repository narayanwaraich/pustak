import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { NestedFolders } from '@/types/api';

const URL = `folders`;

export const getAllFolders = (): Promise<NestedFolders[]> => {
  return api.get(URL);
};

export const getAllFoldersQueryOptions = () => {
  return queryOptions({
    queryKey: [URL],
    queryFn: getAllFolders,
  });
};

type UseAllFoldersOptions = {
  queryConfig?: QueryConfig<typeof getAllFoldersQueryOptions>;
};

export const useAllFolders = ({ queryConfig }: UseAllFoldersOptions = {}) => {
  return useQuery({
    ...getAllFoldersQueryOptions(),
    ...queryConfig,
  });
};
