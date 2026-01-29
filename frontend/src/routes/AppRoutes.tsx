import { Routes, Route } from "react-router-dom";
import { ClientsList } from "../pages/Clients/ClientsList";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ClientsList />} />
    </Routes>
  );
}
