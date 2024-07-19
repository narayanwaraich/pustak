// import SeedData from "./testing/SeedData"
// import BuildObj from "./testing/BuildObj"
import { useFolderTree } from "../services/query/useFolderTree";
import { useSelectedFolder } from "../services/state/SelectedFolderContext";

const Dashboard = () => {
  const { folderMap } = useFolderTree();
  const { state, setState } = useSelectedFolder();

  console.log(state);

  return (
    <div className="w-4/5">
      {/* <SeedData /> */}
      {/* <BuildObj /> */}
    </div>
  );
};

export default Dashboard;
