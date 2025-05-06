import React, { useState, useEffect } from "react";
import { UserLandingWrapper } from "../../wrappers";
import { ActiveInactiveUsersChart } from "../../components/app/activeInactiveUsers";
import { GetActiveInactiveUsers } from "../../helpers/api";
import { DashboardPrimeReactSidebar } from '../../components/dashboard';
import { Button } from "primereact/button";
import { useLocation } from "wouter";

// Datos por defecto mientras el endpoint no responda o retorne sin datos
const defaultData = {
  labels: ["Active", "Inactive"],
  datasets: [
    {
      data: [50, 50],
      backgroundColor: ["#42A5F5", "#66BB6A"],
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

export const ActiveInactiveUsersScreen = () => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const [error, setError] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetActiveInactiveUsers();
        if (data) {
          setChartData(data);
          setChartOptions({
            plugins: {
              legend: {
                labels: {
                  color: '#495057'
                }
              }
            },
            scales: {
              r: {
                grid: {
                  color: '#dedede'
                },
                pointLabels: {
                  color: '#495057'
                }
              }
            }
          });
          setError(false);
        } else {
          // Si el endpoint no devuelve datos, se usan los datos por defecto
          setChartData(defaultData);
          setChartOptions(defaultOptions);
          setError(true);
        }
      } catch (err) {
        console.error("Error al cargar datos del endpoint /activeInactiveUsers:", err);
        setChartData(defaultData);
        setChartOptions(defaultOptions);
        setError(true);
      }
    };

    fetchData();
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
    setIsSidebarOpen(false);
  };

  const sidebarHeader = <h2 className="text-xl font-semibold text-red-700">Menú</h2>;

  const floatingButton = {
    position: "fixed",
    top: "100px",
    left: "1rem",
    zIndex: 40,
  };

  return (
    <UserLandingWrapper>
      <div style={floatingButton}>
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
      />
      <div className="p-4" style={{ marginTop: '20px' }}>
        <h2 className="text-3xl font-bold mb-4">Usuarios Activos vs Inactivos</h2>
        {error && (
          <p className="text-red-500 mb-3 font-semibold">
            ⚠️ No se pudieron cargar los datos del endpoint /activeInactiveUsers. Se muestran datos por defecto.
          </p>
        )}
        {chartData && chartOptions ? (
          <ActiveInactiveUsersChart data={chartData} options={chartOptions} />
        ) : (
          <p>Cargando gráfico...</p>
        )}
      </div>
    </UserLandingWrapper>
  );
};
