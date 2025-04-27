import React, { useState, useEffect } from "react";
import { UserLandingWrapper } from "../../wrappers";
import { GetEquipment } from "../../helpers/api";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DashboardPrimeReactSidebar } from '../../components/dashboard';
import "primeicons/primeicons.css";
import { useLocation } from "wouter";
import { GetUsers } from "../../helpers/api";

export const DashboardScreen = () => {
  const [stats, setStats] = useState({
    availableEquipments: "N/A",
    activeLoans: "N/A",
    registeredUsers: "N/A",
    loanHistory: "N/A",
  });
  const [error, setError] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar la visibilidad
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Function to fetch data from API and handle errors
        const fetchDataFromAPI = async (apiCall, dataKey) => {
          try {
            const response = await apiCall();
            if (!response || !Array.isArray(response)) {
              console.warn(
                `No data or invalid data received from ${dataKey} API`
              );
              return null;
            }
            return response;
          } catch (error) {
            console.error(`Error fetching ${dataKey} data:`, error);
            return null;
          }
        };

        // Fetch equipments data
        const equipmentsData = await fetchDataFromAPI(
          GetEquipment,
          "equipments"
        );

        // Fetch users data
        const usersData = await fetchDataFromAPI(
          GetUsers,
          "users"
        );

        // Calculate statistics based on API data
        const availableEquipmentsCount = equipmentsData
          ? equipmentsData.filter((e) => e.status === "available").length
          : null;
        const activeLoansCount = equipmentsData
          ? equipmentsData.filter((e) => e.status === "in_use").length
          : null;
        const registeredUsersCount = usersData ? usersData.length : null;

        // Update state with fetched statistics or "N/A" if fetch fails
        setStats({
          availableEquipments: availableEquipmentsCount !== null
            ? availableEquipmentsCount
            : "N/A",
          activeLoans: activeLoansCount !== null ? activeLoansCount : "N/A",
          registeredUsers: registeredUsersCount !== null
            ? registeredUsersCount
            : "N/A",
          loanHistory: "N/A", // No data for loan history yet
        });
        setError(false);
      } catch (fetchError) {
        console.error("Error loading data:", fetchError);
        setError(true);
        // If a general error occurs, set all stats to "N/A"
        setStats({
          availableEquipments: "N/A",
          activeLoans: "N/A",
          registeredUsers: "N/A",
          loanHistory: "N/A",
        });
      }
    };
    fetchData();
  }, []);

  // Definición de items para el sidebar
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

  // Datos para las tarjetas de estadísticas
  const cardData = [
    {
      title: "Equipos Disponibles",
      value: stats.availableEquipments,
      icon: "pi pi-box",
    },
    {
      title: "Préstamos Activos",
      value: stats.activeLoans,
      icon: "pi pi-clock",
    },
    {
      title: "Usuarios Activos",
      value: stats.registeredUsers,
      icon: "pi pi-users",
    },
  ];

  // Navegación al hacer clic en el menú del sidebar
  const handleMenuClick = (path) => {
    if (path) setLocation(path);
    setIsSidebarOpen(false); // Cierra el sidebar
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
      {/* Botón de Toggle para el Sidebar - Envuelto en un div con estilos inline para probar posicionamiento */}
      <div style={floatingButton}>
        <Button
          icon="pi pi-chart-bar"
          aria-label="Abrir menú de estadísticas"
          // Clases de estilo (sin posicionamiento):
          className="p-button-rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg"
          onClick={() => setIsSidebarOpen(true)} // Abre el sidebar
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

      {/* Contenido Principal */}
      {/* El padding top sigue siendo necesario para el HeaderUser */}
      <div className="pt-[96px] p-4 md:p-8">
        <div className="w-full max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline">
                No se pudieron cargar los datos del dashboard.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {cardData.map((item, index) => (
              <Card
                key={index}
                className="p-4 shadow-lg transition-shadow hover:shadow-xl rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-4xl font-bold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                  <i className={`${
                    item.icon
                  } text-3xl text-red-600 opacity-80`}></i>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </UserLandingWrapper>
  );
};
