// import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFolders, createFolder } from "../services/api/folders";
import { FolderTree } from "../types/services";

type HashMap = {
  [key: string]: FolderTree;
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

  let folderTree: FolderTree[] = [];
  let hashMap = new Map();

  const populateHashTable = (dataset: FolderTree[]) => {
    const hashTable = Object.create(null);
    dataset.forEach((element) => (hashTable[element.id] = { ...element }));
    return hashTable;
  };

  const populateDataTree = (dataset: FolderTree[], hashTable: HashMap) => {
    const dataTree: FolderTree[] = [];
    dataset.forEach((element) => {
      if (element.parentId) {
        const parent = hashTable[element.parentId];
        if (!parent.childNodes) {
          parent.childNodes = [] as FolderTree[];
        }
        parent.childNodes.push(hashTable[element.id]);
      } else dataTree.push(hashTable[element.id]);
    });

    return dataTree;
  };

  if (status === "success" && data) {
    const foldersInDb = data;
    const hashTable = populateHashTable(foldersInDb);
    hashMap = new Map(Object.entries(hashTable));
    folderTree = populateDataTree(foldersInDb, hashTable);
  }

  return {
    status,
    folderTree,
    hashMap,
    newFolderMutation,
  };
}
