import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Theme";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Login from "./components/Login";

const Trackminster = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.bgLight};
  overflow-y: hidden;
  overflow-x: hidden;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [signUpOpen, setSignUpOpen] = useState(false);
  useEffect(() => {
    console.log(signUpOpen);
  });
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Trackminster>
        <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
        <Navbar setSignUpOpen={setSignUpOpen} />
        <Login signUpOpen={signUpOpen} setSignUpOpen={setSignUpOpen} />
      </Trackminster>
    </ThemeProvider>
  );
}

export default App;
