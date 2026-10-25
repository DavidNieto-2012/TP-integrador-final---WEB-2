import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// Cuentas demo provisorias (las reales las define Rodri en 3.1)
const CUENTAS = [
  { userName: "cliente1", password: "cliente123", nombre: "Cliente 1 Demo", rol: "cliente" },
  { userName: "admin", password: "admin123", nombre: "Admin Demo", rol: "admin" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  // Al montar, recupera la sesión guardada (por eso existe cargandoSesion)
  useEffect(() => {
    try {
      const guardada = localStorage.getItem("sesion");
      if (guardada) setUser(JSON.parse(guardada));
    } catch {
      localStorage.removeItem("sesion");
    } finally {
      setCargandoSesion(false);
    }
  }, []);

  const login = (userName, password) => {
    const cuenta = CUENTAS.find(
      (c) => c.userName === userName.trim().toLowerCase() && c.password === password
    );
    if (!cuenta) {
      return { ok: false, mensaje: "Usuario o contraseña incorrectos." };
    }
    const sesion = { username: cuenta.userName, nombre: cuenta.nombre, rol: cuenta.rol };
    setUser(sesion);
    localStorage.setItem("sesion", JSON.stringify(sesion));
    return { ok: true, user: sesion };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sesion");
  };

  return (
    <AuthContext.Provider value={{ user, cargandoSesion, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);