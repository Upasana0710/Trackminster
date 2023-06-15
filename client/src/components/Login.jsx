import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { login } from "../api";
import { loginSuccess } from "../redux/userSlice";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.bgLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Card = styled.div`
  background: ${({ theme }) => theme.card};
  height: fit-content;
  width: 420px;
  padding: 28px 0px;
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
const ToggleContainer = styled.div`
  border-radius: 8px 8px 0px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  display: flex;
  height: 46px;
  align-items: center;
  cursor: pointer;
`;
const Role = styled.div`
  color: ${({ theme }) => theme.text_primary};
  flex: 0.5;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Roleh = styled.div`
  color: ${({ theme }) => theme.primary};
  flex: 0.5;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
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
  cursor: pointer;
`;
const Message = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "Admin",
  });
  const [isNew, setIsNew] = useState(true);
  const clear = () => {
    setUser({ username: "", email: "", password: "", role: "Admin" });
  };
  const handleSubmit = async () => {
    if (role) {
      setUser({ ...user, role: "Admin" });
    } else {
      setUser({ ...user, role: "Employee" });
    }
    if (user.username === "" || user.password === "") {
      alert("Please fill in the required details");
    } else {
      await login(user)
        .then((res) => {
          dispatch(loginSuccess(res.data));
          console.log(res.data);
          clear();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <Container>
        <Card>
          <InnerCard>
            <ToggleContainer>
              {role ? (
                <Roleh
                  style={{ borderRight: "1px solid #8370FE" }}
                  onClick={() => setRole(true)}
                >
                  Admin
                </Roleh>
              ) : (
                <Role
                  style={{ borderRight: "1px solid #8370FE" }}
                  onClick={() => setRole(true)}
                >
                  Admin
                </Role>
              )}
              {role ? (
                <Role onClick={() => setRole(false)}>Employee</Role>
              ) : (
                <Roleh onClick={() => setRole(false)}>Employee</Roleh>
              )}
            </ToggleContainer>
            {role ? (
              isNew ? (
                <Fields>
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
                  <ButtonContainer onClick={() => handleSubmit()}>
                    Sign Up
                  </ButtonContainer>
                  <Message onClick={() => setIsNew(false)}>
                    Already have an account? Sign In
                  </Message>
                </Fields>
              ) : (
                <Fields>
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
                  <ButtonContainer onClick={() => handleSubmit()}>
                    Sign In
                  </ButtonContainer>
                  <Message onClick={() => setIsNew(false)}>
                    Do not have an account? Sign Up
                  </Message>
                </Fields>
              )
            ) : (
              <Fields>
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
                <ButtonContainer onClick={() => handleSubmit()}>
                  Sign In
                </ButtonContainer>
              </Fields>
            )}
          </InnerCard>
        </Card>
      </Container>
    </>
  );
};

export default Login;
