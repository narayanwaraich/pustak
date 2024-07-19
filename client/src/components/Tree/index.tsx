import DisplayTree from "./Display";
import { useFolderTree } from "../../hooks/useFolderTree";

const Tree = () => {
  const { status, folderTree, hashMap, newFolderMutation } = useFolderTree();

  const addFolder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = event.currentTarget.value;
    event.currentTarget.value = "";
    newFolderMutation.mutate({ title });
  };

  if (status === "pending") {
    return <div>loading data ... </div>;
  }

  // console.log(hashMap);

  return (
    <>
      <form onSubmit={addFolder}>
        <input name="title" />
        <button type="submit">add</button>
      </form>
      <DisplayTree tree={folderTree} />
    </>
  );
};

export default Tree;
