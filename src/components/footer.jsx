export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-400 py-6 mt-auto text-center border-t border-slate-800">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} Mi Tienda - Trabajo Práctico Integrador</p>
      </div>
    </footer>
  );
};