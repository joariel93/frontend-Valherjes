'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { useRouter } from 'next/navigation';
import { fetchNoticias } from '@/services/api';
import { formatDate } from '@/utils/dateUtils';
import PageSkeleton from '@/components/Basics/PageSkeleton';

export default function NoticiasPage() {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const cargarNoticias = async () => {
            try {
                const data = await fetchNoticias();
                setNoticias(data);
            } catch (error) {
                console.error('Error al cargar noticias:', error);
            } finally {
                setLoading(false);
            }
        };
        cargarNoticias();
    }, []);

    if (loading) return <PageSkeleton type="cards" count={6} />;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Noticias</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {noticias.map((noticia) => {
                    const header = noticia.LinkFoto ? (
                        <img alt={noticia.Titulo} src={noticia.LinkFoto}
                            className="w-full h-48 object-cover" />
                    ) : null;

                    return (
                        <div key={noticia.id} className="h-full">
                            <Card
                                title={noticia.Titulo}
                                subTitle={formatDate(noticia.FechaPublicacion)}
                                header={header}
                                className="h-full cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => router.push(`/noticias/${noticia.id}`)}
                            >
                                <p className="line-clamp-3">
                                    {noticia.Contenido?.substring(0, 150)}...
                                </p>
                            </Card>
                        </div>
                    );
                })}
            </div>
            {noticias.length === 0 && <p>No hay noticias disponibles.</p>}
        </div>
    );
}
