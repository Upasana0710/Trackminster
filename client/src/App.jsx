import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "./utils/Theme";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Login from "./components/Login";
import AddEmployee from "./pages/AddEmployee";
import Dashboard from "./pages/Dashboard";
import DashboardEmp from "./pages/DashboardEmp";

const Trackminster = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.bgLight};
  overflow-y: hidden;
  overflow-x: hidden;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.bgLight};
  overflow-y: hidden;
  overflow-x: hidden;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    console.log(currentUser);
  });
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Trackminster>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
            <Container>
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  exact
                  element={
                    currentUser?.role === "Admin" ? (
                      <Dashboard />
                    ) : (
                      <DashboardEmp />
                    )
                  }
                />
                <Route path="/addemployee" exact element={<AddEmployee />} />
              </Routes>
            </Container>
          </Trackminster>
        ) : (
          <Trackminster>
            <Login />
          </Trackminster>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
