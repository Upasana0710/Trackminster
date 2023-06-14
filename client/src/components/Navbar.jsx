import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Navcontainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  padding: 16px 40px;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  background: ${({ theme }) => theme.bg};
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  @media (max-width: 768px) {
    padding: 16px;
  }
`;
const Button = styled.div`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 16px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.bg};
  }
  @media (max-width: 768px) {
    padding: 16px;
  }
`;
const Welcome = styled.div`
  font-size: 20px;
  font-weight: 550;
  color: ${({ theme }) => theme.text_primary};
`;
const Content = styled.div``;
const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Navcontainer>
      <Welcome>{currentUser?.username}</Welcome>
      <Button>
        <Content onClick={handleLogout}>Logout</Content>
      </Button>
    </Navcontainer>
  );
};

export default Navbar;
