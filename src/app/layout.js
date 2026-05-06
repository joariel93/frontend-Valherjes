"use client";

import React, { useState } from "react";
import { Toast } from "primereact/toast"; // Para mostrar mensajes de toast
import { ConfirmDialog } from 'primereact/confirmdialog'; // Importar ConfirmDialog
import { Panel } from "primereact/panel"; // Usar Panel de PrimeReact para un footer estilizado
import { Avatar } from "primereact/avatar"; // Importamos Avatar de PrimeReact
import { AvatarGroup } from 'primereact/avatargroup';
import "./globals.css";
import Navbar from "@/components/Basics/NavBar"; // Importa el Navbar
import BotonFlotante from "@/components/Basics/BotonFlotante";
import ModalLogin from "@/components/Specifics/ModalLogin";
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false); // Controla visibilidad del modal
  const [showFloatingButton, setShowFloatingButton] = useState(true);

  const goToSocialMedia = (url) => {
    window.open(url, '_blank');
  };

  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Sitio web del Club Valherjes" />
        <meta name="keywords" content="Valherjes, Combate Medieval" />
        <link rel="icon" href="/logo.svg" type="image/x-icon"></link>

        <title>Valherjes</title>
      </head>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
        <Toast />
        <ConfirmDialog />
        <Navbar 
        setShowFloatingButton={setShowFloatingButton}
        />
        <main className="flex-grow">{children}</main>
        {/* Botón flotante que abre el modal */}
        <BotonFlotante 
        onClick={() => setIsLoginModalVisible(true)} 
        visible={showFloatingButton}
        setVisible={setShowFloatingButton}
        />
        {/* Modal de inicio de sesión */}
        <ModalLogin
          visible={isLoginModalVisible}
          onHide={() => setIsLoginModalVisible(false)}
          setShowFloatingButton={setShowFloatingButton}
        />
        <footer className="mt-auto">
          <Panel className="p-2">
            <div className="flex flex-between items-center">
              <p className="whitespace-nowrap" style={{ fontSize: "75%" }}>© 2025 Valherjes. Todos los derechos reservados.</p>
              {/* AvatarGroup con Avatares para Instagram y Facebook */}
              <AvatarGroup className="flex gap-4" style={{ display: "inline-flex", marginLeft: "10px", width: "100%", justifyContent: "space-evenly" }}>
                <Avatar
                  icon="pi pi-instagram"
                  size="normal"
                  shape="circle"
                  style={{ cursor: "pointer" }}
                  onClick={() => goToSocialMedia("https://www.instagram.com/combatemedievalargentina/")}
                />
                <Avatar
                  icon="pi pi-facebook"
                  size="normal"
                  shape="circle"
                  style={{ cursor: "pointer" }}
                  onClick={() => goToSocialMedia("https://www.facebook.com/ValherjesCombateMedieval/")}
                />
              </AvatarGroup>
            </div>
          </Panel>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
