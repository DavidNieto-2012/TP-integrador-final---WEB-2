import { Outlet, NavLink } from "react-router-dom";

const navLinkClassName = ({ isActive }) =>
  `whitespace-nowrap rounded-lg px-4 py-2.5 font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
    isActive
      ? "bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200"
      : "text-slate-600 hover:bg-white/70 hover:text-indigo-700"
  }`;

const AdminLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 text-left">Panel de administración</h1>
      <nav className="mx-auto mb-6 flex w-fit flex-wrap items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 text-sm">
        <NavLink to="/admin/productos" className={navLinkClassName}>
          Productos
        </NavLink>
        <NavLink to="/admin/categorias" className={navLinkClassName}>
          Categorías
        </NavLink>
        <NavLink to="/admin/tags" className={navLinkClassName}>
          Tags
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminLayout;