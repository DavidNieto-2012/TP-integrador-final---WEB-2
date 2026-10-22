import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Header = () => {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
const buscar = (e) => { e.preventDefault();//esto  evita que el formulario recargue toda la pag.
  
  navigate(`/productos?q=${encodeURIComponent(busqueda)}`); //encodeURIComponent sirve para convertir los caracteres raros en válidos para una URL.
}
  return (
    <header className="bg-white">
      {/* Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="rounded-lg bg-indigo-600 px-2.5 py-0.5 text-2xl font-black tracking-tighter text-white shadow-sm">
            SUPER
          </span>
          <span className="hidden text-lg font-bold tracking-wide text-slate-800 sm:inline">
            MERCADO
          </span>
        </Link>

          {/* Buscador */}
          <div className="flex-1 max-w-md hidden md:block">
            <form onSubmit={buscar} className="relative">
              <input 
                type="text" 
                placeholder="Buscar" 
                value= {busqueda}
                onChange={(e)=>setBusqueda(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-700"
              />
              
            </form>
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

        <div className="flex items-center gap-3">
          <Link
            to="/productos"
            className="hidden text-sm font-semibold text-slate-700 hover:text-indigo-600 sm:inline"
          >
            Catálogo
          </Link>
          <Link
            to="/carrito"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
          >
            Carrito
          </Link>
          <Link
            to="/login"
            className="hidden text-sm font-semibold text-slate-700 hover:text-indigo-600 sm:inline"
          >
            Ingresar
          </Link>
        </div>

      <nav
        aria-label="Categorías"
        className="flex justify-start gap-4 overflow-x-auto border-t border-slate-100 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600 sm:gap-6 sm:text-sm md:justify-center"
      >
        <Link to="/" className="whitespace-nowrap hover:text-indigo-600">
          Inicio
        </Link>
        <Link
          to="/productos?categoria=325"
          className="whitespace-nowrap hover:text-indigo-600"
        >
          Verduras
        </Link>
        <Link
          to="/productos?categoria=326"
          className="whitespace-nowrap hover:text-indigo-600"
        >
          Carnes
        </Link>
        <Link
          to="/productos?categoria=327"
          className="whitespace-nowrap hover:text-indigo-600"
        >
          Higiene
        </Link>
        <Link
          to="/productos?categoria=328"
          className="whitespace-nowrap hover:text-indigo-600"
        >
          Limpieza
        </Link>
        <Link
          to="/productos"
          className="whitespace-nowrap text-slate-400 hover:text-indigo-600"
        >
          Ver todos →
        </Link>
      </nav>
    </header>
  );
};

export default Header;