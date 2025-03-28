import React from "react";

const Boton = ({texto,className}) => {
  const handleClick = () => {
    alert(`Tocaste el boton: ${texto}`);
  };

  return <button className={`card-btn ${className}`} onClick={handleClick}>{texto}</button>;
};

export default Boton;