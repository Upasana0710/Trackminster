import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Piechart from "../components/Piechart";
import BarGraph from "../components/BarGraph";

const DashContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-left: 220px;
  padding-top: 40px;
`;
const PieContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  padding: 60px 0px;
`;
const DashboardEmp = () => {
  const { currentUser } = useSelector((state) => state.user);
  const id = currentUser._id;
  return (
    <DashContainer>
      <PieContainer>
        <Piechart day={true} id={id} />
        <Piechart day={false} id={id} />
      </PieContainer>
      <BarGraph id={id} />
    </DashContainer>
  );
};

export default DashboardEmp;
