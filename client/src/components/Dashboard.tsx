import { useFolderTree } from "../services/query/useFolderTree";
import { useSelectedFolder } from "../services/state/SelectedFolderContext";
import Link from "./Link";

const Dashboard = () => {
  const { folderMap } = useFolderTree();
  const { folderId } = useSelectedFolder();

  const folder = folderMap.get(folderId);
  const links = folder ? folder.links : [];

  return (
    <div className="w-4/5">
      {links.map((link) => (
        <Link data={link} key={link.id} />
      ))}
    </div>
  );
};

export default Dashboard;
