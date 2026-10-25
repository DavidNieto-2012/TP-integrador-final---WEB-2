
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvisorio";

const AdminRoute = () => {
  const { user, cargandoSesion } = useAuth();

  if (cargandoSesion) {
    return <p>Verificando sesión...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
