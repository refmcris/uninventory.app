import React from "react";
import { LandingWrapper } from "../../wrappers";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import {
  FaClock,
  FaLaptop,
  FaChartLine,
  FaCogs,
  FaUsers,
  FaShieldAlt
} from "react-icons/fa";
import { useLocation } from "wouter";

export const HomeScreen = () => {
  const [l, setLocation] = useLocation();
  return (
    <LandingWrapper>
      <div
        className="grid grid-nogutter surface-0 text-800"
        style={{ paddingTop: "5rem" }}
      >
        <div className="col-12 md:col-6 p-4 md:p-6 text-center md:text-left flex align-items-center">
          <section>
            <span
              className="block mb-3 text-3xl md:text-6xl"
              style={{ fontFamily: "Bebas Neue, sans-serif", color: "black" }}
            >
              OPTIMIZA LA GESTIÓN DE EQUIPOS DEL LABORATORIO
            </span>
            <p
              className="mt-0 mb-4 text-700 line-height-3 text-base md:text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <strong>Uninventory</strong> es tu plataforma aliada para
              controlar y gestionar equipos electrónicos en laboratorios
              universitarios. Simplifica préstamos, evita pérdidas y mejora la
              experiencia de estudiantes y docentes.
            </p>
            <Button
              label="¡Reserva ahora!"
              type="button"
              className="mr-3 p-button-raised p-button-lg w-full md:w-auto"
              style={{ backgroundColor: "#cd1f32", border: "none" }}
              onClick={() => setLocation("/login")}
            />
          </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden flex justify-content-center md:justify-content-end items-center">
          <Image
            src="src/image/imagenInicio.png"
            alt="Laboratorio con tecnología"
            className="block w-full md:w-auto h-auto max-h-80 md:max-h-full"
            width="1001"
            height="667"
          />
        </div>
      </div>

      <div className="grid grid-nogutter text-center py-6 px-2 md:px-4 bg-gray-100">
        <div className="col-12 md:col-4 mb-4">
          <FaClock size={40} color="#cd1f32" />
          <h3 className="mt-3">Ahorra Tiempo</h3>
          <p>Gestión automática de préstamos y devoluciones.</p>
        </div>
        <div className="col-12 md:col-4 mb-4">
          <FaLaptop size={40} color="#cd1f32" />
          <h3 className="mt-3">100% Digital</h3>
          <p>Disponible desde cualquier dispositivo conectado.</p>
        </div>
        <div className="col-12 md:col-4 mb-4">
          <FaChartLine size={40} color="#cd1f32" />
          <h3 className="mt-3">Transparencia Total</h3>
          <p>Visualiza el estado y disponibilidad en tiempo real.</p>
        </div>
      </div>

      <div className="grid grid-nogutter text-center py-6 px-2 md:px-4">
        <div className="col-12 mb-6">
          <h2
            style={{
              fontFamily: "Bebas Neue",
              fontSize: "48px",
              color: "#cd1f32"
            }}
          >
            ¿Por qué elegir Uninventory?
          </h2>
        </div>

        <div className="col-12 md:col-4 p-4">
          <FaCogs size={40} color="#cd1f32" />
          <h4 className="mt-3">Automatización total</h4>
          <p>Desde el registro hasta el historial, todo está conectado.</p>
        </div>
        <div className="col-12 md:col-4 p-4">
          <FaUsers size={40} color="#cd1f32" />
          <h4 className="mt-3">Diseñado para todos</h4>
          <p>Fácil de usar tanto para docentes como estudiantes.</p>
        </div>
        <div className="col-12 md:col-4 p-4">
          <FaShieldAlt size={40} color="#cd1f32" />
          <h4 className="mt-3">Seguridad ante todo</h4>
          <p>Acceso protegido y control de usuarios.</p>
        </div>
      </div>

      <div className="text-center p-6">
        <h2
          style={{
            fontFamily: "Bebas Neue",
            fontSize: "48px",
            marginBottom: "1rem"
          }}
        >
          ¡Haz parte de la nueva era de gestión tecnológica!
        </h2>
        <p
          style={{ fontFamily: "Poppins", maxWidth: "600px", margin: "0 auto" }}
        >
          Ya seas estudiante o docente, Uninventory te da las herramientas para
          trabajar de forma más organizada, segura y eficiente.
        </p>
        <Button
          label="Probar Gratis"
          type="button"
          className="mt-4 p-button-raised p-button-lg"
          style={{ backgroundColor: "#cd1f32", border: "none" }}
        />
      </div>

      <footer
        className="text-center p-4 text-600 bg-gray-200"
        style={{ fontFamily: "Poppins" }}
      >
        © {new Date().getFullYear()} Uninventory — Proyecto académico
        desarrollado en la Universidad del Valle.
      </footer>
    </LandingWrapper>
  );
};
