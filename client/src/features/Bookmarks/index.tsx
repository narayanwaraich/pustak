// import { useFolderTree } from '@/services/query/use-folder-tree';
// import { useSelectedFolder } from '@/services/selected-folder';
import Bookmark from './components/Bookmark';
import { useParams } from 'react-router-dom';
import { useBookmarks } from './hooks/use-bookmarks';
import { Spinner } from '@/components/ui/spinner';
import Heading from './components/heading';
import './style.css';

const Bookmarks = () => {
  const params = useParams();
  const folderId = params.folderId ?? '1';
  const { bookmarks, isLoading, isError } = useBookmarks(folderId);

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) return null;

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
