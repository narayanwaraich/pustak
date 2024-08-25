import { queryOptions, useQuery, QueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Bookmark } from '@/types/api';

type getBookmarksProps = { bookmarkId: string };
export const getBookmarks = ({
  bookmarkId,
}: getBookmarksProps): Promise<Bookmark[]> => {
  return api.get(`bookmarks/folder/${bookmarkId}`);
};

export const getBookmarksQueryOptions = (bookmarkId: string) => {
  return queryOptions({
    queryKey: ['bookmarks', bookmarkId],
    queryFn: () => getBookmarks({ bookmarkId }),
  });
};

type UseBookmarksOptions = {
  bookmarkId: string;
  queryConfig?: QueryConfig<typeof getBookmarksQueryOptions>;
};

export const useBookmarks = ({
  bookmarkId,
  queryConfig,
}: UseBookmarksOptions) => {
  return useQuery({
    ...getBookmarksQueryOptions(bookmarkId),
    ...queryConfig,
  });
};

export const defaultId = 1;

export const bookmarksLoader =
  (queryClient: QueryClient, bookmarkId: string | undefined) => async () => {
    bookmarkId ??= defaultId.toString();
    const query = getBookmarksQueryOptions(bookmarkId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
