'use client';

import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import AbmGrid from '@/components/Basics/AbmGrid';
import NoticiaForm from '@/components/Specifics/NoticiaForm';
import BotonCrearAbm from '@/components/Basics/BotonCrearAbm';
import { crearNoticia, actualizarNoticia, eliminarNoticia, fetchNoticias } from '@/services/api';
import { useState, useEffect } from 'react';
import PageSkeleton from '@/components/Basics/PageSkeleton';

export default function AbmNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedNoticia, setSelectedNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const noticiasData = await fetchNoticias();
      setNoticias(noticiasData);
    } catch (error) {
      console.error('Error al obtener las noticias:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "Titulo", header: "Título" },
    { field: "Contenido", header: "Contenido" },
    {
      field: 'Fecha',
      header: 'Fecha',
      body: (rowData) => rowData.FechaPublicacion ? new Date(rowData.FechaPublicacion).toLocaleDateString() : '-'
    }
  ]

  const handleNewClick = () => {
    setSelectedNoticia(null);
    setVisible(true);
  }

  const handleSubmit = async (data) => {
    try {
      if (selectedNoticia) {
        await actualizarNoticia({ ...data, id: selectedNoticia.id });
      } else {
        await crearNoticia(data);
      }
      fetchData();
      setSelectedNoticia(null);
      return true;
    } catch (error) {
      console.error('Error al guardar la noticia:', error);
      return false;
    }
  }

  const handleDelete = async (id) => {
    try {
      await eliminarNoticia(id);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar la noticia:', error);
    }
  }

  if (loading)
    return <PageSkeleton type='list' count={3} />;

  return (
    <ProtectedRoute requiredRole={["Administrador", "Redactor"]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Administración de Noticias</h1>
        <div className="p-1">
          <BotonCrearAbm
            label="Nueva"
            entity="Noticia"
            onClick={handleNewClick}
            severity='success'
            className="mb-3"
          />
          <AbmGrid
            columns={columns}
            data={noticias}
            onDelete={handleDelete}
            onEdit={(noticia) => {
              setSelectedNoticia(noticia);
              setVisible(true);
            }}
            fetchData={fetchData}
          />
          <NoticiaForm
            visible={visible}
            onHide={() => {
              setSelectedNoticia(null);
              setVisible(false);
            }}
            onSubmit={handleSubmit}
            initialData={selectedNoticia}
            title={selectedNoticia ? "Editar Noticia" : "Nueva Noticia"}
            isEdit={!!selectedNoticia}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
