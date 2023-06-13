import React from "react";
import styled from "styled-components";

const AddContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  height: fit-content;
  padding: 30px 0px;
  width: 450px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCard = styled.div`
  height: fit-content;
  width: 90%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed ${({ theme }) => theme.text_secondary + 99};
`;

const Heading = styled.div`
  color: ${({ theme }) => theme.text_primary};
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  font-weight: 550;
  font-size: 18px;
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
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.text_secondary + 99};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
`;

const TextArea = styled.textarea`
  background: inherit;
  color: inherit;
  outline: none;
  border: none;
  width: 100%;
  resize: vertical;
  padding: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 4px 8px;
  background-color: inherit;
  color: ${({ theme }) => theme.text_secondary};
  border: none;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
`;

const Select = styled.select`
  width: 100%;
  padding: 4px 8px;
  background-color: inherit;
  color: ${({ theme }) => theme.text_secondary};
  border: none;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
`;

const Option = styled.option`
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_secondary};
`;

const FlexContainer = styled.div`
  display: flex;
  width: 94%;
  justify-content: space-between;
  gap: 12px;
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

const AddTask = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const renderYearOptions = () => {
    const years = [];
    for (let i = currentYear; i >= currentYear - 10; i--) {
      years.push(
        <Option key={i} value={i}>
          {i}
        </Option>,
      );
    }
    return years;
  };

  const renderMonthOptions = () => {
    const months = [];
    for (let i = 1; i <= currentMonth; i++) {
      months.push(
        <Option key={i} value={i}>
          {i}
        </Option>,
      );
    }
    return months;
  };

  const [year, setYear] = React.useState(currentYear.toString());
  const [month, setMonth] = React.useState(currentMonth.toString());
  const [date, setDate] = React.useState(currentDay.toString());
  const [hours, setHours] = React.useState("00");
  const [minutes, setMinutes] = React.useState("00");
  const [seconds, setSeconds] = React.useState("00");

  const renderTimeOptions = (range) => {
    const options = [];
    for (let i = 0; i < range; i++) {
      const value = i.toString().padStart(2, "0");
      options.push(
        <Option key={value} value={value}>
          {value}
        </Option>,
      );
    }
    return options;
  };

  const renderDateOptions = () => {
    const selectedYear = parseInt(year, 10);
    const selectedMonth = parseInt(month, 10);
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);

    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      if (
        selectedYear === currentYear &&
        selectedMonth === currentMonth &&
        i > currentDay
      ) {
        break;
      }
      dates.push(
        <Option key={i} value={i}>
          {i}
        </Option>,
      );
    }
    return dates;
  };

  return (
    <AddContainer>
      <Card>
        <InnerCard>
          <Heading>Add Task</Heading>
          <Fields>
            <Field>
              <TextArea rows="5" placeholder="Description" />
            </Field>
            <Field>
              <Select>
                <Option>Type</Option>
                <Option>Break</Option>
                <Option>Meeting</Option>
                <Option>Work</Option>
              </Select>
            </Field>
            <FlexContainer>
              <Field>
                <Select value={year} onChange={(e) => setYear(e.target.value)}>
                  {renderYearOptions()}
                </Select>
              </Field>
              <Field>
                <Select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {renderMonthOptions()}
                </Select>
              </Field>
              <Field>
                <Select value={date} onChange={(e) => setDate(e.target.value)}>
                  {renderDateOptions()}
                </Select>
              </Field>
            </FlexContainer>
            <FlexContainer>
              <Field>
                <Select
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                >
                  <Option value="" disabled>
                    Hours
                  </Option>
                  {renderTimeOptions(24)}
                </Select>
              </Field>
              <Field>
                <Select
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                >
                  {renderTimeOptions(60, "Min")}
                </Select>
              </Field>
              <Field>
                <Select
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                >
                  {renderTimeOptions(60, "Sec")}
                </Select>
              </Field>
            </FlexContainer>
            <Field>
              <Input type="number" min="0" max="60" placeholder="Time in min" />
            </Field>
            <ButtonContainer>Register</ButtonContainer>
          </Fields>
        </InnerCard>
      </Card>
    </AddContainer>
  );
};

export default AddTask;
