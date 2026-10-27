import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext(null);

const CLAVE = "carrito";

export const CarritoProvider = ({ children }) => {
  // carrito: array de { id, title, price, pictures, cantidad }
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem(CLAVE);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  // Guarda en localStorage cada vez que cambia el carrito
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(carrito));
    } catch {
      // si localStorage falla, el carrito sigue funcionando en memoria
    }
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((actual) => {
      const existente = actual.find((i) => i.id === producto.id);
      if (existente) {
        return actual.map((i) =>
          i.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [
        ...actual,
        {
          id: producto.id,
          title: producto.title,
          price: producto.price,
          pictures: producto.pictures,
          cantidad,
        },
      ];
    });
  };

  const cambiarCantidad = (id, cantidad) => {
    const nueva = Number(cantidad);
    if (!Number.isInteger(nueva) || nueva < 1) return; // mínimo 1
    setCarrito((actual) =>
      actual.map((i) => (i.id === id ? { ...i, cantidad: nueva } : i))
    );
  };

  const quitarDelCarrito = (id) => {
    setCarrito((actual) => actual.filter((i) => i.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  // Valores derivados: se calculan, no se guardan
  const totalPrecio = carrito.reduce((suma, i) => suma + i.price * i.cantidad, 0);
  const cantidadTotal = carrito.reduce((suma, i) => suma + i.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        totalPrecio,
        cantidadTotal,
        agregarAlCarrito,
        cambiarCantidad,
        quitarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);