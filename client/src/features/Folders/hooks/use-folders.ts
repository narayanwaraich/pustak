import { useState, useEffect } from 'react';
import { getIDBQueryOptions, setIDBValueOf } from '@/lib/idb-keyval';
import { getAllFoldersQueryOptions } from '../api/get-all-folders';
import { getTopLevelFoldersQueryOptions } from '../api/get-top-level-folders';
import { NestedFolders } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const IDBKey = `folders/branched`;

export const makeFolders = (folders: NestedFolders[]) => {
  const hashTable = Object.create(null);
  folders.forEach((folder) => (hashTable[folder.id] = { ...folder }));

  const branchedFolders = <NestedFolders[]>[];

  folders.forEach((folder) => {
    if (folder.parentId) {
      if (!Object.hasOwn(hashTable[folder.parentId], 'Children'))
        hashTable[folder.parentId].Children = [];
      hashTable[folder.parentId].Children.push(hashTable[folder.id]);
    } else branchedFolders.push(hashTable[folder.id]);
  });
  return branchedFolders;
};

export const useFolders = () => {
  const [folders, setFolders] = useState<NestedFolders[]>([]);

  const idbQuery = useQuery({ ...getIDBQueryOptions(IDBKey) });

  const topFoldersQuery = useQuery({
    ...getTopLevelFoldersQueryOptions(),
    enabled: !idbQuery.data,
  });

  const allFoldersQuery = useQuery({
    ...getAllFoldersQueryOptions(),
    enabled: !!topFoldersQuery.data,
  });

  useEffect(() => {
    if (idbQuery.data) {
      setFolders(idbQuery.data);
    } else {
      const topFolders = topFoldersQuery.data;
      const allFolders = allFoldersQuery.data;

      if (topFolders && !allFolders) setFolders(topFolders);
      if (allFolders) {
        const branchedFolders = makeFolders(allFolders);
        setIDBValueOf(IDBKey, branchedFolders);
        setFolders(branchedFolders);
      }
    }
  }, [idbQuery.data, topFoldersQuery.data, allFoldersQuery.data]);

  return {
    folders,
    isLoading:
      idbQuery.isLoading ||
      topFoldersQuery.isLoading ||
      allFoldersQuery.isLoading,
    isError:
      idbQuery.isError || topFoldersQuery.isError || allFoldersQuery.isError,
  };
};
