import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { productService, categoryService, tagService } from "../services/index";


import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categorias, setCategorias] = useState([]);//esta es para que aparezcan las categorias en un select 
  const [searchParams, setSearchParams] = useSearchParams();
  const texto = searchParams.get("q") || "";
  const orden = searchParams.get("orden") || "";
  const [tags, setTags] = useState([])
  const categoria = searchParams.get("categoria"); // esta
  const tag = searchParams.get("tag");

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        setLoading(true);
        setError(null);



        const data = await productService.getProducts();
        setProductos(data);

      } catch (error) {
        if (error instanceof TypeError) {
          setError("No se pudo conectar con el servidor. Revisá tu conexión.");
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  useEffect(() => {
    categoryService.getCategories().then(setCategorias);
    tagService.getTags().then(setTags);
  }, []);


  let productosFiltrados = productos;
  if (categoria) {
    productosFiltrados = productosFiltrados.filter(
      (p) => String(p.category_id) === categoria
    );
  }
  if (tag) {
    productosFiltrados = productosFiltrados.filter((p) =>
      productService.hasTag(p, tag)
    );
  }

  if (texto) {
    productosFiltrados = productosFiltrados.filter((p) =>
      p.title.toLowerCase().includes(texto.toLowerCase())
    );
  }

  if (orden === "asc") {
    productosFiltrados = [...productosFiltrados].sort((a, b) => a.price - b.price); //esto hace que el menor valor vaya al principio
  }

  if (orden === "desc") {
    productosFiltrados = [...productosFiltrados].sort((a, b) => b.price - a.price); //es lo mismo pero va de mayor a menor en ese orden
  }





  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 text-left">Todos nuestros productos</h1>

      {/*Filtros*/}

      <div className="flex flex-wrap justify-center gap-4 mb-6">


        <select
          value={orden}
          onChange={(e) => {
            const nuevos = new URLSearchParams(searchParams);
            if (e.target.value) nuevos.set("orden", e.target.value);
            else nuevos.delete("orden");
            setSearchParams(nuevos);
          }}>

          <option value="">Ordenar por precio</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <select
          value={categoria || ""} //
          onChange={(e) => {
            const nuevos = new URLSearchParams(searchParams);
            if (e.target.value) nuevos.set("categoria", e.target.value);
            else nuevos.delete("categoria");
            setSearchParams(nuevos);
          }}
        >
          <option value="">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option> //el value es el id de la categoria asi se filtra por categoria
          ))}
        </select>
        <select
          value={tag || ""}
          onChange={(e) => {
            const nuevos = new URLSearchParams(searchParams);
            if (e.target.value) nuevos.set("tag", e.target.value);
            else nuevos.delete("tag");
            setSearchParams(nuevos);
          }}
        >
          <option value="">Todos los tags</option>
          {tags.map((t) => (
            <option key={t.id} value={t.title}>{t.title}</option>
          ))}
        </select>

        {/* Botón para borrar filtros */}
        <button
          type="button"
          onClick={() => setSearchParams({})}
          className="rounded-lg bg-red-50 border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
        >
          Borrar filtros
        </button>
      </div>




      {loading ? (
        <div>
          <p className="text-xl font-bold text-slate-300 mb-2">Cargando productos...</p>
          <ProductSkeleton />
        </div>

      ) : error ? (
        <p className="text-xl font-bold text-slate-300 mb-2">Error: {error}</p>
      ) : productosFiltrados.length === 0 ? (
        <p className="text-slate-400 max-w-md">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productosFiltrados.map((p) => (
            <Link key={p.id} to={`/productos/${p.id}`}>
              <ProductCard product={p} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productos;