import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Piechart from "../components/Piechart";

const DashContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const DashboardEmp = () => {
  const { currentUser } = useSelector((state) => state.user);
  const id = currentUser._id;
  return (
    <DashContainer>
      <Piechart day={true} id={id} />
      <Piechart day={false} id={id} />
    </DashContainer>
  );
};

export default DashboardEmp;
