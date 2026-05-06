import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { obtenerSocio } from "../../services/api";

const BuscarSocio = () => {
  const [dni, setDni] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBuscar = async () => {
    if (!dni) {
      setError("Por favor, ingresa un DNI válido.");
      return;
    }

    try {
      setError(null);
      const data = await obtenerSocio(dni);
      setResultado(data.length ? data : "No se encontró ningún socio.");
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    if (isModalVisible) {
      setDni("");
      setResultado(null);
      setError(null);
    }
  };

  const calcularEstadoPago = (ultimoPago) => {
    if (!ultimoPago) {
      return <span style={{ color: "red", fontWeight: "bold" }}>No registra pagos</span>;
    }

    // Parsear la fecha en formato DD/MM/AAAA para evitar errores de interpretación del navegador.
    const parts = ultimoPago.split('/');
    // new Date(año, mes - 1, día)
    const fechaUltimoPago = new Date(parts[2], parts[1] - 1, parts[0]);
    const fechaActual = new Date();

    // Calcular diferencia de meses
    const diferenciaMeses =
      fechaActual.getFullYear() * 12 +
      fechaActual.getMonth() -
      (fechaUltimoPago.getFullYear() * 12 + fechaUltimoPago.getMonth());

    // Formatear la fecha del último pago (mes/año)
    const formatoFecha = new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
    }).format(fechaUltimoPago);

    if (diferenciaMeses >= 2) {
      return (
        <span style={{ color: "red", fontWeight: "bold" }}>
          Atrasado (Último pago: {formatoFecha})
        </span>
      );
    } else {
      return <span style={{ color: "green", fontWeight: "bold" }}>Al día</span>;
    }
  };

  return (
    <>
      <Button label="Soy Socio" onClick={toggleModal} className="p-button-link" />
      <Dialog
        header="Buscar Socio"
        visible={isModalVisible}
        onHide={toggleModal}
        style={{ width: "90%", height: "100%", top: "0", padding: "0" }}
        closable={true}
        draggable={true}
        resizable={false}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "center",
          }}
        >
          {resultado ? (
            <div>
              {typeof resultado === "string" ? (
                <p>{resultado}</p>
              ) : (
                <ul>
                  {resultado.map((socio, index) => (
                    <li key={index}>
                      <p>
                        <strong>Socio:</strong> {socio.Apellido}, {socio.Nombre}
                      </p>
                      <p>
                        <strong>Estado de socio:</strong>{" "}
                        <br/>
                        {calcularEstadoPago(socio.UltimoPago)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <InputText
                id="dni"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                keyfilter="int"
                style={{
                  flex: "1 1 auto",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "0.5rem",
                  minWidth: "200px",
                }}
                placeholder="DNI"
              />
              <Button
                label="Buscar"
                icon="pi pi-search"
                onClick={handleBuscar}
                style={{
                  flex: "0 1 auto",
                  whiteSpace: "nowrap",
                }}
                severity="info"
              />
            </div>
          )}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
      </Dialog>
    </>
  );
};

export default BuscarSocio;
