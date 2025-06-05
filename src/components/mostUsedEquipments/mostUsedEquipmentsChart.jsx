import { Chart } from "primereact/chart";
import PropTypes from "prop-types";

export const MostUsedEquipmentsChart = ({ data, options, type = "bar", height, width }) => {
  return <Chart type={type} data={data} options={options} height={height} width={width} />;
};

MostUsedEquipmentsChart.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  type: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
