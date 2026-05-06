'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { fetchEventos } from '@/services/api';
import { formatDate } from '@/utils/dateUtils';
import PageSkeleton from '@/components/Basics/PageSkeleton';

export default function EventosPage() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarEventos = async () => {
            try {
                const data = await fetchEventos();
                setEventos(data);
            } catch (error) {
                console.error('Error al cargar eventos:', error);
            } finally {
                setLoading(false);
            }
        };
        cargarEventos();
    }, []);

    if (loading) return <PageSkeleton type="cards" count={6} />;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Próximos Eventos</h1>
            <div className="grid">
                {eventos.map((evento) => (
                    <div key={evento.id} className="col-12 md:col-6 lg:col-4 p-2">
                        <Card
                            title={evento.Nombre}
                            subTitle={formatDate(evento.FechaDate)}
                            className="h-full"
                        >
                            {evento.Link && (
                                <Button
                                    label="Ver evento"
                                    icon="pi pi-external-link"
                                    className="p-button-outlined"
                                    onClick={() => window.open(evento.Link, '_blank')}
                                />
                            )}
                        </Card>
                    </div>
                ))}
            </div>
            {eventos.length === 0 && <p>No hay eventos próximos.</p>}
        </div>
    );
}
