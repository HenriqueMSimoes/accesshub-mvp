import { Routes, Route } from "react-router-dom";
import { ClientsList } from "../pages/Clients/ClientsList";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ClientsList />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
