import { Spinner } from '@/components/ui/spinner';
import { useTopLevelFolders } from '../api/get-top-level-folders';
import { Accordian } from '@/components/ui/accordian';
import { Link } from '@/components/ui/link';
import { NestedFolders } from '@/types/api';

type LoneFolderProps = { title: string; id: number };

const LoneFolder = ({ title, id }: LoneFolderProps) => {
  return (
    <li key={id}>
      <button className="ml-8 flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50">
        <Link to={`/dashboard/${id.toString()}`}>
          <span>{title}</span>
        </Link>
      </button>
    </li>
  );
};

type NestedFolderProps = { folder: NestedFolders };

const NestedFolder = ({ folder }: NestedFolderProps) => {
  return (
    <li key={folder.id}>
      <Accordian
        title={folder.title}
        linkTo={`/dashboard/${folder.id.toString()}`}
      >
        <ul className="mt-1 px-2">
          <FolderTree data={folder.Children} />
        </ul>
      </Accordian>
    </li>
  );
};

type FolderTreeProps = { data: NestedFolders[] };

const FolderTree = ({ data }: FolderTreeProps) => {
  return data.map((folder) => {
    return folder.Children?.length ? (
      <NestedFolder folder={folder} />
    ) : (
      <LoneFolder title={folder.title} id={folder.id} />
    );
  });
};

export default function Folders() {
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
          <li key="FolderTree">
            <ul className="-mx-2">
              <FolderTree data={data} />
            </ul>
          </li>
          {/* <li>Other menu @ the bottom</li> */}
        </ul>
      </nav>
    </>
  );
}
