import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
const CartContext = createContext(null);


export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const STORAGE_KEY = user ? `carrito_${user.username}` : "carrito_invitado";
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
            const guardado = localStorage.getItem(STORAGE_KEY);
            setCarrito(guardado ? JSON.parse(guardado) : []);
        } catch (error) {
            console.error("Error al cargar el carrito del usuario", error);
            setCarrito([]);
        }
    }, [STORAGE_KEY]);

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