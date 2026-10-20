import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvisorio";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ username: "", password: "" });
  const [errorLogin, setErrorLogin] = useState(null);
  const [enviando, setEnviando] = useState(false);

  {/*funcion para manejar cambios en los campos del formulario*/}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  {/*funcion para manejar el envio del formulario*/}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorLogin(null);
    
    // Validar los campos
    if (!form.username.trim() || !form.password) {
      setErrorLogin("Completá el usuario y la contraseña.");
      return;
    }

    setEnviando(true);

    try {
      // Llamar a la función del AuthContext
      const resultado = login(form.username, form.password);

      if (!resultado.ok) {
        setErrorLogin(resultado.mensaje);
        return;
      }

      // Login correcto: ir a la página principal
      navigate("/");
    } catch {
      setErrorLogin("Ocurrió un error al iniciar sesión.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-6 text-center">
          <span className="inline-block rounded-lg bg-indigo-600 px-2.5 py-1 text-2xl font-black tracking-tighter text-white shadow-sm">
            SUPER
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-indigo-600">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Ingresá tus datos para continuar
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-slate-700"
              htmlFor="username"
            >
              Nombre de usuario
            </label>
            <input
              className="w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              name="username"
              id="username"
              type="text"
              placeholder="Nombre de usuario"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold text-slate-700"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              name="password"
              id="password"
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <button
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-bold text-white shadow-sm transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={enviando}
          >
            {enviando ? "Ingresando..." : "Iniciar sesión"}
          </button>

          {errorLogin && (
            <p className="text-center text-sm font-medium text-red-600" role="alert">
              {errorLogin}
            </p>
          )}
        </form>

        <div className="mt-6 border-t border-slate-100 pt-5 text-center">
          <p className="mb-2 text-sm font-semibold text-slate-700">
            Cuentas demo disponibles
          </p>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>
              <span className="font-semibold">Usuario:</span> cliente1
              <span className="px-1 text-slate-400">|</span>
              <span className="font-semibold">Clave:</span> cliente123
            </li>
            <li>
              <span className="font-semibold">Usuario:</span> admin
              <span className="px-1 text-slate-400">|</span>
              <span className="font-semibold">Clave:</span> admin123
            </li>
          </ul>
        </div>
      </section>
    </main>
  );

};

export default Login;