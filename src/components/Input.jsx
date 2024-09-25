import React from "react";

export default function Input({ type, placeholder, disabled }) {
  const [inputType, setInputType] = React.useState(type);

  const handleType = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div>
      <input
        type={inputType}
        placeholder={placeholder}
        disabled={disabled}
        className="text-gris-900    placeholder-gris-200 
      disabled:bg-gris-100
      border-2
      border-gris-200 
      rounded 
      w-64
      "
      />
      {type === "password" && (
        <button
          onClick={handleType}
          className="bg-verde-600 hover:text-verde-900 rounded w-32"
        >
          {inputType === "text" ? "Ocultar" : "Mostrar"}
        </button>
      )}
    </div>
  );
}

// tailwind: --color del disabled --color del placeholder --color del texto --color del botón -Largo y ancho del input (h no)
