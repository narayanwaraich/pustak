import Settings from "./Settings";
import Tree from "./Tree/Tree";

const Navbar = () => {
  return (
    <div className="flex w-72 flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <Settings />
        <Tree />
      </div>
    </div>
  );
};

export default Navbar;
