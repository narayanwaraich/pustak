import { useState, useEffect } from 'react';
import { getIDBValueOf, setIDBValueOf } from '@/lib/idb-keyval';
import { useAllFolders } from '../api/get-all-folders';
import { useTopLevelFolders } from '../api/get-top-level-folders';
import { NestedFolders } from '@/types/api';

const IDBKey = `folders`;

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
  setIDBValueOf(IDBKey, branchedFolders);
  return branchedFolders;
};

export const useFolders = () => {
  const [folders, setFolders] = useState<NestedFolders[]>([]);
  const [topEnabled, setTopEnabled] = useState(false);
  const [allEnabled, setAllEnabled] = useState(false);

  const topFolders = useTopLevelFolders({
    queryConfig: { enabled: topEnabled },
  });
  const allFolders = useAllFolders({
    queryConfig: { enabled: allEnabled },
  });

  useEffect(() => {
    const fetchData = async () => {
      const idbFolders = await getIDBValueOf(IDBKey);

      if (idbFolders) setFolders(idbFolders);
      else setTopEnabled(true);
      console.log(idbFolders);

      if (topFolders.isSuccess) {
        setFolders(topFolders.data);
        console.log(topFolders.data);
        setAllEnabled(true);
      }

      if (allFolders.isSuccess) {
        const branchedFolders = makeFolders(allFolders.data);
        console.log(branchedFolders);
        setFolders(branchedFolders);
      }
    };

    fetchData();
  }, []);

  return folders;
};
