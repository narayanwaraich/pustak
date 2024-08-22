import { createContext, useState, useContext } from 'react';
import { ChildrenProp } from '../types/api';

type Value = {
  folderId: number;
  setFolderId: React.Dispatch<React.SetStateAction<number>>;
};

const SelectedFolderContext = createContext<Value | null>(null);

const SelectedFolderProvider = ({ children }: ChildrenProp) => {
  const [folderId, setFolderId] = useState(1);
  const value = { folderId, setFolderId };
  return (
    <SelectedFolderContext.Provider value={value}>
      {children}
    </SelectedFolderContext.Provider>
  );
};

const useSelectedFolder = () => {
  const context = useContext(SelectedFolderContext);
  if (context === null) {
    throw new Error('useSelectedFolder must be used within a CountProvider');
  }
  return context;
};

export { SelectedFolderProvider, useSelectedFolder };
