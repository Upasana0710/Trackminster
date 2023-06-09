import React, { useState } from "react";
import { Modal } from "@mui/material";
import styled from "styled-components";
import login from "../api/api";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Card = styled.div`
  background: ${({ theme }) => theme.card};
  height: fit-content;
  padding: 30px 0px;
  width: 420px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InnerCard = styled.div`
  background: ${({ theme }) => theme.bgLight};
  height: 90%;
  width: 90%;
  border-radius: 8px;
`;
const Role = styled.div`
  color: ${({ theme }) => theme.text_primary};
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;
const Fields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
  width: 100%;
  gap: 14px;
`;
const Field = styled.div`
  width: 90%;
  height: 28px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 99};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  padding: 2px 6px;
`;
const FlexContainer = styled.div`
  width: 94%;
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;
const ButtonContainer = styled.div`
  width: 94%;
  background: ${({ theme }) => theme.primary + 99};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const AddEmployee = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    contact: "",
    department: "",
    doj: "",
    role: "Employee",
  });
  const handleSubmit = async () => {
    console.log(user);
    await login(user)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setUser({
      name: "",
      username: "",
      email: "",
      password: "",
      contact: "",
      department: "",
      doj: "",
      role: "Employee",
    });
  };
  return (
    <>
      <Modal open={true}>
        <Container>
          <Card>
            <InnerCard>
              <Role>Employee Details</Role>
              <Fields>
                <Field>
                  <input
                    type="text"
                    placeholder="Name"
                    style={{
                      background: "inherit",
                      color: "inherit",
                      outline: "none",
                      border: "none",
                      width: "100%",
                    }}
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </Field>
                <Field>
                  <input
                    type="text"
                    placeholder="Userame"
                    style={{
                      background: "inherit",
                      color: "inherit",
                      outline: "none",
                      border: "none",
                      width: "100%",
                    }}
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <input
                    type="text"
                    placeholder="Email"
                    style={{
                      background: "inherit",
                      color: "inherit",
                      outline: "none",
                      border: "none",
                      width: "100%",
                    }}
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <input
                    type="password"
                    placeholder="Password"
                    style={{
                      background: "inherit",
                      color: "inherit",
                      outline: "none",
                      border: "none",
                      width: "100%",
                    }}
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <input
                    type="text"
                    placeholder="Contact"
                    style={{
                      background: "inherit",
                      color: "inherit",
                      outline: "none",
                      border: "none",
                      width: "100%",
                    }}
                    value={user.contact}
                    onChange={(e) =>
                      setUser({ ...user, contact: e.target.value })
                    }
                  />
                </Field>
                <FlexContainer>
                  <Field>
                    <input
                      type="text"
                      placeholder="Department"
                      style={{
                        background: "inherit",
                        color: "inherit",
                        outline: "none",
                        border: "none",
                        width: "100%",
                      }}
                      value={user.department}
                      onChange={(e) =>
                        setUser({ ...user, department: e.target.value })
                      }
                    />
                  </Field>
                  <Field>
                    <input
                      type="text"
                      placeholder="Date of Joining"
                      style={{
                        background: "inherit",
                        color: "inherit",
                        outline: "none",
                        border: "none",
                        width: "100%",
                      }}
                      value={user.doj}
                      onChange={(e) =>
                        setUser({ ...user, doj: e.target.value })
                      }
                    />
                  </Field>
                </FlexContainer>
                <ButtonContainer onClick={() => handleSubmit()}>
                  Register
                </ButtonContainer>
              </Fields>
            </InnerCard>
          </Card>
        </Container>
      </Modal>
    </>
  );
};

export default AddEmployee;
