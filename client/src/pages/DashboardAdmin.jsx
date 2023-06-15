import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import EmployeeList from "../components/EmployeeList";

const DashContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0px;
  padding-top: 60px;
`;
const WelcomeHeading = styled.h1`
  font-size: 24px;
  padding: 10px 0px;
  color: ${({ theme }) => theme.text_primary};
`;
const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <DashContainer>
      <WelcomeHeading>Welcome, {currentUser.username}!</WelcomeHeading>
      <EmployeeList />
    </DashContainer>
  );
};

export default Dashboard;
