import { FolderTree } from "../../types/services";
import "./style.css";
import { useSelectedFolder } from "../../services/state/SelectedFolderContext";
import Accordian from "./Accordian";

const DisplayTree = ({ tree }: { tree: FolderTree[] }) => {
  const { setFolderId } = useSelectedFolder();

  const builtTree: React.ReactNode[] = [];

  const buildTree1 = (tree: FolderTree[], depth: number = 0) => {
    for (const element of tree) {
      if (element.type === "folder") {
        const content = element.title;
        const spacing = content.length + depth * 2;
        if (element.parentId === null)
          // console.log("Top level Headings are: ", element.title);
          builtTree.push(
            <p key={element.id} onClick={() => setFolderId(Number(element.id))}>
              {content.padStart(spacing)}
            </p>,
          );
      }
      if ("childNodes" in element) {
        const nestedDepth = depth + 2;
        buildTree1(element.childNodes as FolderTree[], nestedDepth);
      }
    }
  };

  const buildTree = (tree: FolderTree[]) => {
    const builtTree: React.ReactNode[] = [];
    for (const folder of tree) {
      if (folder.type === "folder") {
        if ("childNodes" in folder) {
          builtTree.push(
            <li key={folder.id}>
              <Accordian title={folder.title} id={folder.id}>
                <ul className="mt-1 px-2">
                  {buildTree(folder.childNodes as FolderTree[])}
                </ul>
              </Accordian>
            </li>,
          );
        } else {
          builtTree.push(
            <li key={folder.id}>
              <button className="ml-8 flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50">
                <span onClick={() => setFolderId(folder.id)}>
                  {folder.title}
                </span>
              </button>
            </li>,
          );
        }
      }
    }
    return builtTree;
  };

  buildTree1(tree);

  return (
    <ul className="-mx-2">
      {/* {tree.map((folder) => {
        if (folder.type === "folder")
          return (
            <li key={folder.id}>
              {"childNodes" in folder ? (
                <Accordian title={folder.title} id={folder.id}>
                  <ul className="mt-1 px-2">
                    <li>
                      <a
                        className="block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-gray-700"
                        href="#"
                      >
                        Lorem Ipsum
                      </a>
                    </li>
                  </ul>
                </Accordian>
              ) : (
                <button className="ml-8 flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50">
                  <span onClick={() => setFolderId(folder.id)}>
                    {folder.title}
                  </span>
                </button>
              )}
            </li>
          );
      })} */}
      {buildTree(tree)}
    </ul>
  );
};

export default DisplayTree;
