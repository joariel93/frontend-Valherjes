'use client';

import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import Image from 'next/image';
import PageSkeleton from '@/components/Basics/PageSkeleton';

export default function SobreNosotrosPage() {
    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Sobre Nosotros</h1>

            <div className="flex justify-center mb-4">
                <Image src="/valherjes.png" alt="Logo Valherjes"
                    width={200} height={200} />
            </div>

            <Panel header="¿Quiénes Somos?" className="mb-4">
                <p>
                    {/* TODO: Reemplazar con el texto real del club */}
                    Valherjes es un club dedicado al combate medieval en Argentina.
                    Nuestros miembros entrenan y compiten en torneos de combate
                    medieval siguiendo las reglas internacionales de la disciplina.
                </p>
            </Panel>

            <Panel header="Nuestra Historia" className="mb-4">
                <p>
                    {/* TODO: Reemplazar con la historia real del club */}
                    Fundado con la pasión por las artes marciales históricas europeas,
                    Valherjes reúne a peleadores de todo el país.
                </p>
            </Panel>

            <div className="grid">
                <div className="col-12 md:col-4">
                    <Card title="Combate Medieval">
                        <p>Entrenamiento en técnicas de combate con armadura completa.</p>
                    </Card>
                </div>
                <div className="col-12 md:col-4">
                    <Card title="Comunidad">
                        <p>Una familia de guerreros unidos por la misma pasión.</p>
                    </Card>
                </div>
                <div className="col-12 md:col-4">
                    <Card title="Competencias">
                        <p>Participación en torneos nacionales e internacionales.</p>
                    </Card>
                </div>
            </div>

            <Panel header="Contacto" className="mt-4">
                <p><i className="pi pi-instagram mr-2" />
                    <a href="https://www.instagram.com/combatemedievalargentina/"
                        target="_blank">@combatemedievalargentina</a></p>
                <p><i className="pi pi-facebook mr-2" />
                    <a href="https://www.facebook.com/ValherjesCombateMedieval/"
                        target="_blank">Valherjes Combate Medieval</a></p>
            </Panel>
        </div>
    );
}
