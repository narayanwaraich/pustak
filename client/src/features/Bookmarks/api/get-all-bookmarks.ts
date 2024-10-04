import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Bookmark } from '@/types/api';

const URL = `bookmarks`;

export const getAllBookmarks = (): Promise<Bookmark[]> => {
  return api.get(URL);
};

export const getAllBookmarksQueryOptions = () => {
  return queryOptions({
    queryKey: [URL],
    queryFn: getAllBookmarks,
  });
};

type UseAllBookmarksOptions = {
  queryConfig?: QueryConfig<typeof getAllBookmarksQueryOptions>;
};

export const useAllBookmarks = ({
  queryConfig,
}: UseAllBookmarksOptions = {}) => {
  return useQuery({
    ...getAllBookmarksQueryOptions(),
    ...queryConfig,
  });
};
