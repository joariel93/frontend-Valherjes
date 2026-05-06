import React, { useState } from "react";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";

const BotonFlotante = ({ onClick, visible, setVisible }) => {
  
  if (!visible) return null; // Si el botón no está visible, no renderiza nada

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Badge con la X para cerrar el botón */}
        <Badge
          value="X"
          severity="danger"
          size="small"
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            cursor: "pointer",
          }}
          onClick={() => setVisible(false)}
        />

        {/* Avatar con ícono de cerradura */}
        <Avatar
          icon="pi pi-lock"
          size="large"
          shape="circle"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            width: "5rem",
            height: "5rem"
          }}
          onClick={onClick} // Llama a la función para abrir el modal de login
        />
      </div>
    </div>
  );
};

export default BotonFlotante;
