import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";
import Login from "../pages/Login";
import { Clients } from "../pages/Clients";
import { Servers } from "../pages/Servers";

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
              <Clients />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/clients/:clientId/servers" element={<Servers />} />
    </Routes>
  );
}
