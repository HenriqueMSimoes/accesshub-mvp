import { Routes, Route } from "react-router-dom";
import { ClientsList } from "../pages/Clients/ClientsList";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";
import Login from "../pages/Login/Login";

export function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/login" element={<Login />} />
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
