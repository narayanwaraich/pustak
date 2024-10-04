import { useState, useEffect } from 'react';
import { getIDBQueryOptions, setIDBValueOf } from '@/lib/idb-keyval';
import { getAllBookmarksQueryOptions } from '../api/get-all-bookmarks';
import { getFolderBookmarksQueryOptions } from '../api/get-bookmarks-of-folder';
import { Bookmark } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const IDBKey = `bookmarks/branched`;

export const makeBranchedBookmarks = (bookmarks: Bookmark[]) => {
  const branchedBookmarks = Object.create(null);
  bookmarks.forEach(
    (bookmark) =>
      (branchedBookmarks[bookmark.parentId] = [
        ...(branchedBookmarks[bookmark.parentId] ?? []),
        bookmark,
      ]),
  );

  return branchedBookmarks;
};

// export const defaultId = "1";

export const useBookmarks = (folderId = '1') => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const idbQuery = useQuery({ ...getIDBQueryOptions(IDBKey) });

  const folderBookmarksQuery = useQuery({
    ...getFolderBookmarksQueryOptions(folderId),
    enabled: !idbQuery.data,
  });

  const allBookmarksQuery = useQuery({
    ...getAllBookmarksQueryOptions(),
    enabled: !!folderBookmarksQuery.data,
  });

  useEffect(() => {
    if (idbQuery.data) {
      setBookmarks(idbQuery.data[folderId]);
    } else {
      const folderBookmarks = folderBookmarksQuery.data;
      const allBookmarks = allBookmarksQuery.data;

      if (folderBookmarks && !allBookmarks) setBookmarks(folderBookmarks);
      if (allBookmarks) {
        const branchedBookmarks = makeBranchedBookmarks(allBookmarks);
        setIDBValueOf(IDBKey, branchedBookmarks);
        setBookmarks(branchedBookmarks[folderId]);
      }
    }
  }, [idbQuery.data, folderBookmarksQuery.data, allBookmarksQuery.data]);

  return {
    bookmarks,
    isLoading:
      idbQuery.isLoading ||
      folderBookmarksQuery.isLoading ||
      allBookmarksQuery.isLoading,
    isError:
      idbQuery.isError ||
      folderBookmarksQuery.isError ||
      allBookmarksQuery.isError,
  };
};
