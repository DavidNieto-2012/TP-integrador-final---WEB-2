import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white/100">
        {/* Navbar */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo Neutro */}
          <Link to="/" className="flex items-center gap-2 text-decoration-none">
            <span className="bg-indigo-600 text-white font-black text-2xl tracking-tighter px-2.5 py-0.5 rounded-lg shadow-sm">
              SUPER
            </span>
            <span className="font-bold text-slate-800 tracking-wide text-lg hidden sm:inline">MERCADO</span>
          </Link>

          {/* Buscador */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar" 
                className="w-full bg-slate-100 border border-slate-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-700"
              />
            </div>
          </div>

          {/* Acciones derecha */}
          <div className="flex items-center gap-3">
            <Link to="/productos" className="text-sm font-semibold text-slate-700 hover:text-indigo-600 hidden sm:inline">
              Catálogo
            </Link>
            {/* REEMPLAZAR CON EL COMPONENTE DEL CARRITO <carrito-boton></carrito-boton>*/}
          <button onClick={() => navigate("/carrito")}>Carrito</button>
          </div>
        </div>

        {/* Categorías */}
        <nav className="bg-slate-50 border-t border-slate-100 px-4 py-2 overflow-x-auto text-xs sm:text-sm font-medium text-slate-600 flex gap-4 sm:gap-6 justify-start md:justify-center">
          <Link to="/" className="hover:text-indigo-600 whitespace-nowrap">Inicio</Link>
          <Link to="/productos?categoria=325" className="hover:text-indigo-600 whitespace-nowrap">Verduras</Link>
          <Link to="/productos?categoria=326" className="hover:text-indigo-600 whitespace-nowrap">Carnes</Link>
          <Link to="/productos?categoria=327" className="hover:text-indigo-600 whitespace-nowrap">Higiene</Link>
          <Link to="/productos?categoria=328" className="hover:text-indigo-600 whitespace-nowrap">Limpieza</Link>
          <Link to="/productos" className="hover:text-indigo-600 text-slate-400 whitespace-nowrap">Ver todos →</Link>
        </nav>
      </header>
    
      
  );
};

export default Header;