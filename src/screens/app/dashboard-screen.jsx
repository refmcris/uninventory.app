import React, { useState, useEffect, useRef } from "react";
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
import { Calendar } from "primereact/calendar";
import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";
import { getLoanTrends } from "../../helpers/mockDashboardApi";

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
        backgroundColor: ["#42A5F5", "#66BB6A"],
        borderWidth: 1
      }
    ]
  }
};

const defaultChartOptionsBarLine = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#495057",
        font: {
          size: 14
        }
      }
    },
    title: {
      display: true,
      font: {
        size: 16,
        weight: 'bold'
      },
      color: "#495057"
    }
  },
  scales: {
    x: { grid: { color: "#dedede" } },
    y: { beginAtZero: true, grid: { color: "#dedede" } }
  }
};

const defaultChartOptionsPie = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#495057",
        font: {
          size: 14
        }
      }
    },
    title: {
      display: true,
      font: {
        size: 16,
        weight: 'bold'
      },
      color: "#495057"
    }
  }
};

const defaultTrendData = {
  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Préstamos realizados",
      data: [12, 19, 15, 22, 30, 25, 28],
      fill: false,
      borderColor: "#cd1f32",
      tension: 0.4
    }
  ]
};

export const DashboardScreen = () => {
  const [stats, setStats] = useState({
    availableEquipments: "N/A",
    activeLoans: "N/A",
    registeredUsers: "N/A",
    loanHistory: "N/A"
  });
  const [chartData, setChartData] = useState({
    mostUsed: defaultChartData.equipments,
    equipments: defaultChartData.activeInactive,
    loans: defaultChartData.activeInactive,
    users: defaultChartData.activeInactive
  });
  const [trendData, setTrendData] = useState(defaultTrendData);
  const [apiFailed, setApiFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({
    equipments: false,
    loans: false,
    users: false
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const toastRef = useRef();

  // Obtener nombre de usuario
  const session = JSON.parse(localStorage.getItem("session"));
  const userName = session?.fullName || "Usuario";

  useEffect(() => {
    let cancelled = false;
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setErrors({ equipments: false, loans: false, users: false });
        setApiFailed(false);

        // Fetch all data in parallel
        const [
          equipmentsData,
          usersData,
          activeInactiveEquipments,
          activeInactiveLoans,
          activeInactiveUsers
        ] = await Promise.all([
          GetEquipment(),
          GetUsers(),
          GetActiveInactiveEquipments(),
          GetActiveInactiveLoans(),
          GetActiveInactiveUsers()
        ]);

        // Update stats
        if (!cancelled && equipmentsData && Array.isArray(equipmentsData)) {
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

        // Update charts with error handling for each
        const newChartData = {
          mostUsed: defaultChartData.equipments,
          equipments: (activeInactiveEquipments && activeInactiveEquipments.datasets && activeInactiveEquipments.datasets[0]?.data?.length)
            ? activeInactiveEquipments
            : defaultChartData.activeInactive,
          loans: (activeInactiveLoans && activeInactiveLoans.datasets && activeInactiveLoans.datasets[0]?.data?.length)
            ? activeInactiveLoans
            : defaultChartData.activeInactive,
          users: (activeInactiveUsers && activeInactiveUsers.datasets && activeInactiveUsers.datasets[0]?.data?.length)
            ? activeInactiveUsers
            : defaultChartData.activeInactive
        };

        if (!cancelled) {
          setChartData(newChartData);
          setErrors({
            equipments: !activeInactiveEquipments || !activeInactiveEquipments.datasets || !activeInactiveEquipments.datasets[0]?.data?.length,
            loans: !activeInactiveLoans || !activeInactiveLoans.datasets || !activeInactiveLoans.datasets[0]?.data?.length,
            users: !activeInactiveUsers || !activeInactiveUsers.datasets || !activeInactiveUsers.datasets[0]?.data?.length
          });
        }

        // Tendencia de préstamos
        let trend;
        try {
          trend = await getLoanTrends({ startDate, endDate });
        } catch {
          trend = [];
        }
        if (!cancelled && trend && Array.isArray(trend) && trend.length > 0) {
          setTrendData({
            labels: trend.map((t) => t.month),
            datasets: [
              {
                label: "Préstamos realizados",
                data: trend.map((t) => t.value),
                fill: false,
                borderColor: "#cd1f32",
                tension: 0.4
              }
            ]
          });
        } else if (!cancelled) {
          setTrendData(defaultTrendData);
        }
      } catch {
        if (!cancelled) {
          setApiFailed(true);
          setChartData({
            mostUsed: defaultChartData.equipments,
            equipments: defaultChartData.activeInactive,
            loans: defaultChartData.activeInactive,
            users: defaultChartData.activeInactive
          });
          setTrendData(defaultTrendData);
          setErrors({ equipments: true, loans: true, users: true });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAllData();
    return () => { cancelled = true; };
  }, [startDate, endDate]);

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
      <Toast ref={toastRef} />
      
      {/* Bienvenida personalizada */}
      <div className="w-full mb-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Bienvenido, {userName}!</h2>
          <p className="text-gray-500 text-lg">Aquí puedes visualizar el estado general y las tendencias del laboratorio.</p>
        </div>
      </div>

      {/* Filtros y notificaciones */}
      <div className="w-full py-8">
        <div style={{ width: '500px' }} className="mx-auto">
          <div className="mb-4">
            <h3 className="text-gray-700 text-lg">Filtrar por fecha:</h3>
          </div>
          <div className="flex items-center gap-4">
            <Calendar
              value={startDate}
              onChange={(e) => setStartDate(e.value)}
              placeholder="Fecha inicial"
              showIcon
              className="w-[200px]"
              readOnlyInput
            />
            <span className="font-semibold text-gray-700">a</span>
            <Calendar
              value={endDate}
              onChange={(e) => setEndDate(e.value)}
              placeholder="Fecha final"
              showIcon
              className="w-[200px]"
              readOnlyInput
            />
          </div>
        </div>
      </div>

      {/* Gráfica de tendencias */}
      <div className="w-full mb-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md" style={{ height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2.5rem 2rem' }}>
            <MostUsedEquipmentsChart
              data={trendData}
              options={{
                ...defaultChartOptionsBarLine,
                plugins: {
                  ...defaultChartOptionsBarLine.plugins,
                  title: {
                    ...defaultChartOptionsBarLine.plugins.title,
                    text: "Evolución de Préstamos"
                  }
                }
              }}
              type="line"
              height={400}
              width={900}
            />
          </div>
        </div>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="w-full mb-6 px-4 flex justify-center">
        <div className="max-w-5xl w-full flex flex-wrap justify-center gap-6">
          {[
            {
              title: "Equipos Disponibles",
              value: stats.availableEquipments,
              icon: "pi pi-box",
              color: "bg-blue-100 text-blue-700",
              tooltip: "Cantidad de equipos actualmente disponibles para préstamo."
            },
            {
              title: "Préstamos Activos",
              value: stats.activeLoans,
              icon: "pi pi-clock",
              color: "bg-green-100 text-green-700",
              tooltip: "Cantidad de préstamos actualmente activos."
            },
            {
              title: "Usuarios Registrados",
              value: stats.registeredUsers,
              icon: "pi pi-users",
              color: "bg-purple-100 text-purple-700",
              tooltip: "Cantidad total de usuarios registrados en el sistema."
            }
          ].map((card, index) => (
            <Tooltip key={index} target={`#card-tooltip-${index}`} content={card.tooltip} position="top" />,
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition-shadow"
              style={{ width: '300px' }}
              id={`card-tooltip-${index}`}
            >
              <div className={`flex items-center justify-between p-4 ${card.color} rounded-lg`}>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                  <p className="text-3xl font-bold">{card.value}</p>
                </div>
                <i className={`${card.icon} text-4xl opacity-80`} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Gráficos de Estado */}
      <div className="w-full mb-6 px-4 flex justify-center">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center">
          {/* Equipos Más Usados */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <i className="pi pi-bar-chart text-blue-600" /> Equipos Más Usados
              <span className="ml-2" data-pr-tooltip="Muestra los equipos con mayor uso en el laboratorio"><i className="pi pi-question-circle text-gray-400" /></span>
            </h3>
            {apiFailed && (
              <p className="text-yellow-600 text-sm mb-4">
                ⚠️ Mostrando datos por defecto
              </p>
            )}
            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 0' }}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <ProgressSpinner />
                </div>
              ) : (
                <MostUsedEquipmentsChart
                  data={chartData.mostUsed || defaultChartData.equipments}
                  options={{
                    ...defaultChartOptionsBarLine,
                    plugins: {
                      ...defaultChartOptionsBarLine.plugins,
                      title: {
                        ...defaultChartOptionsBarLine.plugins.title,
                        text: "Distribución de Uso de Equipos"
                      }
                    }
                  }}
                  type="bar"
                />
              )}
            </div>
          </div>

          {/* Equipos Activos/Inactivos */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <i className="pi pi-circle-on text-green-600" /> Estado de Equipos
              <span className="ml-2" data-pr-tooltip="Proporción de equipos activos e inactivos"><i className="pi pi-question-circle text-gray-400" /></span>
            </h3>
            {(errors.equipments || apiFailed) && (
              <p className="text-yellow-600 text-sm mb-4">
                ⚠️ Mostrando datos por defecto
              </p>
            )}
            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 0' }}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <ProgressSpinner />
                </div>
              ) : (
                <ActiveInactiveEquipmentsChart
                  data={chartData.equipments || defaultChartData.activeInactive}
                  options={{
                    ...defaultChartOptionsPie,
                    plugins: {
                      ...defaultChartOptionsPie.plugins,
                      title: {
                        ...defaultChartOptionsPie.plugins.title,
                        text: "Estado Actual de Equipos"
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>

          {/* Préstamos Activos/Inactivos */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <i className="pi pi-book text-orange-600" /> Estado de Préstamos
              <span className="ml-2" data-pr-tooltip="Proporción de préstamos activos e inactivos"><i className="pi pi-question-circle text-gray-400" /></span>
            </h3>
            {(errors.loans || apiFailed) && (
              <p className="text-yellow-600 text-sm mb-4">
                ⚠️ Mostrando datos por defecto
              </p>
            )}
            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 0' }}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <ProgressSpinner />
                </div>
              ) : (
                <ActiveInactiveLoansChart
                  data={chartData.loans || defaultChartData.activeInactive}
                  options={{
                    ...defaultChartOptionsPie,
                    plugins: {
                      ...defaultChartOptionsPie.plugins,
                      title: {
                        ...defaultChartOptionsPie.plugins.title,
                        text: "Estado Actual de Préstamos"
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>

          {/* Usuarios Activos/Inactivos */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <i className="pi pi-users text-purple-600" /> Estado de Usuarios
              <span className="ml-2" data-pr-tooltip="Proporción de usuarios activos e inactivos"><i className="pi pi-question-circle text-gray-400" /></span>
            </h3>
            {(errors.users || apiFailed) && (
              <p className="text-yellow-600 text-sm mb-4">
                ⚠️ Mostrando datos por defecto
              </p>
            )}
            <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 0' }}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <ProgressSpinner />
                </div>
              ) : (
                <ActiveInactiveUsersChart
                  data={chartData.users || defaultChartData.activeInactive}
                  options={{
                    ...defaultChartOptionsPie,
                    plugins: {
                      ...defaultChartOptionsPie.plugins,
                      title: {
                        ...defaultChartOptionsPie.plugins.title,
                        text: "Estado Actual de Usuarios"
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
