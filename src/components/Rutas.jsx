import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";

import Productos from "../pages/productos";
import Producto from "../pages/Producto";
import Home from "../pages/Home";
import Forbidden from "../pages/Forbidden";
import Login from "../pages/Login";
import AdminLayout from "../pages/Admin/AdminLayout";
import AdminCategorias from "../pages/Admin/AdminCategorias"
import AdminProductos from "../pages/Admin/AdminProductos"
import AdminTags from "../pages/Admin/AdminTags"
import Carrito from "../pages/Carrito";
import Checkout from "../pages/Checkout";

const Rutas = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/productos/:id" element={<Producto />} />
      <Route path="/403" element={<Forbidden />} />
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />

      {/* Rutas para clientes logueados */}
      <Route element={<ProtectedRoute />}>
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* Rutas para administradores*/}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/productos" replace />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="categorias" element={<AdminCategorias />} />
          <Route path="tags" element={<AdminTags />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default Rutas;
