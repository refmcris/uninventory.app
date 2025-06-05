import React from 'react';
import { Chart } from 'primereact/chart';
import PropTypes from 'prop-types';

export const ActiveInactiveEquipmentsChart = ({ data, options }) => {
    return (
        <Chart type="doughnut" data={data} options={{
            ...options,
            cutout: '60%',
            plugins: {
                ...options.plugins,
                legend: {
                    ...options.plugins.legend,
                    position: 'bottom'
                }
            }
        }} />
    );
};

ActiveInactiveEquipmentsChart.propTypes = {
    data: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired
};