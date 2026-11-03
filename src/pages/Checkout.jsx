import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/cartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  
  // Extraemos carrito y vaciarCarrito tal como los provee tu CartContext
  const { carrito = [], vaciarCarrito } = useCarrito();
  const safeCart = Array.isArray(carrito) ? carrito : [];

  // Calculamos el total de forma segura usando los campos del contexto
  const total = safeCart.reduce((acc, item) => acc + (Number(item.price) * (item.cantidad || 1)), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (safeCart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    // Simulamos la confirmación de la compra
    setPedidoConfirmado(true);
    
    // Vaciamos el carrito usando tu función del contexto
    if (vaciarCarrito) {
      vaciarCarrito();
    }
  };

  if (pedidoConfirmado) {
    return (
      <div className="container mx-auto p-8 text-center max-w-lg">
        <h2 className="text-3xl font-bold mb-4 text-green-600">¡Compra confirmada con éxito! 🎉</h2>
        <p className="mb-6 text-slate-600">Gracias por tu pedido. Te enviamos el comprobante simulado.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">Finalizar Compra</h1>

      {/* Resumen del pedido dinámico */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-3 text-slate-800">Resumen del pedido</h3>
        
        {safeCart.length === 0 ? (
          <p className="text-slate-500 mb-2">No hay productos en el carrito.</p>
        ) : (
          <ul className="divide-y divide-slate-100 mb-4 max-h-60 overflow-y-auto">
            {safeCart.map((item, index) => (
              <li key={item.id || index} className="py-2.5 flex justify-between items-center text-sm">
                <div>
                  <span className="font-medium text-slate-800">{item.title}</span>
                  <span className="text-slate-500 ml-2">x{item.cantidad || 1}</span>
                </div>
                <span className="font-semibold text-slate-900">
                  ${(Number(item.price) * (item.cantidad || 1)).toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                </span>
              </li>
            ))}
          </ul>
        )}

        <hr className="my-3 border-slate-100" />
        <p className="text-xl font-bold text-slate-900 flex justify-between">
          <span>Total:</span>
          <span>${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Datos de envío</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700">Nombre y Apellido</label>
          <input type="text" required className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ej: Juan Pérez" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-slate-700">Dirección de entrega</label>
          <input type="text" required className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ej: San Martín 123" />
        </div>

        <button
          type="submit"
          disabled={safeCart.length === 0}
          className={`w-full py-3 rounded-xl font-bold transition-colors shadow-sm ${
            safeCart.length === 0
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Confirmar Pedido (Sin cobro)
        </button>
      </form>
    </div>
  );
};

export default Checkout;