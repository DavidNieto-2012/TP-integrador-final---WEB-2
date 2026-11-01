import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/Productos/ProductCard";
import { productService } from "../services/index";

const Home = () => {
  const [buscar, setBuscar] = useState("");
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProducts();

        if (Array.isArray(data)) {
          const productosProcesados = data.map((prod) => {
            let categoriaLimpia = prod.category || prod.categoria || "";
            if (typeof categoriaLimpia === "object" && categoriaLimpia !== null) {
              categoriaLimpia =
                categoriaLimpia.title ||
                categoriaLimpia.nombre ||
                categoriaLimpia.name ||
                "";
            }

            return {
              ...prod,
              category: categoriaLimpia,
              categoria: categoriaLimpia,
            };
          });

          setProductos(productosProcesados);

          const listaCategorias = [
            ...new Set(
              productosProcesados
                .map((p) => p.category)
                .filter((cat) => cat && cat.trim() !== "")
            ),
          ];

          setCategorias(listaCategorias);
        } else {
          setProductos([]);
        }
      } catch (err) {
        console.log("Error al cargar productos en Home:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (buscar.trim() !== "") {
      navigate("/productos?q=" + encodeURIComponent(buscar));
    } else {
      navigate("/productos");
    }
  };

  const promos = productos.filter(
    (prod) =>
      prod.tag === "Promoción" ||
      prod.category === "Promoción" ||
      prod.is_promo === true
  );

  const organicos = productos.filter(
    (prod) => prod.tag === "Orgánico" || prod.category === "Orgánico"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* 1. Buscador */}
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Bienvenidos a nuestra tienda</h1>
        <form onSubmit={handleSearch} className="flex justify-center gap-2 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border focus:outline-none transition"
            style={{
              backgroundColor: "var(--code-bg)",
              borderColor: "var(--border)",
              color: "var(--text-h)"
            }}
          />
          <button
            type="submit"
            className="font-medium px-5 py-2.5 rounded-xl transition text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Buscar
          </button>
        </form>
      </section>

      {/* 2. Categorías */}
      {categorias.length > 0 && (
        <section className="mb-10 text-left">
          <h2 className="text-2xl font-bold mb-4">Categorías</h2>
          <div className="flex flex-wrap gap-3">
            {categorias.map((cat, index) => (
              <Link
                key={index}
                to={`/productos?categoria=${encodeURIComponent(cat)}`}
                className="px-4 py-2 rounded-xl text-sm font-medium transition border"
                style={{
                  backgroundColor: "var(--accent-bg)",
                  borderColor: "var(--accent-border)",
                  color: "var(--accent)"
                }}
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Estado de carga o error */}
      {loading ? (
        <p className="text-xl font-bold text-center my-8">Cargando productos...</p>
      ) : error ? (
        <p className="text-xl font-bold text-red-400 text-center my-8">{error}</p>
      ) : (
        <>
          {/* 3. Sección Promociones */}
          <section className="mb-12 text-left">
            <h2 className="text-2xl font-bold mb-6">Promociones</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {promos.length > 0
                ? promos.map((prod) => (
                  <ProductCard key={prod.id || prod._id} product={prod} />
                ))
                : productos
                  .slice(0, 4)
                  .map((prod) => (
                    <ProductCard key={prod.id || prod._id} product={prod} />
                  ))}
            </div>
          </section>
          
          {/* 4. Sección Orgánicos */}
          <section className="mb-12 text-left">
            <h2 className="text-2xl font-bold mb-6">Productos Orgánicos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {organicos.length > 0
                ? organicos.map((prod) => (
                  <ProductCard key={prod.id || prod._id} product={prod} />
                ))
                : productos
                  .slice(4, 8)
                  .map((prod) => (
                    <ProductCard key={prod.id || prod._id} product={prod} />
                  ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;