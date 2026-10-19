import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Producto from "../pages/Producto";
import Productos from "../pages/Productos";
import Nosotros from "../pages/Nosotros";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/producto/:id" element={<Producto />} />
      <Route path="/ficha/:id" element={<Ficha />} />
      <Route path="/nosotros" element={<Nosotros />} />
    </Routes>
  );
};

export default Main;
