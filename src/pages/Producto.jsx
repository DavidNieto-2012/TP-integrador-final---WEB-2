import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getImageUrl, productService } from "../services/index";

const Producto = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        setLoading(true);
        setError(null);
        setProducto(null);
        setCantidad(1);

        const data = await productService.getProductById(id);
        setProducto(data);
      } catch (error) {
        if (error instanceof TypeError) {
          setError("No se pudo conectar con el servidor. Revisá tu conexión.");
        } else {
          setError(error.message || "No se pudo cargar el producto.");
        }
      } finally {
        setLoading(false);
      }
    };

    obtenerProducto();
  }, [id]);

  const cambiarCantidad = (incremento) => {
    setCantidad((actual) => Math.max(1, actual + incremento));
  };

  const nombre = producto?.title;
  const categoria = producto?.category?.title || "Sin Categoría";
  const descripcion = producto?.description || "Sin descripción disponible para este producto.";
  const precio = Number(producto?.price ?? 0);
  const primeraImagen = producto?.pictures?.[0];
  const imagen = primeraImagen ? getImageUrl(primeraImagen) : 'https://placehold.co/400x400?text=Sin+Imagen';

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
        <p className="text-xl font-bold text-slate-700">Cargando producto...</p>
      </main>
    );
  }

  if (error || !producto) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
        <p className="mb-6 text-xl font-bold text-slate-800">
          {error || "No se encontró el producto solicitado."}
        </p>
        <Link
          to="/productos"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Volver al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <Link
        to="/productos"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-indigo-600"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Volver al catálogo
      </Link>

      <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <figure className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-10">
          <img
            src={imagen}
            alt={nombre}
            className="max-h-full w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </figure>

        <article className="flex flex-col justify-center">
          <div>
            <span className="mb-4 inline-block rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
              {categoria}
            </span>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
              {nombre}
            </h1>
            <p className="mb-8 text-base leading-relaxed text-slate-600">
              {descripcion}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <p className="mb-6 text-3xl font-black text-slate-900 md:text-4xl">
              $
              {precio.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
              })}
            </p>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  aria-label="Disminuir cantidad"
                  onClick={() => cambiarCantidad(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  −
                </button>
                <span className="select-none px-4 font-semibold text-slate-800">
                  {cantidad}
                </span>
                <button
                  type="button"
                  aria-label="Aumentar cantidad"
                  onClick={() => cambiarCantidad(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-sm transition-colors hover:bg-indigo-500 active:scale-95"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
                Agregar al carrito
              </button>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Producto;
