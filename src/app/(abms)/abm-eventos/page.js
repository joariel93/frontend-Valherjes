'use client';

import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { useState, useEffect } from 'react';
import AbmGrid from '@/components/Basics/AbmGrid';
import AbmForm from '@/components/Basics/AbmForm';
import BotonCrearAbm from '@/components/Basics/BotonCrearAbm';
import { fetchEventos, crearEvento, actualizarEvento, eliminarEvento } from '@/services/api';
import PageSkeleton from '@/components/Basics/PageSkeleton';

export default function AbmEventos() {
  const [eventos, setEventos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carga de lista de eventos al iniciar
  const fetchEventosList = async () => {
    try {
      const eventosData = await fetchEventos();
      setEventos(eventosData);
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventosList();
  }, []);

  const columns = [
    { field: "Nombre", header: "Nombre" },
    { field: "Fecha", header: "Fecha" },
    { field: "Link", header: "Link al  evento" }
  ]

  // Campos para formulario de creación
  const createFormFields = [
    {
      name: "Nombre",
      label: "Nombre del evento",
      type: "text",
      rules: { required: 'El nombre del evento es obligatorio' }
    },
    {
      name: "Fecha",
      label: "Fecha del evento",
      type: "date",
      rules: { required: 'La fecha del evento es obligatoria' }
    },
    {
      name: "Link",
      label: "Link al evento",
      type: "text",
      rules: { required: 'El link al evento es obligatorio' }
    }
  ]

  // Campos para el formulario de edición
  const editFormFields = [
    ...createFormFields
  ]

  const handleNewClick = () => {
    setSelectedEvento(null);
    setVisible(true);
  }

  const handleSubmit = async (data) => {
    const isEdit = !!selectedEvento;
    try {
      if (isEdit) {
        await actualizarEvento({ ...data, id: selectedEvento.id });
      } else {
        await crearEvento(data);
      }
      fetchEventosList(); // Actualizamos la lista de eventos
      setVisible(false);
      setSelectedEvento(null);
      return true;
    } catch (error) {
      console.error(`Error al ${isEdit ? 'actualizar' : 'crear'} el evento:`, error);
      return false;
    }
  }

  const handleDelete = async (id) => {
    try {
      await eliminarEvento(id);
      fetchEventosList(); // Actualizamos la lista de eventos
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
    }
  }

  if (loading) return <PageSkeleton type='list' count={3} />;

  return (
    <ProtectedRoute requiredRole={["Administrador", "Redactor"]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Administración de Eventos</h1>
        <div>
          <BotonCrearAbm
            label="Nuevo"
            entity="Evento"
            onClick={handleNewClick}
            severity="success" />
        </div>
        <AbmGrid
          columns={columns}
          data={eventos}
          onDelete={handleDelete}
          onEdit={(evento) => { setSelectedEvento(evento); setVisible(true); }} />
        <AbmForm
          visible={visible}
          onHide={() => { setVisible(false); setSelectedEvento(null); }}
          onSubmit={handleSubmit}
          fields={selectedEvento ? editFormFields : createFormFields}
          initialData={selectedEvento}
          title={selectedEvento ? "Editar Evento" : "Nuevo Evento"}
          isEdit={!!selectedEvento} />
      </div>
    </ProtectedRoute>
  );
}
