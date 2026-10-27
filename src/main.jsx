import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthProvisorio.jsx";
import { CarritoProvider } from "./context/CarritoProvisorio.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CarritoProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </CarritoProvider>
  </BrowserRouter>,
)
