import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [view, setView] = useState("inicio");

  return (
    <div className="App">
      <h1>Cliente Frecuente Proyecto Anime</h1>
      <button onClick={() => setView("registro")}>Registrar Cliente</button>
      {view === "registro" && <p>Pantalla de registro de cliente aquí...</p>}
    </div>
  );
}
