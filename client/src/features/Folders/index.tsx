import Upload from './components/upload';
import Tree from './components/tree';

const Folders = () => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <Upload />
        <Tree />
      </div>
    </div>
  );
};

export default Folders;
