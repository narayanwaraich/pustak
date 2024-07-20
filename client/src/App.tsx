import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
// import SelectedFolderContext from "./services/state/SelectedFolderContext";

const App = () => {
  return (
    <div className="flex bg-gray-400">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default App;
