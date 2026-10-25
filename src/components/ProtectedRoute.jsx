import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvisorio";

const ProtectedRoute = () => {
  const { user, cargandoSesion } = useAuth();
  const location = useLocation();

  if (cargandoSesion) {
    return <p>Verificando sesión...</p>;
  }

  //location: guardo a dónde quería ir el cliente para luego del login redirigirlo
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Si está autenticado, mostrar la ruta solicitada
  return <Outlet />;
};

export default ProtectedRoute;
