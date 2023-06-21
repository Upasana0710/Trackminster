import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getTasks } from "../api/index";

const Heading = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 24px;
  font-weight: 550;
  padding-bottom: 10px;
  padding-top: 20px;
  width: 100%;
  text-align: center;
`;

const TaskContainer = styled.div`
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
    justify-content: flex-start;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  flex-wrap: wrap;
  gap: 20px;
  display: flex;
  justify-content: center;
  @media (max-width: 1100px) {
    align-items: center;
    padding: 20px 0px;
  }
`;

const TaskCardContainer = styled.div`
  background: ${({ theme }) => theme.bg};
  border-radius: 4px;
  margin-bottom: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const TaskTitle = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text_primary};
`;

const TaskDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${({ theme }) => theme.text_primary + 99};
`;

const TaskType = styled.span`
  margin-right: 8px;
`;

const TaskDate = styled.span`
  margin-right: 8px;
`;

const TaskTimeTaken = styled.span`
  color: #555555;
`;
const CardTop = styled.div`
  background: ${({ theme }) => theme.bg};
  width: 100%;
  height: 4px;
`;
const Content = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Tasks = () => {
  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];
  const { currentUser } = useSelector((state) => state.user);
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    await getTasks(currentUser._id)
      .then((res) => {
        setTasks(res.data);
        console.log(tasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [currentUser]);

  return (
    <TaskContainer>
      <Heading>Today's Tasks</Heading>
      <Container>
        {tasks
          .filter((task) => {
            const taskStartDate = new Date(task.startTime);

            const today = new Date();
            return (
              taskStartDate.getDate() === today.getDate() &&
              taskStartDate.getMonth() === today.getMonth() &&
              taskStartDate.getFullYear() === today.getFullYear()
            );
          })
          .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
          .map((task, index) => (
            <TaskCardContainer key={task.id}>
              <CardTop
                style={{ backgroundColor: colors[index % 5].primaryColor }}
              />
              <Content>
                <TaskTitle>{task.desc}</TaskTitle>
                <TaskDetails>
                  <div>
                    <TaskType>Type: {task.type}</TaskType>
                    <TaskDate>
                      Date: {new Date(task.startTime).toLocaleDateString()}
                    </TaskDate>
                  </div>
                  <TaskTimeTaken>Time Taken: {task.time}</TaskTimeTaken>
                </TaskDetails>
              </Content>
            </TaskCardContainer>
          ))}
      </Container>
      <Heading>All Tasks</Heading>
      <Container>
        {tasks.map((task, index) => (
          <TaskCardContainer key={task.id}>
            <CardTop
              style={{ backgroundColor: colors[index % 5].primaryColor }}
            />
            <Content>
              <TaskTitle>{task.desc}</TaskTitle>
              <TaskDetails>
                <div>
                  <TaskType>Type: {task.type}</TaskType>
                  <TaskDate>
                    Date: {new Date(task.startTime).toLocaleDateString()}
                  </TaskDate>
                </div>
                <TaskTimeTaken>Time Taken: {task.time}</TaskTimeTaken>
              </TaskDetails>
            </Content>
          </TaskCardContainer>
        ))}
      </Container>
    </TaskContainer>
  );
};

export default Tasks;
