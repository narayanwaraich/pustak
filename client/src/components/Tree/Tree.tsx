import DisplayTree from "./Display";
import { useFolderTree } from "../../services/query/useFolderTree";

const Tree = () => {
  const { status, folderTree, newFolderMutation } = useFolderTree();

  const addFolder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = event.currentTarget.value;
    event.currentTarget.value = "";
    newFolderMutation.mutate({ title });
  };

  if (status === "pending") {
    return <div>loading data ... </div>;
  }

  return (
    <>
      {/* <form onSubmit={addFolder}>
        <input name="title" />
        <button type="submit">add</button>
      </form> */}
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7" role="list">
          <li>
            <DisplayTree tree={folderTree} />
          </li>
          <li>{/* Other menu @ the bottom */}</li>
        </ul>
      </nav>
    </>
  );
};

export default Tree;
