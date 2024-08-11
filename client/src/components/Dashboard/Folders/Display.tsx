import { Folder, FolderTree } from "../../../types/services";
import "./style.css";
import { useSelectedFolder } from "../../../services/selectedFolder";
import Accordian from "./Accordian";

const DisplayTree = ({ tree }: { tree: FolderTree[] }) => {
  const { setFolderId } = useSelectedFolder();

  const loneFolder = (folder: Folder) => {
    return (
      <li key={folder.id}>
        <button className="ml-8 flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50">
          <span onClick={() => setFolderId(folder.id)}>{folder.title}</span>
        </button>
      </li>
    );
  };

  const nestedFolder = (folder: FolderTree) => {
    return (
      <li key={folder.id}>
        <Accordian title={folder.title} id={folder.id}>
          <ul className="mt-1 px-2">
            {buildTree(folder.childNodes as FolderTree[])}
          </ul>
        </Accordian>
      </li>
    );
  };

  const buildTree = (tree: FolderTree[]) => {
    const builtTree: React.ReactNode[] = [];
    for (const folder of tree) {
      if (folder.type === "folder") {
        if ("childNodes" in folder) builtTree.push(nestedFolder(folder));
        else builtTree.push(loneFolder(folder));
      }
    }
    return builtTree;
  };

  return <ul className="-mx-2">{buildTree(tree)}</ul>;
};

export default DisplayTree;
