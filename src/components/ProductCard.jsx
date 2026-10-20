export const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between">
      <div>
        <img
          src={product?.image || 'https://via.placeholder.com/150'}
          alt={product?.title || product?.name || 'Producto'}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="font-semibold text-lg text-gray-800">
          {product?.title || product?.name || 'Producto Demo'}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          {product?.category || 'Categoría'}
        </p>
        <p className="text-xl font-bold text-slate-900">
          ${product?.price || '0.00'}
        </p>
      </div>
      <button className="mt-4 bg-slate-900 text-white py-2 rounded hover:bg-slate-800 transition">
        Agregar al carrito
      </button>
    </div>
  );
};