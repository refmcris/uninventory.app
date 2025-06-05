import React from 'react';
import { Chart } from 'primereact/chart';
import PropTypes from 'prop-types';

export const ActiveInactiveLoansChart = ({ data, options }) => {
    return (
        <Chart type="pie" data={data} options={{
            ...options,
            plugins: {
                ...options.plugins,
                legend: {
                    ...options.plugins.legend,
                    position: 'right'
                }
            }
        }} />
    );
};

ActiveInactiveLoansChart.propTypes = {
    data: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired
};