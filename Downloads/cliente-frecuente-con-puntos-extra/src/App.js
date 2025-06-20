import React, { useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [formData, setFormData] = useState({ nombre: "", telefono: "", correo: "", puntos: 0 });
  const [busqueda, setBusqueda] = useState("");
  const [resultado, setResultado] = useState(null);
  const [monto, setMonto] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const registrarCliente = async () => {
    const { error } = await supabase.from("clientes").insert([formData]);
    alert(error ? "Error al registrar cliente" : "Cliente registrado exitosamente");
    if (!error) setFormData({ nombre: "", telefono: "", correo: "", puntos: 0 });
  };

  const buscarCliente = async () => {
    const { data } = await supabase
      .from("clientes")
      .select("*")
      .or(`nombre.ilike.%${busqueda}%,telefono.ilike.%${busqueda}%`);
    setResultado(data);
  };

  const agregarPuntos = async () => {
    if (!resultado || resultado.length === 0) return alert("Primero busca al cliente");
    const cliente = resultado[0];
    const puntosExtra = Math.floor(Number(monto) * 0.02);
    const nuevosPuntos = (cliente.puntos || 0) + puntosExtra;

    const { error } = await supabase
      .from("clientes")
      .update({ puntos: nuevosPuntos })
      .eq("id", cliente.id);

    if (error) alert("Error al actualizar puntos");
    else {
      alert(`Se agregaron ${puntosExtra} puntos a ${cliente.nombre}`);
      buscarCliente();
      setMonto("");
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "black", color: "white" }}>
      <img src="/logo.png.png" alt="Logo PA" style={{ width: "200px" }} />
      <h1>Cliente Frecuente Proyecto Anime</h1>

      <h2>Registrar Cliente</h2>
      <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} /><br />
      <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} /><br />
      <input name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} /><br />
      <button onClick={registrarCliente}>Registrar</button>

      <h2>Buscar Cliente</h2>
      <input placeholder="Buscar por nombre o teléfono" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
      <button onClick={buscarCliente}>Buscar</button>

      {resultado && resultado.length > 0 && (
        <div>
          <h3>Resultados:</h3>
          {resultado.map((cliente) => (
            <div key={cliente.id}>
              {cliente.nombre} - {cliente.telefono} - {cliente.correo} - Puntos: {cliente.puntos}
            </div>
          ))}

          <h3>Agregar puntos</h3>
          <input
            type="number"
            placeholder="Monto pagado (MXN)"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
          <button onClick={agregarPuntos}>Agregar puntos</button>
        </div>
      )}
    </div>
  );
}

export default App;
