import { createContext, useState, useContext } from "react";

type SelectedFolderProviderProps = { children: React.ReactNode };

const SelectedFolderContext = createContext<
  | { state: number; setState: React.Dispatch<React.SetStateAction<number>> }
  | undefined
>(undefined);

const SelectedFolderProvider = ({ children }: SelectedFolderProviderProps) => {
  const [state, setState] = useState(1);
  const value = { state, setState };
  return (
    <SelectedFolderContext.Provider value={value}>
      {children}
    </SelectedFolderContext.Provider>
  );
};

const useSelectedFolder = () => {
  const context = useContext(SelectedFolderContext);
  if (context === undefined) {
    throw new Error("useSelectedFolder must be used within a CountProvider");
  }
  return context;
};

export { SelectedFolderProvider, useSelectedFolder };
