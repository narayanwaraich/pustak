import { Spinner } from '@/components/ui/spinner';
import { useTopLevelFolders } from '../api/get-top-level-folders';
import { Accordian } from '@/components/ui/accordian';

const Tree = () => {
  const foldersQuery = useTopLevelFolders();

  if (foldersQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!foldersQuery.data) return null;

  const { data } = foldersQuery;

  return (
    <>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7" role="list">
          <li>
            <ul className="-mx-2">
              {data.map((folder) => {
                return (
                  <li key={folder.id}>
                    <Accordian title={folder.title}>
                      {folder.Children?.length && (
                        <ul className="mt-1 px-2">
                          {folder.Children.map((loneFolder) => {
                            return (
                              <li key={loneFolder.id}>
                                <button className="ml-8 flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50">
                                  <span>{loneFolder.title}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </Accordian>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>{/* Other menu @ the bottom */}</li>
        </ul>
      </nav>
    </>
  );
};

export default Tree;
