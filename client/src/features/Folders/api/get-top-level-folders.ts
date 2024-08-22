import { queryOptions, useQuery, QueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { NestedFolders } from '@/types/api';

export const getTopLevelFolders = (): Promise<NestedFolders[]> => {
  return api.get(`folders/top-level`);
};

export const getTopLevelFoldersQueryOptions = () => {
  return queryOptions({
    queryKey: ['top-level-folders'],
    queryFn: getTopLevelFolders,
  });
};

type UseTopLevelFoldersOptions = {
  queryConfig?: QueryConfig<typeof getTopLevelFoldersQueryOptions>;
};

export const topLevelFoldersLoader = (queryClient: QueryClient) => async () => {
  const query = getTopLevelFoldersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const useTopLevelFolders = ({
  queryConfig,
}: UseTopLevelFoldersOptions = {}) => {
  return useQuery({
    ...getTopLevelFoldersQueryOptions(),
    ...queryConfig,
  });
};
