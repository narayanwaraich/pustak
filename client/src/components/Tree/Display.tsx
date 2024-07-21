import { FolderTree } from "../../types/services";
import "./style.css";
import { useSelectedFolder } from "../../services/state/SelectedFolderContext";
import Accordian from "./Accordian";

const DisplayTree = ({ tree }: { tree: FolderTree[] }) => {
  const { setFolderId } = useSelectedFolder();

  const builtTree: React.ReactNode[] = [];

  const buildTree = (tree: FolderTree[], depth: number = 0) => {
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
        buildTree(element.childNodes as FolderTree[], nestedDepth);
      }
    }
  };

  buildTree(tree);

  return (
    <ul className="-mx-2">
      {tree.map((folder) => {
        if (folder.type === "folder")
          return (
            <li>
              <Accordian title={folder.title} key={folder.id}>
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
            </li>
          );
      })}
      {/* <div className="tree">{builtTree}</div> */}
    </ul>
  );
};

export default DisplayTree;
