import { Spinner } from '@/components/ui/spinner';
import { FolderTree } from './folder-tree';
import { useFolders } from '../hooks/use-folders';

const Loading = () => (
  <div className="flex h-48 w-full items-center justify-center">
    <Spinner size="lg" />
  </div>
);

export default function Folders() {
  //  Change this on backend to only top level folders, not even 1st level Children.
  //  Use the 'hasChildren' column to display arrows.

  const folders = useFolders();

  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col gap-y-7" role="list">
        <li key="FolderTree">
          <ul className="-mx-2">
            {folders ? <FolderTree folders={folders} /> : <Loading />}
          </ul>
        </li>
        {/* <li>Other menu @ the bottom</li> */}
      </ul>
    </nav>
  );
}
