'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { fetchSedes } from '@/services/api';
import PageSkeleton from '@/components/Basics/PageSkeleton';

// Nota: agregar fetchSedes pública en api.js (ver sección 5.6)

export default function SedesPage() {
    const [sedes, setSedes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarSedes = async () => {
            try {
                const data = await fetchSedes();
                setSedes(data);
            } catch (error) {
                console.error('Error al cargar sedes:', error);
            } finally {
                setLoading(false);
            }
        };
        cargarSedes();
    }, []);

    if (loading) return <PageSkeleton type="cards" count={3} />;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Nuestras Sedes</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {sedes.map((sede) => (
                    <div key={sede.id} style={{ flex: '1 1 300px', maxWidth: '100%' }}>
                        <Card title={sede.Nombre} className="h-full">
                            <p><i className="pi pi-map-marker mr-2" />{sede.Direccion}</p>
                            <p><i className="pi pi-phone mr-2" />{sede.NumeroContacto}</p>
                            <p><i className="pi pi-clock mr-2" />{sede.DiasHorarios}</p>
                            {sede.LinkDireccion && (
                                <Button
                                    label="Ver en mapa"
                                    icon="pi pi-external-link"
                                    className="p-button-outlined mt-3"
                                    onClick={() => window.open(sede.LinkDireccion, '_blank')}
                                />
                            )}
                        </Card>
                    </div>
                ))}
            </div>
            {sedes.length === 0 && <p>No hay sedes registradas.</p>}
        </div>
    );
}
