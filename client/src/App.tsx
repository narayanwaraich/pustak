import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <div className="flex bg-gray-400">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default App;
