import { useFolderTree } from '@/services/query/use-folder-tree';
import { useSelectedFolder } from '@/services/selected-folder';
import Bookmark from './Bookmark';
import Heading from './heading';
import './style.css';

const Bookmarks = () => {
  const { folderMap } = useFolderTree();
  const { folderId } = useSelectedFolder();

  const folder = folderMap.get(folderId);
  const bookmarks = folder?.Bookmarks ? folder.Bookmarks : [];

  return (
    <div className="lg:pl-72">
      <Heading />
      <main className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* ↓ Set minimum height to full screen minus search area ↴ */}
          <div className="relative overflow-hidden rounded-xl border border-dashed border-gray-400 opacity-75">
            <ul role="list" className="divide-y divide-gray-100">
              {bookmarks.map((bookmark) => (
                <Bookmark
                  url={bookmark.url}
                  title={bookmark.title}
                  icon={bookmark.icon}
                  key={bookmark.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bookmarks;
