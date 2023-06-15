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
  padding-top: 60px;
`;
const PieContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  padding: 40px 0px;
`;
const WelcomeHeading = styled.h1`
  font-size: 24px;
  padding: 20px 0px;
  color: ${({ theme }) => theme.text_primary};
`;
const DashboardEmp = () => {
  const { currentUser } = useSelector((state) => state.user);
  const id = currentUser._id;
  return (
    <DashContainer>
      <WelcomeHeading>Welcome, {currentUser.username}!</WelcomeHeading>
      <PieContainer>
        <Piechart day={true} id={id} />
        <Piechart day={false} id={id} />
      </PieContainer>
      <BarGraph id={id} />
    </DashContainer>
  );
};

export default DashboardEmp;
