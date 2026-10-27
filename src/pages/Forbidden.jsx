import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-left">
        No tenés acceso a esta página
      </h1>
      <p className="text-slate-500 mb-6">
        Tu cuenta no tiene los permisos necesarios para ver este contenido.
      </p>
      <Link
        to="/"
        className="text-sm font-semibold text-slate-700 hover:text-indigo-600"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default Forbidden;