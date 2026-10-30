import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "carrito";

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
      console.error("Error al leer el carrito", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    } catch (error) {
      console.error("Error al guardar el carrito ", error);
    }
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((actual) => {
      const existente = actual.find((item) => item.id === producto.id);

      if (existente) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      return [
        ...actual,
        {
          id: producto.id,
          title: producto.title,
          price: Number(producto.price) || 0,
          pictures: producto.pictures || (producto.image ? [producto.image] : []), //se deja asi porque CarritoItem.jsx usa item.pictures y productcard.jsx algunos productos vienen com image o picture
          cantidad: Number(cantidad) || 1,
        },
      ];
    });
  };
  
  const cambiarCantidad = (id, cantidad) => {
    const nuevaCantidad = Number(cantidad);
    if (!Number.isInteger(nuevaCantidad) || nuevaCantidad < 1) return;
    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const quitarDelCarrito = (id) => {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  };

   const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalPrecio = carrito.reduce(
    (acum, item) => acum + (item.price * item.cantidad),
    0
  );
  const cantidadTotal = carrito.reduce(
    (acum, item) => acum + item.cantidad,
    0
  );
  return (
    <CartContext.Provider
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
    </CartContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de un CartProvider");
  }
  return context;
};