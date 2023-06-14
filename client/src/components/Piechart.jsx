import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import { pieData } from "../api/index";

const PieContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Piechart = ({ day, id }) => {
  const [state, setState] = useState([]);
  const [time, setTime] = useState([]);
  const [chartTitle, setChartTitle] = useState("");

  const fetchData = async () => {
    const type = [];
    const timeD = [];
    let data;
    if (day) {
      data = { date: new Date().toISOString(), empid: id };
      setChartTitle("Today's Stats");
    } else {
      const currentDate = new Date(); // Current date and time
      currentDate.setDate(currentDate.getDate() - 1); // Subtract 1 day from the current date
      const previousDateISOString = currentDate.toISOString(); // Convert the previous date to ISO string format
      data = { date: previousDateISOString, empid: id };
      setChartTitle("Yesterday's Stats");
    }
    console.log(data);
    await pieData(data)
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          type.push(res.data[i].type);
          timeD.push(res.data[i].time);
        }
      })
      .catch((error) => console.log(error));
    setState(type);
    setTime(timeD);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PieContainer>
      <Chart
        type="pie"
        width={450}
        height={350}
        series={time}
        options={{
          title: { text: chartTitle },
          noData: { text: "Empty Data" },
          labels: state,
        }}
      />
    </PieContainer>
  );
};

export default Piechart;
