import { FolderTree } from "../../types/services";
import "./style.css";

const DisplayTree = ({ tree }: { tree: FolderTree[] }) => {
  // const builtTree: JSX.Element[] = [];
  const builtTree: React.ReactNode[] = [];

  const buildTree = (tree: FolderTree[], depth: number = 0) => {
    for (const element of tree) {
      if (element.type === "folder") {
        const content = element.title;
        const spacing = content.length + depth * 2;
        builtTree.push(<p key={element.id}>{content.padStart(spacing)}</p>);
      }
      if ("childNodes" in element) {
        const nestedDepth = depth + 2;
        buildTree(element.childNodes as FolderTree[], nestedDepth);
      }
    }
  };

  buildTree(tree);

  return <>{<div className="tree">{builtTree}</div>}</>;
};

export default DisplayTree;
