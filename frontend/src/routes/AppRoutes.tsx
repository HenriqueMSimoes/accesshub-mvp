import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "../layouts/MainLayout";
import Login from "../pages/Login";
import { Clients } from "../pages/Clients";
import { Servers } from "../pages/Servers";
import { Ports } from "../pages/Ports";
import { Softwares } from "../pages/Softwares";

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
      <Route path="/servers/:serverId/ports" element={<Ports />} />
      <Route path="/servers/:serverId/softwares" element={<Softwares />} />
    </Routes>
  );
}
