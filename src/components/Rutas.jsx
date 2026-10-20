import React from "react";
import { Route, Routes } from "react-router-dom";
import Productos from "../pages/Productos";
import Producto from "../pages/Producto";
import Home from "../pages/Home";
import Forbidden from "../pages/Forbidden";

const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/producto/:id" element={<Producto />} />
      <Route path="/403" element={<Forbidden />} />
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
};

export default Rutas;
