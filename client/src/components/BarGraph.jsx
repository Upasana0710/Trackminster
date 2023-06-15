import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import { barData } from "../api/index";

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 420;
  color: ${({ theme }) => theme.text_primary};
  padding-bottom: 40px;
`;

const BarGraph = ({ id }) => {
  const [state, setState] = useState([]);
  const [time, setTime] = useState([]);

  const fetchData = async () => {
    const type = [];
    const timeD = [];
    const data = { empid: id };

    try {
      const response = await barData(data);
      const { data: responseData } = response;

      for (let i = 0; i < responseData.length; i++) {
        type.push(responseData[i].type);
        timeD.push(responseData[i].time);
      }

      setState(type);
      setTime(timeD);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BarContainer>
      <Title>Weekly Statistics</Title>
      <Chart
        type="bar"
        width={800}
        height={500}
        series={[
          {
            name: "Social Media Subscriber",
            data: time,
          },
        ]}
        options={{
          colors: ["#8370FE"],
          theme: { mode: "light" },

          xaxis: {
            tickPlacement: "on",
            categories: state,
            labels: {
              style: { fontSize: "14px", color: "#ac9ffc" },
            },
            title: {
              text: "Type of Task",
              style: { color: "#8370FE", fontSize: 18 },
            },
          },

          yaxis: {
            labels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: { fontSize: "14px", color: "#ac9ffc" },
            },
            title: {
              text: "Time spent",
              style: { color: "#8370FE", fontSize: 18 },
            },
          },

          legend: {
            show: true,
            position: "right",
          },

          dataLabels: {
            formatter: (val) => {
              return `${val}`;
            },
            style: {
              colors: ["#f4f4f4"],
              fontSize: 15,
            },
          },
        }}
      />
    </BarContainer>
  );
};

export default BarGraph;
