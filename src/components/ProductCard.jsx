export const ProductCard = ({ product }) => {
  // Manejo flexible de los datos de la API
  const title = product?.title || product?.nombre || product?.name || "Producto sin nombre";
  const price = product?.price || product?.precio || "0.00";
  const category = product?.category || product?.categoria || "";
  
  // Buscar la propiedad donde la API guardó la imagen
  const imageUrl = product?.image || product?.imagen || product?.img || product?.thumbnail;

  return (
    <div className="border border-slate-700/50 rounded-2xl p-4 shadow-lg hover:shadow-xl transition bg-slate-800/60 text-white flex flex-col justify-between h-full">
      <div>
        <div className="w-full h-48 bg-slate-700 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Si la imagen de la API viene rota, muestra un placeholder de respaldo
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x200?text=Sin+Imagen";
              }}
            />
          ) : (
            <span className="text-slate-400 text-sm">Sin imagen</span>
          )}
        </div>

        <h3 className="font-bold text-lg text-slate-100 line-clamp-2 mb-1">
          {title}
        </h3>
        
        {category && (
          <span className="inline-block text-xs font-medium text-slate-400 mb-2">
            {category}
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