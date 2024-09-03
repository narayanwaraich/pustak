import { Accordian } from '@/components/ui/accordian';
import { Link } from '@/components/ui/link';
import { NestedFolders } from '@/types/api';

type FolderTreeProps = { folders: NestedFolders[] };
export const FolderTree = ({ folders }: FolderTreeProps) => {
  return folders.map((folder) => {
    const children = folder.Children;
    return children && children.length ? (
      <NestedFolder folder={folder} key={folder.id + folder.title} />
    ) : (
      <LoneFolder
        title={folder.title}
        id={folder.id}
        key={folder.id + folder.title}
      />
    );
  });
};

type NestedFolderProps = { folder: NestedFolders };
const NestedFolder = ({ folder }: NestedFolderProps) => {
  if (folder.Children) {
    return (
      <li>
        <Accordian
          title={folder.title}
          linkTo={`/dashboard/${folder.id.toString()}`}
        >
          <ul className="mt-1 px-2">
            <FolderTree folders={folder.Children} />
          </ul>
        </Accordian>
      </li>
    );
  }
};

type LoneFolderProps = { title: string; id: number };
const LoneFolder = ({ title, id }: LoneFolderProps) => {
  return (
    <li>
      <button className="ml-8 flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50">
        <Link to={`/dashboard/${id.toString()}`}>
          <span>{title}</span>
        </Link>
      </button>
    </li>
  );
};
