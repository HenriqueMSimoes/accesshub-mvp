import { Routes, Route } from "react-router-dom";
import { ClientsList } from "../pages/Clients/ClientsList";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ClientsList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
