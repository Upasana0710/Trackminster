import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { getEmployee } from "../api/index";
import Piechart from "../components/Piechart";
import BarGraph from "../components/BarGraph";

const ProfileContainer = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  position: relative;
  @media (max-width: 768px) {
    padding: 6px 10px;
    justify-content: center;
  }
`;
const Icon = styled.div`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  position: absolute;
  right: 40px;
  top: 40px;
`;
const Heading = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 24px;
  font-weight: 550;
  padding-bottom: 10px;
  padding-top: 20px;
  width: 100%;
  text-align: center;
`;
const Table = styled.h1`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background: ${({ theme }) => theme.bg};
  border-radius: 8px;
`;
const Row = styled.div`
  height: 60px;
  width: 400px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.text_primary};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
`;
const Left = styled.div`
  flex: 0.5;
  border-right: 1px solid ${({ theme }) => theme.text_primary};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Right = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PieContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 60px;
  padding: 40px 0px;
  @media (max-width: 768px) {
    padding: 6px 10px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Employee = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      await getEmployee(id).then((res) => {
        console.log(res);
        setProfile(res.data);
      });
    };
    fetchData();
  }, [id]);
  return (
    <ProfileContainer>
      {currentUser?.role === "Employee" && (
        <Link to="/employeedetails">
          <Icon>
            <EditIcon />
          </Icon>
        </Link>
      )}
      <Heading>{profile?.name}</Heading>
      <Table>
        <Row>
          <Left>Username</Left>
          <Right>{profile?.username}</Right>
        </Row>
        <Row>
          <Left>Email</Left>
          <Right>{profile?.email}</Right>
        </Row>
        <Row>
          <Left>Contact</Left>
          <Right>{profile?.contact}</Right>
        </Row>
        <Row>
          <Left>Department</Left>
          <Right>{profile?.department}</Right>
        </Row>
        <Row style={{ borderBottom: "none" }}>
          <Left>Date of Joining</Left>
          <Right>{profile?.doj}</Right>
        </Row>
      </Table>
      <PieContainer>
        <Piechart day={true} id={id} />
        <Piechart day={false} id={id} />
      </PieContainer>
      <BarGraph id={id} />
    </ProfileContainer>
  );
};

export default Employee;