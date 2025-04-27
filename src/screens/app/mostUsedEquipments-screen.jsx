import React, { useState, useEffect } from "react";
import { UserLandingWrapper } from "../../wrappers";
import { MostUsedEquipmentsChart } from "../../components/mostUsedEquipments";
import { GetEquipment } from "../../helpers/api"; // Endpoint /mostUsedEquipments
import "primeicons/primeicons.css";

export const MostUsedEquipmentsScreen = () => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const [error, setError] = useState(false);

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

  return (
    <UserLandingWrapper>
      <div className="p-4">
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
