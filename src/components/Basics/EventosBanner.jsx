import React, {useState, useEffect} from "react";
import {Carousel} from "primereact/carousel";
import "@/styles/EventosBanner.css";
import { formatDate } from "@/utils/dateUtils";

const EventosBanner = ({eventos}) => {
    useEffect(() => {
      }, [eventos]);
  const responsiveOptions = [
    {
        breakpoint: "1024px",
        numVisible: 3,
        numScroll: 1,
    },
    {
        breakpoint: "768px",
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: "560px",
        numVisible: 1,
        numScroll: 1,
    },
  ]

  const eventTemplate = (event) => {
    return (
      <div className="event-card"
      onClick={() => window.open(event.Link, "_blank")}
      role="button"
      tabIndex={0}
      >
        <span className="event-date">{formatDate(event.FechaDate)} - {event.Nombre}</span>
      </div>
    );
  };


  return (
    <div className="eventos-banner">
      <span className="eventos-title">Próximos eventos:</span>
      <Carousel
        value={eventos}
        numVisible={3}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        itemTemplate={eventTemplate}
        circular
        autoplayInterval={3000}
        showNavigators={false}
        showIndicators={false}
      />
    </div>
  );
};

export default EventosBanner;