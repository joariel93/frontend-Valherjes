'use client';

import { useEffect, useState, use } from 'react';
import { Panel } from 'primereact/panel';
import { formatDate } from '@/utils/dateUtils';
import { fetchNoticiaById } from '@/services/api';
import PageSkeleton from '@/components/Basics/PageSkeleton';

export default function NoticiaPage({ params }) {
  const id = use(params).id;
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarNoticia = async () => {
      try {
        const data = await fetchNoticiaById(id);
        setNoticia(data);
      } catch (error) {
        console.error('Error al cargar la noticia:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarNoticia();
  }, [id]);

  if (loading) {
    return <PageSkeleton type='card' count={3} />;
  }

  if (!noticia) {
    return <div>Noticia no encontrada</div>;
  }

  return (
    <div className="p-4 mx-auto" style={{ maxWidth: '100%', width: '800px' }}>
      <Panel className="mb-4 w-full overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{noticia.Titulo}</h1>
          <p className="text-gray-600">{formatDate(noticia.FechaPublicacion)}</p>
          {noticia.LinkFoto && (
            <img
              src={noticia.LinkFoto}
              alt={noticia.Titulo}
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
            />
          )}
          <div style={{ whiteSpace: 'pre-line', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
            {noticia.Contenido}
          </div>
        </div>
      </Panel>
    </div>
  );
}