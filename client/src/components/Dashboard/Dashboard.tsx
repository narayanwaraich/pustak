import { useFolderTree } from "../../services/query/useFolderTree";
import { useSelectedFolder } from "../../services/state/SelectedFolderContext";
import Link from "./Link";
import Heading from "./Heading";
import "./style.css";

const Dashboard = () => {
  const { folderMap } = useFolderTree();
  const { folderId } = useSelectedFolder();

  const folder = folderMap.get(folderId);
  const links = folder ? folder.links : [];

  return (
    <div className="lg:pl-72">
      <Heading />
      <main className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="relative h-[576px] overflow-hidden rounded-xl border border-dashed border-gray-400 opacity-75">
            <ul role="list" className="divide-y divide-gray-100">
              {links.map((link) => (
                <Link link={link} key={link.id} />
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
