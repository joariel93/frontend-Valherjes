import React, { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { tryLogin } from "@/services/api"
import "../../styles/ConfirmDialog.css"
import { useAuth } from '@/context/AuthContext';

const ModalLogin = ({ visible, onHide, setShowFloatingButton }) => {
  const toast = useRef(null);
  const { setUserRole, setIsAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Por favor, completa ambos campos.");
      return;
    }

    try {
      setError("");
      const response = await tryLogin({ username, password });
      if (response.token && response.role) {
        // Guarda el token en sessionStorage
        sessionStorage.setItem("authToken", response.token);

        // Establece el rol del usuario
        setUserRole(response.role);
        setIsAuthenticated(true);
        setShowFloatingButton(false);
        toast.current.show({
          severity: "success",
          summary: "Login exitoso",
          detail: "Se ha logueado correctamente.",
          life: 3000,
          position: "bottom",
        });

        onHide(); // Cierra el modal después del login exitoso
      } else {
        setError("El usuario o contraseña ingresado no es válido.");
      }
    } catch (err) {
      setError("Ha ocurrido un error al obtener las credenciales.");
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Iniciar Sesión"
        visible={visible}
        onHide={onHide}
        style={{
          width: "95vw",
          height: "95vw"
        }}
        draggable={false}
        resizable={false}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div className="p-fluid"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div className="p-field">
              <FloatLabel>
                <label htmlFor="username">Usuario</label>
                <InputText
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FloatLabel>
            </div>

            <div className="p-field">
              <FloatLabel>
                <label htmlFor="password">Contraseña</label>
                <Password
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  feedback={false}
                  toggleMask
                  placeholder="Contraseña"
                />
              </FloatLabel>
            </div>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

            <Button
              label="Iniciar Sesión"
              icon="pi pi-sign-in"
              onClick={handleLogin}
              style={{ marginTop: "20px" }}
              severity="success"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ModalLogin;
