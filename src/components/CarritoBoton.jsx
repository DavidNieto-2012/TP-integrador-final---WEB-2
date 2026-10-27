import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoProvisorio";

const CarritoBoton = () => {
  const { cantidadTotal } = useCarrito();

  return (
    <Link
      to="/carrito"
      aria-label={`Ver carrito, ${cantidadTotal} artículos`}
      title="Ver carrito"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="18" r="1.5" />
        <circle cx="17" cy="18" r="1.5" />
        <path d="M3 4h2l2.4 9.5a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L19 7H7" />
      </svg>
      <span
        aria-live="polite"
        className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold leading-none text-white"
      >
        {cantidadTotal}
      </span>
    </Link>
  );
};

export default CarritoBoton;
