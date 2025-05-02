import React from 'react';
import { Chart } from 'primereact/chart';

export const ActiveInactiveLoansChart = ({ data, options }) => {
    return (
        <Chart type="polarArea" data={data} options={options} />
    );
}