import React from "react";
import { LandingWrapper } from "../../wrappers";
import { Button } from "primereact/button";

export const HomeScreen = () => {
  return (
    <LandingWrapper>
      <section className="w-11p y-8 md:py-8 relative overflow-hidden mt-5rem">
        <div className="grid grid-nogutter max-w-screen-lg mx-auto px-4">
          <div className="col-12 md:col-6 flex flex-column justify-content-center text-left">
            <h1 className="text-900 font-bold text-4xl md:text-5xl mb-3">
              Optimiza la Gestión de Equipos de Laboratorio
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              Uninventory facilita el préstamo y seguimiento de equipos
              electrónicos de laboratorio de manera eficiente, simple y
              transparente.
            </p>

            <div className="flex  gap-4 mt-4">
              <div className="flex align-items-center">
                <i className="pi pi-check-circle text-xl mr-2 text-red-600"></i>
                <span className="text-gray-800">Reservas Fáciles</span>
              </div>
              <div className="flex align-items-center">
                <i className="pi pi-check-circle text-xl mr-2 text-red-600"></i>
                <span className="text-gray-800">
                  Disponibilidad en Tiempo Real
                </span>
              </div>
              <div className="flex align-items-center">
                <i className="pi pi-check-circle text-xl mr-2 text-red-600"></i>
                <span className="text-gray-800">Análisis de Uso</span>
              </div>
            </div>
          </div>

          <div className="col-12 md:col-6 flex align-items-center justify-content-center">
            <img
              src="https://source.unsplash.com/600x400/?laboratory,technology"
              alt="Gestión de Equipos de Laboratorio"
              className="w-full max-w-30rem rounded-lg shadow-lg"
              // por agregar imagen para el hero
            />
          </div>
        </div>
      </section>
    </LandingWrapper>
  );
};
