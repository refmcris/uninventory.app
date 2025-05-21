import React, { useState, useEffect } from "react";
import {
  GetEquipment,
  GetUsers,
  GetActiveInactiveEquipments,
  GetActiveInactiveLoans,
  GetActiveInactiveUsers
} from "../../helpers/api";
import { Card } from "primereact/card";
import { DashboardLayout } from "../../layouts";
import { MostUsedEquipmentsChart } from "../../components/mostUsedEquipments";
import { ActiveInactiveEquipmentsChart } from "../../components/app/activeInactiveEquipments";
import { ActiveInactiveLoansChart } from "../../components/app/activeInactiveLoans";
import { ActiveInactiveUsersChart } from "../../components/app/activeInactiveUsers";
import { ProgressSpinner } from "primereact/progressspinner";

// Datos por defecto para los gráficos
const defaultChartData = {
  equipments: {
    labels: ["Osciloscopio", "Multímetro", "Fuente DC", "Generador de señales"],
    datasets: [
      {
        label: "Uso de Equipos",
        data: [50, 30, 20, 40],
        backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#AB47BC"]
      }
    ]
  },
  activeInactive: {
    labels: ["Activo", "Inactivo"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#42A5F5", "#66BB6A"]
      }
    ]
  }
};

const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#495057"
      }
    }
  }
};

export const DashboardScreen = () => {
  const [stats, setStats] = useState({
    availableEquipments: "N/A",
    activeLoans: "N/A",
    registeredUsers: "N/A",
    loanHistory: "N/A"
  });
  const [chartData, setChartData] = useState({
    mostUsed: null,
    equipments: null,
    loans: null,
    users: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Fetch equipments data
        const equipmentsData = await GetEquipment();
        const usersData = await GetUsers();
        const activeInactiveEquipments = await GetActiveInactiveEquipments();
        const activeInactiveLoans = await GetActiveInactiveLoans();
        const activeInactiveUsers = await GetActiveInactiveUsers();

        // Update stats
        if (equipmentsData && Array.isArray(equipmentsData)) {
          setStats({
            availableEquipments: equipmentsData.filter(
              (e) => e.status === "available"
            ).length,
            activeLoans: equipmentsData.filter((e) => e.status === "in_use")
              .length,
            registeredUsers: usersData?.length || "N/A",
            loanHistory: "N/A"
          });
        }

        // Update charts
        setChartData({
          mostUsed: defaultChartData.equipments,
          equipments:
            activeInactiveEquipments || defaultChartData.activeInactive,
          loans: activeInactiveLoans || defaultChartData.activeInactive,
          users: activeInactiveUsers || defaultChartData.activeInactive
        });

        setError(false);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const cardData = [
    {
      title: "Equipos Disponibles",
      value: stats.availableEquipments,
      icon: "pi pi-box",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Préstamos Activos",
      value: stats.activeLoans,
      icon: "pi pi-clock",
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Usuarios Registrados",
      value: stats.registeredUsers,
      icon: "pi pi-users",
      color: "bg-purple-100 text-purple-700"
    }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <ProgressSpinner />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>
            Hubo un problema al cargar los datos del dashboard. Algunos datos
            podrían no estar actualizados.
          </p>
        </div>
      )}

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {cardData.map((card, index) => (
          <Card
            key={index}
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            <div
              className={`flex items-center justify-between p-4 ${card.color} rounded-lg`}
            >
              <div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
              <i className={`${card.icon} text-4xl opacity-80`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipos Más Usados */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Equipos Más Usados</h3>
          <div style={{ height: "300px" }}>
            {chartData.mostUsed && (
              <MostUsedEquipmentsChart
                data={chartData.mostUsed}
                options={defaultChartOptions}
              />
            )}
          </div>
        </div>

        {/* Equipos Activos/Inactivos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Estado de Equipos</h3>
          <div style={{ height: "300px" }}>
            {chartData.equipments && (
              <ActiveInactiveEquipmentsChart
                data={chartData.equipments}
                options={defaultChartOptions}
              />
            )}
          </div>
        </div>

        {/* Préstamos Activos/Inactivos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Estado de Préstamos</h3>
          <div style={{ height: "300px" }}>
            {chartData.loans && (
              <ActiveInactiveLoansChart
                data={chartData.loans}
                options={defaultChartOptions}
              />
            )}
          </div>
        </div>

        {/* Usuarios Activos/Inactivos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Estado de Usuarios</h3>
          <div style={{ height: "300px" }}>
            {chartData.users && (
              <ActiveInactiveUsersChart
                data={chartData.users}
                options={defaultChartOptions}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
