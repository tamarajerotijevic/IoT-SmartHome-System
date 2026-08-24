import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Devices from "./pages/Devices";
import Access from "./pages/Access";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
        path="/login"
        element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={<ProtectedRoute>
                <Events />
            </ProtectedRoute>}
        />

        <Route
          path="/devices"
          element={<ProtectedRoute>
                <Devices />
            </ProtectedRoute>}
        />

        <Route
          path="/access"
          element={<ProtectedRoute>
                <Access />
            </ProtectedRoute>}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;