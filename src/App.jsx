import React from "react";
import Header from "./components/Header";
import Rutas from "./components/Rutas";
import { Footer } from "./components/footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <main>
          <Rutas />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;