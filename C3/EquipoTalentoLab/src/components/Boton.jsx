import React from "react";

const Boton = ({texto,id}) => {
  const cambiarFondo = () => {
    const btn = document.getElementById(`btn-interes-${id}`);
    btn.style.backgroundColor =  generarColorHex()
  };

  return <button id={`btn-interes-${id}`} className="btn-interes" onClick={cambiarFondo}>{texto}</button>;
};

export default Boton;

function generarColorHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}