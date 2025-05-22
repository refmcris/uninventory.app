import React, { useState } from "react";
import { Button } from "primereact/button";
import { DashboardPrimeReactSidebar } from "../components/dashboard";
import { useLocation } from "wouter";
import { UserLandingWrapper } from "../wrappers";

const sidebarMenuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "pi pi-th-large"
  },
  {
    label: "Equipos Activos/Inactivos",
    path: "/equipment-management",
    icon: "pi pi-box"
  },

  {
    label: "Usuarios Activos/Inactivos",
    path: "/dashboard-usuarios",
    icon: "pi pi-users"
  },
  {
    label: "Prestamos Activos/Inactivos",
    path: "/loans-management",
    icon: "pi pi-desktop"
  }
];

export const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleMenuClick = (path) => {
    if (path) setLocation(path);
    setIsSidebarOpen(false);
  };

  const sidebarHeader = (
    <h2 className="text-xl font-semibold text-red-700">Menú</h2>
  );

  const floatingButton = {
    position: "fixed",
    top: "90px",
    left: "1rem",
    zIndex: 1001
  };

  return (
    <UserLandingWrapper>
      <div style={floatingButton} className="inline-flex">
        <Button
          icon="pi pi-chart-bar"
          aria-label="Abrir menú de estadísticas"
          className="p-button-rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg"
          onClick={() => setIsSidebarOpen(true)}
        />
      </div>

      <DashboardPrimeReactSidebar
        visible={isSidebarOpen}
        onHide={() => setIsSidebarOpen(false)}
        menuItems={sidebarMenuItems}
        onMenuItemClick={handleMenuClick}
        header={sidebarHeader}
        className="z-1000"
      />

      <div className="p-2 md:p-4" style={{ marginTop: "20px" }}>
        <div className="max-w-full md:max-w-6xl mx-auto">{children}</div>
      </div>
    </UserLandingWrapper>
  );
};
