import React from 'react';
import { Chart } from 'primereact/chart';
import PropTypes from 'prop-types';

export const ActiveInactiveUsersChart = ({ data, options }) => {
    // Transformar los datos para el gráfico de barras horizontales
    const barData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Cantidad de Usuarios',
                data: data.datasets[0].data,
                backgroundColor: ['#42A5F5', '#66BB6A'],
                borderWidth: 1,
                borderRadius: 5,
                barPercentage: 0.8
            }
        ]
    };

    return (
        <Chart type="bar" data={barData} options={{
            ...options,
            indexAxis: 'y', // Hace que las barras sean horizontales
            plugins: {
                ...options.plugins,
                legend: {
                    ...options.plugins.legend,
                    display: false // Ocultamos la leyenda ya que los colores están en las etiquetas
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Usuarios: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }} />
    );
};

ActiveInactiveUsersChart.propTypes = {
    data: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired
};