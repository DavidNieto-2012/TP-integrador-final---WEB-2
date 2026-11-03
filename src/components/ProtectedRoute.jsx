import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, cargandoSesion } = useAuth();

  if (cargandoSesion) {
    return <p>Verificando sesión...</p>;
  }

  if (!user) {
    return <Navigate to="/forbiden" replace />;
  }

  // Si está autenticado, mostrar la ruta solicitada
  return <Outlet />;
};

export default ProtectedRoute;
