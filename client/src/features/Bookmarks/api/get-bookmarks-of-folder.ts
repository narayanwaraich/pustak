import { queryOptions, useQuery, QueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Bookmark } from '@/types/api';

type getBookmarksProps = { folderId: string };

export const getBookmarks = ({
  folderId,
}: getBookmarksProps): Promise<Bookmark[]> => {
  return api.get(`bookmarks/folder/${folderId}`);
};

export const getFolderBookmarksQueryOptions = (folderId: string) => {
  return queryOptions({
    queryKey: ['bookmarks', folderId],
    queryFn: () => getBookmarks({ folderId }),
  });
};

type UseBookmarksOptions = {
  folderId: string;
  queryConfig?: QueryConfig<typeof getFolderBookmarksQueryOptions>;
};

export const useFolderBookmarks = ({
  folderId,
  queryConfig,
}: UseBookmarksOptions) => {
  return useQuery({
    ...getFolderBookmarksQueryOptions(folderId),
    ...queryConfig,
  });
};

export const defaultId = '1';

export const bookmarksLoader =
  (queryClient: QueryClient, folderId: string | undefined) => async () => {
    folderId ??= defaultId;
    const query = getFolderBookmarksQueryOptions(folderId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
