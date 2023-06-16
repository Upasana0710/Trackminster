import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Piechart from "../components/Piechart";
import BarGraph from "../components/BarGraph";

const DashContainer = styled.div`
  padding: 20px 30px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;
const PieContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px 0px;
  gap: 18px;
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
