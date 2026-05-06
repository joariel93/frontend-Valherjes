'use client';

import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import AbmGrid from '@/components/Basics/AbmGrid';
import SocioForm from '@/components/Specifics/SocioForm';
import BotonCrearAbm from '@/components/Basics/BotonCrearAbm';
import { crearSocio, actualizarSocio, eliminarSocio, fetchSocios, fetchPeleadoresActivos, fetchInfoInscripcion, fetchRoles } from '@/services/api';
import { useState, useEffect } from 'react';
import PageSkeleton from '@/components/Basics/PageSkeleton';

export default function AbmSocios() {
  const [socios, setSocios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [sociosData, rolesData] = await Promise.all([fetchSocios(), fetchRoles()]);
      setSocios(sociosData);
      setRoles(rolesData.map(rol => ({
        label: rol.Nombre,
        value: rol.id
      })));
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "Socio", header: "Socio" },
    { field: "Rol", header: "Rol" },
    { field: "EsPeleadorActivo", header: "Peleador Activo" },
    { field: 'UltimoPago', header: 'Último Pago' },
    {
      field: 'Apodo',
      header: 'Apodo',
      body: (rowData) => rowData.Apodo || '-'
    }
  ]

  const handleNewClick = () => {
    setSelectedSocio(null);
    setVisible(true);
  }

  const handleSubmit = async (data) => {
    const formattedData = {
      ...data,
      Dni: data.Dni ? parseInt(data.Dni) : null,
      RolId: parseInt(data.RolId),
      EsPeleadorActivo: data.EsPeleadorActivo ? 1 : 0
    };

    try {
      if (selectedSocio) {
        await actualizarSocio({ ...formattedData, id: selectedSocio.id });
      } else {
        await crearSocio(formattedData);
      }
      fetchData(); // Actualizamos los datos de la grilla
      setSelectedSocio(null)
      return true; // Indicamos que la operación fue exitosa
    } catch (error) {
      console.error('Error al guardar el socio:', error);
      return false; // Indicamos que hubo un error
    }
  }

  const handleDelete = async (id) => {
    try {
      await eliminarSocio(id);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar el socio:', error);
    }
  }

  if (loading)
    return <PageSkeleton type='list' count={10} />;

  return (
    <ProtectedRoute requiredRole={["Administrador"]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Administración de Socios</h1>
        <div className="p-1">
          <BotonCrearAbm
            label="Nuevo"
            entity="Socio"
            onClick={handleNewClick}
            severity='success'
            className="mb-3"
          />
          <AbmGrid
            columns={columns}
            data={socios}
            onDelete={handleDelete}
            onEdit={(socio) => {
              setSelectedSocio(socio);
              setVisible(true);
            }}
            fetchData={fetchData}
          />
          <SocioForm
            visible={visible}
            onHide={() => {
              setSelectedSocio(null);
              setVisible(false);
            }}
            onSubmit={handleSubmit}
            rolesOptions={roles}
            initialData={selectedSocio}
            title={selectedSocio ? "Editar Socio" : "Nuevo Socio"}
            isEdit={!!selectedSocio}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
