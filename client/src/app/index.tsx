/* import Dashboard from "./features/Dashboard";
import Auth from "./components/Auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Route, Routes } from "react-router-dom"; */

// import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';

import { AppProvider } from './main-provider';
import { createRouter } from './routes';

const AppRouter = () => {
  // const queryClient = useQueryClient();

  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;

/*
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
*/
