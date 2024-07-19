// import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFolders, createFolder } from "../api/folders";
import { FolderTree } from "../../types/services";

type HashMap = {
  [key: number]: FolderTree;
};

export function useFolderTree() {
  const queryClient = useQueryClient();

  const { status, data } = useQuery({
    queryKey: ["folderTree"],
    queryFn: getFolders,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const newFolderMutation = useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folderTree"] });
    },
  });

  const populateHashTable = (foldersInDb: FolderTree[]) => {
    const folderMap = new Map<number, FolderTree>();

    foldersInDb.forEach((folder) =>
      folderMap.set(Number(folder.id), { ...folder }),
    );

    return folderMap;
  };

  const populateDataTree = (
    foldersInDb: FolderTree[],
    folderMap: Map<number, FolderTree>,
  ) => {
    const dataTree: FolderTree[] = [];
    const hashTable = Object.fromEntries(structuredClone(folderMap));

    foldersInDb.forEach((folder) => {
      if (folder.parentId) {
        const parent = hashTable[folder.parentId];

        if (!parent.childNodes) {
          parent.childNodes = [] as FolderTree[];
        }

        parent.childNodes.push(hashTable[folder.id]);
      } else dataTree.push(hashTable[folder.id]);
    });

    return dataTree;
  };

  const foldersInDb = data ?? [];
  const folderMap = populateHashTable(foldersInDb);
  const folderTree = populateDataTree(foldersInDb, folderMap);

  return {
    status,
    folderTree,
    folderMap,
    newFolderMutation,
  };
}
