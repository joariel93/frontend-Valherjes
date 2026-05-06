'use client';

import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import AbmGrid from '@/components/Basics/AbmGrid';
import AbmForm from '@/components/Basics/AbmForm';
import BotonCrearAbm from '@/components/Basics/BotonCrearAbm';
import { crearRol, actualizarRol, eliminarRol, fetchRoles } from '@/services/api';
import { useState, useEffect } from 'react';
import PageSkeleton from '@/components/Basics/PageSkeleton';

export default function AbmRols() {
  const [roles, setRoles] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRol, setSelectedRol] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const rolesData = await fetchRoles();
      const normalizedRoles = Array.isArray(rolesData[0]) ? rolesData[0] : rolesData;
      setRoles(normalizedRoles);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const formFields = [
    {
      name: "Nombre",
      label: "Nombre",
      type: "text",
      rules: { required: 'El nombre es obligatorio' }
    },
    {
      name: "Descripcion",
      label: "Descripcion",
      type: "text",
      rules: { required: 'La descripcion es obligatoria' }
    }
  ]

  const columns = [
    { field: "Nombre", header: "Nombre" },
    { field: "Descripcion", header: "Descripcion" }
  ]

  const handleNewClick = () => {
    setSelectedRol(null);
    setVisible(true);
  }

  const handleSubmit = async (data) => {
    try {
      if (selectedRol)
        await actualizarRol({ ...data, id: selectedRol.id });
      else
        await crearRol(data);

      setVisible(false);
      fetchData();
    } catch (error) {
      console.error('Error :', error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await eliminarRol(id);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
    }
  }

  if (loading)
    return <PageSkeleton type='list' count={3} />;

  return (
    <ProtectedRoute requiredRole={["Administrador"]}>
      <div className="p-4" style={{ maxWidth: '100vw' }}>
        <h1 className="text-2xl font-bold mb-4">Administración de Roles</h1>
        <div className="p-1">
          <BotonCrearAbm
            label="Nuevo"
            entity="Rol"
            onClick={handleNewClick}
            severity='success'
            className="mb-3"
          />
          <AbmGrid
            columns={columns}
            data={roles}
            onDelete={handleDelete}
            onEdit={(rol) => {
              setSelectedRol(rol);
              setVisible(true);
            }}
            fetchData={fetchData}
          />
          <AbmForm
            visible={visible}
            onHide={() => setVisible(false)}
            onSubmit={handleSubmit}
            fields={formFields}
            initialValues={selectedRol}
            initialData={selectedRol}
            title={selectedRol ? "Editar Rol" : "Nuevo Rol"}
            isEdit={!!selectedRol}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
