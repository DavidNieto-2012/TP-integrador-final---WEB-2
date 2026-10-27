import { getImageUrl } from "../services/index";

const CarritoItem = ({ item, cambiarCantidad, quitarDelCarrito }) => {
  const imagen = getImageUrl(item.pictures?.[0]);
  const cantidad = Number(item.cantidad) || 1;
  const precio = Number(item.price) || 0;

  return (
    <article className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <img
        className="h-24 w-24 rounded-xl bg-slate-100 object-cover"
        src={imagen}
        alt={item.title || "Producto"}
      />

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-bold text-slate-800">
          {item.title || "Producto sin nombre"}
        </h3>
        <p className="pt-2">Precio Unitario ${(precio).toFixed(2)}</p>
        <p className="mt-1  font-semibold text-slate-600">
          Subtotal ${(precio * cantidad).toFixed(2)}
        </p>

        <div className="mt-3 inline-flex items-center gap-3 rounded-lg border border-slate-200 px-2 py-1">
          <p className=" m-0 inline-flex items-center">Unidades</p>
          <button
            type="button"
            onClick={() => cambiarCantidad(item.id, cantidad - 1)}
            disabled={cantidad <= 1}
            aria-label={`Quitar una unidad de ${item.title || "producto"}`}
            className="h-8 w-8 rounded-md font-bold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <span className="min-w-6 text-center font-medium" aria-live="polite">
            {cantidad}
          </span>
          <button
            type="button"
            onClick={() => cambiarCantidad(item.id, cantidad + 1)}
            aria-label={`Agregar una unidad de ${item.title || "producto"}`}
            className="h-8 w-8 rounded-md font-bold text-slate-700 hover:bg-slate-100"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => quitarDelCarrito(item.id)}
        aria-label={`Eliminar ${item.title || "producto"} del carrito`}
        className="self-end rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 sm:self-center"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
          <path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>
    </article>
  );
};

export default CarritoItem;
