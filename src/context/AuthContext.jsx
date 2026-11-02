import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// cuentas demo 
const CUENTAS = [
  {
    userName: "cliente@demo.com",
    email: "cliente@demo.com",
    password: "123",
    nombre: "Cliente Demo",
    rol: "cliente"
  },
  {
    userName: "admin@demo.com",
    email: "admin@demo.com",
    password: "123",
    nombre: "Administrador Demo",
    rol: "admin"
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  // nos fijamos si hay una sesion guardada 
  useEffect(() => {
    const sesionGuardada = localStorage.getItem("sesion");
    if (sesionGuardada) {
      setUser(JSON.parse(sesionGuardada));
    }
    setCargandoSesion(false);
  }, []);

  // función para iniciar sesión
  const login = (userName, password) => {
    // para ver si coincide el usuario y la contraseña
    const usuarioEncontrado = CUENTAS.find(
      (c) => (c.userName === userName || c.email === userName) && c.password === password
    );

    if (usuarioEncontrado) {
      const datosUsuario = {
        username: usuarioEncontrado.userName,
        email: usuarioEncontrado.email,
        nombre: usuarioEncontrado.nombre,
        rol: usuarioEncontrado.rol
      };

      setUser(datosUsuario);
      localStorage.setItem("sesion", JSON.stringify(datosUsuario));
      return { ok: true, user: datosUsuario };
    } else {
      return { ok: false, mensaje: "Usuario o contraseña incorrectos." };
    }
  };

  // función para cerrar sesión
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

export const useAuth = () => {
  return useContext(AuthContext);
};