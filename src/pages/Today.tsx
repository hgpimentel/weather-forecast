import styled from "styled-components";
import { CenteredContainer, ColumnContainer } from "../components";

const TodayContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20%;
  padding: 2rem;
  border: 5px solid teal;
  border-radius: 1rem;
`;

const CustomCenteredContainer = styled(CenteredContainer)`
  align-items: center;
`;

const Today: React.FC = () => {
  return (
    <TodayContainer>
      <ColumnContainer>
        <div>Time</div>
        <div>
          <h2>Temperature</h2>
        </div>
        <div>
          <h3>Sky</h3>
        </div>
        <div>Rain %</div>
      </ColumnContainer>
      <CustomCenteredContainer>
        <div>Min/max Temp</div>
      </CustomCenteredContainer>
    </TodayContainer>
  );
};

export default Today;
