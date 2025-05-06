import React, { useState, useEffect } from "react";
import { UserLandingWrapper } from "../../wrappers";
import { MostUsedEquipmentsChart } from "../../components/mostUsedEquipments";
import { GetEquipment } from "../../helpers/api"; // Endpoint /mostUsedEquipments
import { Button } from "primereact/button";
import { DashboardPrimeReactSidebar } from '../../components/dashboard/dashboard-primereact-sidebar';
import "primeicons/primeicons.css";
import { useLocation } from "wouter";

export const MostUsedEquipmentsScreen = () => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const [error, setError] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [, setLocation] = useLocation();

  // Datos por defecto mientras el endpoint no responda o retorne sin datos
  const defaultData = {
    labels: ["Osciloscopio", "Multímetro", "Fuente DC", "Generador de señales"],
    datasets: [
      {
        label: "Uso de Equipos",
        data: [50, 30, 20, 40],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#AB47BC"],
      },
    ],
  };

  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await GetEquipment();
        if (response && response.chartData && response.chartOptions) {
          setChartData(response.chartData);
          setChartOptions(response.chartOptions);
        } else {
          // Si el endpoint no devuelve datos, se usan los datos por defecto
          setChartData(defaultData);
          setChartOptions(defaultOptions);
          setError(true);
        }
      } catch (err) {
        console.error("Error al cargar datos del endpoint /mostUsedEquipments:", err);
        setChartData(defaultData);
        setChartOptions(defaultOptions);
        setError(true);
      }
    };

    fetchChartData();
  }, []);

  const sidebarMenuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "pi pi-th-large",
    },
    {
      label: "Equipos Más Usados",
      path: "/mostUsedEquipments",
      icon: "pi pi-star",
    },
    {
      label: "Equipos Activos/Inactivos",
      path: "/activeInactiveEquipments",
      icon: "pi pi-box",
    },
    {
      label: "Préstamos Activos/Inactivos",
      path: "/activeInactiveLoans",
      icon: "pi pi-clock",
    },
    {
      label: "Usuarios Activos/Inactivos",
      path: "/activeInactiveUsers",
      icon: "pi pi-users",
    },
  ];

      const handleMenuClick = (path) => {
        if (path) setLocation(path);
        setIsSidebarOpen(false); // Cierra el sidebar
    };

    const sidebarHeader = (
        <h2 className="text-xl font-semibold text-red-700">Menú</h2>
    );

    const floatingButton =  {
        position: 'fixed',
        top: '100px',
        left: '1rem',
        zIndex: 40,
    }

  return (
    <UserLandingWrapper>
          {/* Botón de Toggle para el Sidebar - Envuelto en un div con estilos inline para probar posicionamiento */}
            <div style={floatingButton}>
                <Button
                    icon="pi pi-chart-bar"
                    aria-label="Abrir menú de estadísticas"
                    // Clases de estilo (sin posicionamiento):
                    className="p-button-rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg"
                    onClick={() => setIsSidebarOpen(true)}
                />
            </div>

            {/* Usamos el componente Sidebar */}
            <DashboardPrimeReactSidebar
                visible={isSidebarOpen}
                onHide={() => setIsSidebarOpen(false)}
                menuItems={sidebarMenuItems}
                onMenuItemClick={handleMenuClick}
                header={sidebarHeader}
            />
      <div className="p-4" style={{ marginTop: '20px' }}>
        <h2 className="text-3xl font-bold mb-4">Equipos Más Usados</h2>
        {error && (
          <p className="text-red-500 mb-3 font-semibold">
            ⚠️ No se pudieron cargar los datos del endpoint /mostUsedEquipments. Se muestran datos por defecto.
          </p>
        )}
        {chartData && chartOptions ? (
          <MostUsedEquipmentsChart data={chartData} options={chartOptions} />
        ) : (
          <p>Cargando gráfico...</p>
        )}
      </div>
    </UserLandingWrapper>
  );
};
