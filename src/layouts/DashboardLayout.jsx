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
  }
];

export const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [, setLocation] = useLocation();

  const handleMenuClick = (path) => {
    if (path) setLocation(path);
    setIsSidebarOpen(false);
  };

  const sidebarHeader = (
    <h2 className="text-xl font-semibold text-red-700">Menú</h2>
  );

  const floatingButtonStyle = {
    position: "fixed",
    top: "100px",
    left: "1rem",
    zIndex: 40,
    transition: "all 0.3s ease-in-out",
    transform: isButtonHovered ? "scale(1.1)" : "scale(1)",
    boxShadow: isButtonHovered 
      ? "0 4px 15px rgba(205, 31, 50, 0.4)" 
      : "0 2px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: '50%',
  };

  const buttonClassName = `
    p-button-rounded 
    text-white 
    bg-red-600 
    hover:bg-red-700 
    focus:outline-none 
    shadow-lg
    transition-all
    duration-300
    ease-in-out
    border-none
    ${isSidebarOpen ? 'rotate-180' : ''}
  `;

  return (
    <UserLandingWrapper>
      <div 
        style={floatingButtonStyle}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        <Button
          id="sidebar-toggle"
          icon="pi pi-chevron-right"
          aria-label="Abrir menú de estadísticas"
          className={buttonClassName}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          tooltip="Menú de Estadísticas"
          tooltipOptions={{ 
            position: 'right',
            showDelay: 150,
            hideDelay: 150,
            className: 'custom-tooltip'
          }}
        />
      </div>

      <DashboardPrimeReactSidebar
        visible={isSidebarOpen}
        onHide={() => setIsSidebarOpen(false)}
        menuItems={sidebarMenuItems}
        onMenuItemClick={handleMenuClick}
        header={sidebarHeader}
        className="custom-sidebar"
      />

      <div className="p-4" style={{ marginTop: "20px" }}>
        <div className="max-w-6xl mx-auto">{children}</div>
      </div>

      <style jsx>{`
        .custom-tooltip {
          background: #cd1f32 !important;
          color: white !important;
          padding: 0.5rem 1rem !important;
          border-radius: 4px !important;
          font-size: 0.875rem !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
        }
        
        .p-button.p-button-rounded {
          width: 3rem !important;
          height: 3rem !important;
          font-size: 1.25rem !important;
          border: none !important;
          outline: none !important;
        }

        .p-button.p-button-rounded:hover {
          transform: translateY(-2px);
        }

        .p-button.p-button-rounded:active {
          transform: translateY(0);
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(205, 31, 50, 0.4), 0 0 0 0 rgba(205, 31, 50, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(205, 31, 50, 0), 0 0 0 10px rgba(205, 31, 50, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(205, 31, 50, 0), 0 0 0 0 rgba(205, 31, 50, 0);
          }
        }

        .p-button.p-button-rounded:not(:hover) {
          animation: pulse 2s infinite;
        }

        :global(.custom-sidebar) {
          background: linear-gradient(to bottom, #ffffff, #f8f9fa) !important;
          border-right: 1px solid #e9ecef !important;
          box-shadow: 4px 0 15px rgba(0, 0, 0, 0.05) !important;
        }

        :global(.custom-sidebar .p-sidebar-header) {
          padding: 1.5rem !important;
          border-bottom: 1px solid #e9ecef !important;
          background: #ffffff !important;
        }

        :global(.custom-sidebar .p-sidebar-content) {
          padding: 0 !important;
        }

        :global(.custom-sidebar .p-button.p-button-text) {
          border-radius: 8px !important;
          margin: 0.25rem 0.5rem !important;
          transition: all 0.2s ease !important;
        }

        :global(.custom-sidebar .p-button.p-button-text:hover) {
          background: rgba(205, 31, 50, 0.1) !important;
          transform: translateX(4px) !important;
        }

        :global(.custom-sidebar .p-button.p-button-text i) {
          transition: transform 0.2s ease !important;
        }

        :global(.custom-sidebar .p-button.p-button-text:hover i) {
          transform: scale(1.1) !important;
        }
      `}</style>
    </UserLandingWrapper>
  );
};
