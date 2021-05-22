import styled from "styled-components";
import { CenteredContainer, ColumnContainer } from "../components";

const NextDaysContainer = styled(ColumnContainer)`
  margin: 0 20%;
  padding: 2rem;
  border: 5px solid teal;
  border-radius: 1rem;
`;

const CustomCenteredContainer = styled(CenteredContainer)`
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  border-bottom: 2px solid teal;
`;

const NextDays: React.FC = () => {
  return (
    <NextDaysContainer>
      {Array(7)
        .fill(1)
        .map((a, index) => {
          return (
            <CustomCenteredContainer key={index}>
              <div>Day</div>
              <div>Min/Max</div>
              <div>Sky</div>
              <div>Rain %</div>
              <div>Wind</div>
            </CustomCenteredContainer>
          );
        })}
    </NextDaysContainer>
  );
};

export default NextDays;
