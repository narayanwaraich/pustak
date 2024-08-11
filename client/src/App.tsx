import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-white">
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
