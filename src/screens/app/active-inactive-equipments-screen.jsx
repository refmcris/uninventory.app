import React, { useState, useEffect } from "react";
import { ActiveInactiveEquipmentsChart } from "../../components/app/activeInactiveEquipments";
import { GetActiveInactiveEquipments } from "../../helpers/api";
import { DashboardLayout } from "../../layouts";

// Datos por defecto mientras el endpoint no responda o retorne sin datos
const defaultData = {
  labels: ["Active", "Inactive"],
  datasets: [
    {
      data: [50, 50],
      backgroundColor: ["#42A5F5", "#66BB6A"]
    }
  ]
};

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top"
    }
  }
};

export const ActiveInactiveEquipmentsScreen = () => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetActiveInactiveEquipments();
        if (data) {
          setChartData(data);
          setChartOptions({
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: "#495057"
                }
              }
            },
            scales: {
              r: {
                grid: {
                  color: "#dedede"
                },
                pointLabels: {
                  color: "#495057"
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
        console.error(
          "Error al cargar datos del endpoint /activeInactiveEquipments:",
          err
        );
        setChartData(defaultData);
        setChartOptions(defaultOptions);
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-4">Equipos Activos vs Inactivos</h2>
      {error && (
        <p className="text-red-500 mb-3 font-semibold">
          ⚠️ No se pudieron cargar los datos del endpoint
          /activeInactiveEquipments. Se muestran datos por defecto.
        </p>
      )}
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        style={{ height: "400px" }}
      >
        {chartData && chartOptions ? (
          <ActiveInactiveEquipmentsChart
            data={chartData}
            options={chartOptions}
          />
        ) : (
          <p>Cargando gráfico...</p>
        )}
      </div>
    </DashboardLayout>
  );
};
