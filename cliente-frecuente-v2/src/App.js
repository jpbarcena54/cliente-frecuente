import React, { useState } from "react";
import "./App.css";
import logo from "./logo.png";

function App() {
  const [view, setView] = useState("inicio");
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nombre: "", telefono: "", correo: "" });
  const [busqueda, setBusqueda] = useState("");
  const [resultado, setResultado] = useState(null);

  const registrarCliente = () => {
    const nuevoCliente = { ...form, puntos: 0 };
    setClientes([...clientes, nuevoCliente]);
    alert("Cliente registrado");
    setForm({ nombre: "", telefono: "", correo: "" });
  };

  const buscarCliente = () => {
    const cliente = clientes.find(
      c =>
        c.nombre.toLowerCase() === busqueda.toLowerCase() ||
        c.telefono === busqueda
    );
    setResultado(cliente || "no");
  };

  return (
    <div className="App">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Cliente Frecuente Proyecto Anime</h1>

      {view === "inicio" && (
        <>
          <button onClick={() => setView("registro")}>Registrar Cliente</button>
          <button onClick={() => setView("consulta")}>Consultar Puntos</button>
        </>
      )}

      {view === "registro" && (
        <div className="formulario">
          <h2>Registro de Cliente</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={e => setForm({ ...form, telefono: e.target.value })}
          />
          <input
            type="email"
            placeholder="Correo"
            value={form.correo}
            onChange={e => setForm({ ...form, correo: e.target.value })}
          />
          <button onClick={registrarCliente}>Guardar</button>
          <button onClick={() => setView("inicio")}>Volver</button>
        </div>
      )}

      {view === "consulta" && (
        <div className="formulario">
          <h2>Consulta de Puntos</h2>
          <input
            type="text"
            placeholder="Nombre o teléfono"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <button onClick={buscarCliente}>Buscar</button>
          {resultado === "no" && <p>Cliente no encontrado</p>}
          {resultado && resultado !== "no" && (
            <div>
              <p><strong>Nombre:</strong> {resultado.nombre}</p>
              <p><strong>Teléfono:</strong> {resultado.telefono}</p>
              <p><strong>Puntos:</strong> {resultado.puntos}</p>
            </div>
          )}
          <button onClick={() => setView("inicio")}>Volver</button>
        </div>
      )}
    </div>
  );
}

export default App;
