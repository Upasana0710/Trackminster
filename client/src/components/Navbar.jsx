import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { logout } from "../redux/userSlice";

const Navcontainer = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
padding: 16px 40px;
align-items: center;
box-sizing: border-box;
color: ${({ theme }) => theme.text_primary};
gap: 30px;
background: ${({ theme }) => theme.bg}
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5.7px);
-webkit-backdrop-filter: blur(5.7px);
@media (max-width: 768px) {
  padding: 16px;
}
`;
const Button = styled.div`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  padding: 10px 18px;
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
const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.text_secondary} !important;
`;
const Content = styled.div``;
const Navbar = ({ menuOpen, setMenuOpen }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Navcontainer>
      <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
        <MenuIcon />
      </IcoButton>
      <Welcome>{currentUser?.username}</Welcome>
      <Button>
        <Content onClick={handleLogout}>Logout</Content>
      </Button>
    </Navcontainer>
  );
};

export default Navbar;
