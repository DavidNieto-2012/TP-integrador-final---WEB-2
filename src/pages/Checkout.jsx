import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setPedidoConfirmado(true);
  };

  if (pedidoConfirmado) {
    return (
      <div className="container mx-auto p-8 text-center max-w-lg">
        <h2 className="text-3xl font-bold mb-4 text-green-600">¡Compra confirmada con éxito! 🎉</h2>
        <p className="mb-6 text-slate-600">Gracias por tu pedido. Este es un checkout simulado sin cobro real.</p>
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

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-3 text-slate-800">Resumen del pedido</h3>
        <p className="text-slate-600 mb-2">Productos seleccionados en tu carrito...</p>
        <hr className="my-3 border-slate-100" />
        <p className="text-xl font-bold text-slate-900">Total: $0.00</p>
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
          className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-sm"
        >
          Confirmar Pedido (Sin cobro)
        </button>
      </form>
    </div>
  );
};

export default Checkout;