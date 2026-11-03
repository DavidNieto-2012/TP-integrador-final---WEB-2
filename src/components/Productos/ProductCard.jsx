import { getImageUrl } from "../../services/index";
import { useCarrito } from "../../context/cartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { title, price, picture, category } = product || {};

  // Evaluamos la URL de la imagen recibida
  const primeraImagen = product?.pictures?.[0] || picture;
  const imagen = primeraImagen ? getImageUrl(primeraImagen) : 'https://placehold.co/400x400?text=Sin+Imagen';

  // Extraemos el nombre de la categoría si viene como objeto o string
  const categoryName = typeof category === "object" ? category?.title || category?.name : category;

  const { agregarAlCarrito } = useCarrito();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAgregar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    agregarAlCarrito(product);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col">
        <div className="order-1 flex aspect-square w-full items-center justify-center overflow-hidden bg-white">
          <img
            src={imagen}
            alt={title || "Producto"}
            className="h-full w-full object-contain p-3 transition-transform duration-300 hover:scale-105"
          />
        </div>

        <h3 className="order-3 px-4 pb-1 pt-1 text-base font-semibold text-slate-900 line-clamp-2">
          {title || "Producto sin nombre"}
        </h3>
        
        {categoryName && (
          <span className="order-2 px-4 pt-4 text-xs uppercase tracking-wide text-slate-400">
            {categoryName}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-200 px-4 pb-4 pt-3">
        <p className="text-lg font-bold text-slate-900">
          ${price}
        </p>
        <button type="button"
          onClick={handleAgregar}  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
          Agregar
        </button>
      </div>
    </div>
  );
};
export default ProductCard;