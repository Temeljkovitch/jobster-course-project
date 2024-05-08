import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useSelector } from "react-redux";
import BarChartComponent from "./BarChart";
import AreaChartComponent from "./AreaChart";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const {  monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Change to Area Chart" : "Change to Bar Chart"}
      </button>
      {barChart ? <BarChartComponent data={monthlyApplications} /> : <AreaChartComponent data={monthlyApplications} />}
    </Wrapper>
  );
};

export default ChartsContainer;
