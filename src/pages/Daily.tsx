import styled from "styled-components";
import { CenteredContainer, ColumnContainer } from "../components";
import { useDailyForecasts } from "../hooks";

const DailyContainer = styled(ColumnContainer)`
  margin: 0 20%;
  padding: 2rem;
  border: 5px solid teal;
  border-radius: 1rem;

  @media (max-width: 991.98px) {
    margin: 0 5%;
  }

  @media (max-width: 767.98px) {
    font-size: 14px;
  }
`;

const CustomCenteredContainer = styled(CenteredContainer)`
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;
  border-bottom: 2px solid teal;

  & > * {
    flex-grow: 1;
    max-width: 150px;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 575.98px) {
    flex-direction: column;
  }
`;

const Daily: React.FC = () => {
  const { dailyForecasts, isLoading } = useDailyForecasts();

  if (isLoading) return null;

  if (!dailyForecasts)
    return (
      <div>
        <h1>No daily forecasts found!</h1>
      </div>
    );

  return (
    <DailyContainer>
      <CustomCenteredContainer>
        <div>
          <b>Day</b>
        </div>
        <div>
          <b>Temperature</b>
        </div>
        <div>
          <b>Sky</b>
        </div>
        <div>
          <b>Humidity</b>
        </div>
        <div>
          <b>Wind</b>
        </div>
      </CustomCenteredContainer>
      {dailyForecasts.map((df) => {
        return (
          <CustomCenteredContainer key={df.day}>
            <div>{df.day.toDateString()}</div>
            <div>
              {df.minTemp}/{df.maxTemp} ºC
            </div>
            <div>{df.description}</div>
            <div>{df.humidity}%</div>
            <div>{df.wind} m/s</div>
          </CustomCenteredContainer>
        );
      })}
    </DailyContainer>
  );
};

export default Daily;
