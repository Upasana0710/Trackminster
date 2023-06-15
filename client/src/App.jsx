import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "./utils/Theme";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Login from "./components/Login";
import AddEmployee from "./pages/AddEmployee";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardEmp from "./pages/DashboardEmp";
import AddTask from "./pages/AddTask";
import Employee from "./pages/Employee";

const Trackminster = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: ${({ theme }) => theme.bgLight};
  overflow-x: hidden;
  overflow-y: hidden;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 100vh; /* Changed height to min-height */
  background: ${({ theme }) => theme.bgLight};
  overflow-x: hidden;
`;

const Pages = styled.div`
  flex: 1; /* Added flex: 1 to make the Pages component take remaining space */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 220px;
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
              <Pages>
                <Routes>
                  <Route
                    path="/"
                    exact
                    element={
                      currentUser?.role === "Admin" ? (
                        <DashboardAdmin />
                      ) : (
                        <DashboardEmp />
                      )
                    }
                  />
                  <Route path="/addemployee" exact element={<AddEmployee />} />
                  <Route path="/addtask" exact element={<AddTask />} />
                  <Route path="/employee/:id" exact element={<Employee />} />
                </Routes>
              </Pages>
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
