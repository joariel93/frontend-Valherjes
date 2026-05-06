"use client";

import React from "react";
import Link from "next/link";
import { Menubar } from "primereact/menubar";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import BuscarSocio from "@/components/Specifics/BuscarSocio"
import { useAuth } from '@/context/AuthContext';

const Navbar = ({ setShowFloatingButton }) => {
  const { userRole, setUserRole, isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    confirmDialog({
      message: "¿Estás seguro de que deseas cerrar sesión?",
      header: "Confirmar cierre de sesión",
      className: "custom-confirm-dialog",
      icon: "pi pi-info-circle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
        sessionStorage.removeItem("authToken");
        setUserRole(null);
        setIsAuthenticated(false);
        setShowFloatingButton(true);
      },
    });
  };

  const menuItems = [
    {
      label: "Home",
      template: (item) => (
        <Link href="/" className="p-menuitem-link">
          {item.label}
        </Link>
      )
    },
    {
      label: "Sedes",
      template: (item) => (
        <Link href="/sedes" className="p-menuitem-link">
          {item.label}
        </Link>
      )
    },
    {
      label: "Noticias",
      template: (item) => (
        <Link href="/noticias" className="p-menuitem-link">
          {item.label}
        </Link>
      )
    },
    {
      label: "Próximos Eventos",
      template: (item) => (
        <Link href="/eventos" className="p-menuitem-link">
          {item.label}
        </Link>
      )
    },
    {
      label: "Sobre Nosotros",
      template: (item) => (
        <Link href="/sobre-nosotros" className="p-menuitem-link">
          {item.label}
        </Link>
      )
    },
  ];

  // Verificar si el usuario está autenticado y tiene un rol
  if (isAuthenticated && userRole) {

    // Agrega botones según el rol del usuario
    if (userRole === "Redactor") {
      menuItems.push(
        {
          label: "Administrar Noticias",
          template: (item) => (
            <Link href="/abm-noticias" className="p-menuitem-link">
              {item.label}
            </Link>
          )
        },
        {
          label: "Administrar Eventos",
          template: (item) => (
            <Link href="/abm-eventos" className="p-menuitem-link">
              {item.label}
            </Link>
          )
        }
      );
    } else if (userRole === "Tesorero") {
      menuItems.push(
        {
          label: "Administrar Pagos",
          template: (item) => (
            <Link href="/abm-pagos" className="p-menuitem-link">
              {item.label}
            </Link>
          )
        }
      );
    } else if (userRole === "Administrador") {
      menuItems.push(
        {
          label: "Administrar Noticias",
          template: (item) => (
            <Link href="/abm-noticias" className="p-menuitem-link">
              {item.label}
            </Link>
          )
        },
        {
          label: "Administrar Eventos",
          template: (item) => (
            <Link href="/abm-eventos" className="p-menuitem-link">
              {item.label}
            </Link>
          )
        },
        {
          label: "Administrar Pagos",
          template: (item) => (
            <Link href="/abm-pagos" className="p-menuitem-link">
              {item.label}
            </Link>
          )
        },
        {
          label: "Administrar Socios",
          template: (item) => (
            <Link href="/abm-socios" className="p-menuitem-link">
              {item.label}
            </Link>
          )
        },
        {
          label: "Administrar Roles",
          template: (item) => (
            <Link href="/abm-roles" className="p-menuitem-link">
              {item.label}
            </Link>
          )
        },
        {
          label: "Administrar Sedes",
          template: (item) => (
            <Link href="/abm-sedes" className="p-menuitem-link">
              {item.label}
            </Link>
          )
        }
      );
    }

    // Agrega el botón de cerrar sesión
    menuItems.push({
      label: "Cerrar Sesión",
      icon: "pi pi-sign-out",
      command: handleLogout,
      className: "text-danger",
    });
  }

  const start = <Link href="/"><img id="logoNav" alt="logo" src="/logo.svg" height="40" className="mr-2 p-1"
  /></Link>;
  const end = (
    <div className="flex gap-2">
      <BuscarSocio />
    </div>
  );

  return (
    <>
      <Menubar model={menuItems} start={start} end={end} />
      <ConfirmDialog className="custom-confirm-dialog" />
    </>
  );
};

export default Navbar;
