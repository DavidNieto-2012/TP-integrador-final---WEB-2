const ProductCard = ({ product }) => {
  const { title, price, image, picture, category } = product || {};

  // Evaluamos la URL de la imagen recibida
  const imgUrl = image || picture;

  // Extraemos el nombre de la categoría si viene como objeto o string
  const categoryName = typeof category === "object" ? category?.title || category?.name : category;

  return (
    <div className="border border-slate-700/50 rounded-2xl p-4 shadow-lg hover:shadow-xl transition bg-slate-800/60 text-white flex flex-col justify-between h-full">
      <div>
        <div className="w-full h-48 bg-slate-700/50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={title || "Producto"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x200?text=Sin+Imagen";
              }}
            />
          ) : (
            <span className="text-slate-400 text-sm font-medium">Sin imagen</span>
          )}
        </div>

        <h3 className="font-bold text-lg text-slate-100 line-clamp-2 mb-1">
          {title || "Producto sin nombre"}
        </h3>
        
        {categoryName && (
          <span className="inline-block text-xs font-medium text-slate-400 mb-2">
            {categoryName}
          </span>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between">
        <p className="text-xl font-extrabold text-emerald-400">
          ${price}
        </p>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-xl text-sm transition">
          Agregar
        </button>
      </div>
    </div>
  );
};
export default ProductCard;