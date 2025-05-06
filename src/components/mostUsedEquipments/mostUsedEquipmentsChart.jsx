import { Chart } from "primereact/chart";
import PropTypes from "prop-types";

export const MostUsedEquipmentsChart = ({ data, options }) => {
  return <Chart type="bar" data={data} options={options} />;
};

MostUsedEquipmentsChart.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};
