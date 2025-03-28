import React from "react";

const BotonSumar = () => {
  const handleClick = () => {
    const num1 = 25;
    const num2 = 27;
    alert(`La suma es: ${num1 + num2}`);
  };

  return <button onClick={handleClick}>Sumar</button>;
};

export default BotonSumar;