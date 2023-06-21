import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import { pieData } from "../api/index";

const PieContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bg};
  padding: 10px 40px;
  border-radius: 8px;
  @media (max-width: 768px) {
    width: 400px;
  }
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 420;
  color: ${({ theme }) => theme.text_primary};
  padding-bottom: 40px;
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
      setChartTitle("Today's Statistics");
    } else {
      const currentDate = new Date(); // Current date and time
      currentDate.setDate(currentDate.getDate() - 1); // Subtract 1 day from the current date
      const previousDateISOString = currentDate.toISOString(); // Convert the previous date to ISO string format
      data = { date: previousDateISOString, empid: id };
      setChartTitle("Yesterday's Statistics");
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
      <Title>{chartTitle}</Title>
      <Chart
        type="pie"
        width={420}
        height={350}
        series={time}
        options={{
          noData: { text: "Empty Data" },
          labels: state,
        }}
      />
    </PieContainer>
  );
};

export default Piechart;
