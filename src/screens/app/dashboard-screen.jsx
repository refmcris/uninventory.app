// ----------- DashboardScreen.jsx -----------
import React, { useState, useEffect } from "react";
import { UserLandingWrapper } from "../../wrappers";
import { DashboardSidebar } from "../../components/dashboard"; // ¡Necesitarás actualizar este archivo también! (Ver Paso 2)
import { GetEquipment } from "../../helpers/api";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { useLocation } from "wouter";

export const DashboardScreen = () => {
  const [stats, setStats] = useState({
    availableEquipments: "Cargando...", activeLoans: "Cargando...",
    registeredUsers: "Cargando...", loanHistory: "Cargando...",
  });
  const [error, setError] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipments = await GetEquipment();
        if (!Array.isArray(equipments)) {
          console.error("Respuesta API no válida:", equipments);
          throw new Error("Formato de datos inesperado.");
        }
        setStats({
          availableEquipments: equipments.filter(e => e.status === "available").length || 0,
          activeLoans: equipments.filter(e => e.status === "in_use").length || 0,
          registeredUsers: equipments.length || 0,
          loanHistory: equipments.length * 2 || 0,
        });
        setError(false);
      } catch (fetchError) {
        console.error("Error cargando datos:", fetchError);
        setError(true);
        setStats({ availableEquipments: "N/A", activeLoans: "N/A", registeredUsers: "N/A", loanHistory: "N/A"});
      }
    };
    fetchData();
  }, []);

  const sidebarMenuItems = [
    { label: "Dashboard", path: "/dashboard", icon: "pi pi-th-large" },
    { label: "Equipos Disponibles", path: "/dashboard/equipos", icon: "pi pi-box" },
    { label: "Equipos Más Usados", path: "/dashboard/equipos-mas-usados", icon: "pi pi-star" },
    { label: "Préstamos Activos", path: "/dashboard/prestamos", icon: "pi pi-clock" },
    { label: "Usuarios Registrados", path: "/dashboard/usuarios", icon: "pi pi-users" },
    { label: "Historial Préstamos", path: "/dashboard/historial", icon: "pi pi-history" },
  ];

  const cardData = [
    { title: "Equipos Disponibles", value: stats.availableEquipments, icon: "pi pi-box" },
    { title: "Préstamos Activos", value: stats.activeLoans, icon: "pi pi-clock" },
    { title: "Usuarios Registrados", value: stats.registeredUsers, icon: "pi pi-users" },
    { title: "Historial de Préstamos", value: stats.loanHistory, icon: "pi pi-history" },
  ];

  const handleMenuClick = (path) => {
    if (path) setLocation(path);
    setIsSidebarOpen(false);
  };

  return (
    <UserLandingWrapper>
      {/* Botón flotante (z-30) - Sin cambios, funcional */}
      <Button
        icon="pi pi-bars"
        aria-label="Abrir menú de navegación"
        className="fixed top-5 left-5 z-30 p-button-rounded p-button-lg shadow-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        style={{ backgroundColor: "#cd1f32", borderColor: "#cd1f32" }}
        onClick={() => setIsSidebarOpen(true)}
      />

      {/* Sidebar - Requiere actualización interna para z-index más alto */}
      <DashboardSidebar
        menuItems={sidebarMenuItems}
        isOpen={isSidebarOpen}
        onMenuClick={handleMenuClick}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Contenido Principal */}
      {/* --- REVERTIDO: Sin 'relative' ni 'z-0' aquí --- */}
      <div className="p-4 md:p-8 pt-20">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>

        {/* Mensaje de Error */}
        {/* --- REVERTIDO: Sin 'relative' ni 'z-0' aquí --- */}
        {error && (
           <div
             className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" // Clases originales del error
             role="alert"
           >
             <strong className="font-bold">Error:</strong>
             <span className="block sm:inline"> No se pudieron cargar completamente los datos del dashboard.</span>
           </div>
        )}

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cardData.map((item, index) => (
            <Card key={index} className="p-4 shadow-lg transition-shadow hover:shadow-xl">
               <div className="flex items-center justify-between">
                 <div>
                   <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                   <p className="text-3xl font-bold text-gray-900 mt-1">{item.value}</p>
                 </div>
                 {item.icon && <i className={`${item.icon} text-3xl text-red-600`} />}
               </div>
            </Card>
          ))}
        </div>
      </div>
    </UserLandingWrapper>
  );
};