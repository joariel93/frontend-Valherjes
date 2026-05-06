"use client"
import React, { useState, useEffect } from "react";
import EventosBanner from "@/components/Basics/EventosBanner";
import { fetchEventos, fetchUltimasNoticias } from "@/services/api";
import NoticiasCarousel from "@/components/Basics/NoticiasCarousel";
import Image from "next/image";
import "@/styles/Main.css";
import PageSkeleton from "@/components/Basics/PageSkeleton";

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventoss = async () => {
      try {
        const response = await fetchEventos();
        if (!response) {
          throw new Error("Error al obtener los eventos");
        }
        setEventos(response);
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchNoticias = async () => {
      const response = await fetchUltimasNoticias();
      setNoticias(response);
    };
    fetchEventoss();
    fetchNoticias();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-none">
        {loading ? (
          <PageSkeleton type='card' count={3} />
        ) : eventos.length > 0 ? (
          <EventosBanner eventos={eventos} />
        ) : (
          <p>No hay eventos disponibles</p>
        )}
      </div>

      <main className="flex-1 flex flex-col justify-between overflow-hidden">
        <div className="logoContainer flex-none">
          <Image
            src="/valherjes.png"
            alt="logo"
            width={500}
            height={500}
            className="logo"
            priority
          />
        </div>
        <div className="flex-1 min-h-0">
          <NoticiasCarousel noticias={noticias} />
        </div>
      </main>
    </div>
  );
}