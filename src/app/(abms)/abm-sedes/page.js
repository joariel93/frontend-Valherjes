'use client';

import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { useState, useEffect } from 'react';
import AbmGrid from '@/components/Basics/AbmGrid';
import AbmForm from '@/components/Basics/AbmForm';
import BotonCrearAbm from '@/components/Basics/BotonCrearAbm';
import { crearSede, actualizarSede, eliminarSede } from '@/services/api';
import PageSkeleton from '@/components/Basics/PageSkeleton';

// Función local para obtener sedes (necesita auth)
const fetchSedesAdmin = async () => {
  const { getAPIInstance } = await import('@/services/api');
  const api = await getAPIInstance();
  const { data } = await api.get("/api/sedes-obtener");
  return data;
};

export default function AbmSedes() {
  const [sedes, setSedes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedSede, setSelectedSede] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const sedesData = await fetchSedesAdmin();
      setSedes(sedesData);
    } catch (error) {
      console.error('Error al obtener las sedes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const columns = [
    { field: "Nombre", header: "Nombre" },
    { field: "Direccion", header: "Dirección" },
    { field: "NumeroContacto", header: "Contacto" },
    { field: "DiasHorarios", header: "Días y Horarios" }
  ];

  const formFields = [
    {
      name: "Nombre", label: "Nombre", type: "text",
      rules: { required: 'El nombre es obligatorio' }
    },
    {
      name: "Direccion", label: "Dirección", type: "text",
      rules: { required: 'La dirección es obligatoria' }
    },
    {
      name: "NumeroContacto", label: "Número de Contacto", type: "text",
      rules: { required: 'El número es obligatorio' }
    },
    {
      name: "LinkDireccion", label: "Link Google Maps", type: "text",
      rules: { required: 'El link es obligatorio' }
    },
    {
      name: "DiasHorarios", label: "Días y Horarios", type: "text",
      rules: { required: 'Los horarios son obligatorios' }
    }
  ];

  const handleNewClick = () => { setSelectedSede(null); setVisible(true); };

  const handleSubmit = async (data) => {
    try {
      if (selectedSede)
        await actualizarSede({ ...data, id: selectedSede.id });
      else
        await crearSede(data);
      fetchData();
      setVisible(false);
      setSelectedSede(null);
      return true;
    } catch (error) {
      console.error('Error al guardar la sede:', error);
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      await eliminarSede(id);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar la sede:', error);
    }
  };

  if (loading) return <PageSkeleton type="list" />;

  return (
    <ProtectedRoute requiredRole={["Administrador"]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Administración de Sedes</h1>
        <BotonCrearAbm label="Nueva" entity="Sede"
          onClick={handleNewClick} severity="success" />
        <AbmGrid columns={columns} data={sedes}
          onDelete={handleDelete}
          onEdit={(sede) => { setSelectedSede(sede); setVisible(true); }}
          fetchData={fetchData} />
        <AbmForm visible={visible}
          onHide={() => { setVisible(false); setSelectedSede(null); }}
          onSubmit={handleSubmit} fields={formFields}
          initialData={selectedSede}
          title={selectedSede ? "Editar Sede" : "Nueva Sede"}
          isEdit={!!selectedSede} />
      </div>
    </ProtectedRoute>
  );
}
