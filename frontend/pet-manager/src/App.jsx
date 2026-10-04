import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPet from "./pages/AddPet";
import EditPet from "./pages/EditPet";
import PetDetails from "./pages/PetDetails";
import AddVaccination from "./pages/AddVaccination";
import EditVaccination from "./pages/EditVaccination";

import useAuth from "./hooks/useAuth";

function App() {

  const { token } = useAuth();

  return (
    <Routes>

      <Route
        path="/"
        element={
          token ? <Home /> : <Navigate to="/register" replace />
        }
      />

      <Route
        path="/pets/add"
        element={
          token ? <AddPet /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/pets/:id/vaccinations/add"
        element={
          token ? (
            <AddVaccination />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/vaccinations/:id/edit"
        element={
          token
            ? <EditVaccination />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/pets/:id"
        element={
          token ? <PetDetails /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/pets/:id/edit"
        element={
          token ? <EditPet /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

    </Routes>
  );
}

export default App;