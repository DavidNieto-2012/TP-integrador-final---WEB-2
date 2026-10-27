import { useCarrito } from "../context/CarritoProvisorio";
import { Link } from "react-router-dom";
import CarritoItem from "../components/Carrito/CarritoItem";


const Carrito = () => {
  const { carrito, totalPrecio, cambiarCantidad, quitarDelCarrito, vaciarCarrito } = useCarrito()
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 text-left">Carrito de Compras</h2>
      
      {carrito.length === 0 ? (
        <div>
          <p className="text-sm text-gray-400">El carrito está vacío</p>
          <Link to="/productos">Ver productos</Link>
        </div>
      ) : (
        <>
          {carrito.map((item) => (
            <CarritoItem
              key={item.id}
              item={item}
              cambiarCantidad={cambiarCantidad}
              quitarDelCarrito={quitarDelCarrito}
            />
          ))}

      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>${totalPrecio.toFixed(2)}</span>
        </div>
        
        <div className=" flex gap-4">
          <button onClick={vaciarCarrito} className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold text-white shadow-sm transition-colors hover:bg-red-500 active:scale-95">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"></path>
              <path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6"></path>
              <path d="M10 11v6"></path>
              <path d="M14 11v6"></path>
            </svg>
            Vaciar Carrito
          </button>

          <Link to="/checkout" className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-sm transition-colors hover:bg-indigo-500 active:scale-95">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="18" r="1.5"></circle>
              <circle cx="17" cy="18" r="1.5"></circle>
              <path d="M3 4h2l2.4 9.5a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L19 7H7"></path>
            </svg>
            Finalizar Compra
          </Link>
        </div>
      </div>
    </>
    )}      
    </div>

  );
};

export default Carrito;