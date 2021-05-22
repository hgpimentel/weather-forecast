import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { CenteredContainer, ColumnContainer } from "../components";
import getDailyForecast from "../api/getDailyForecast";
import LocationContext from "../store/location-context";

const NextDaysContainer = styled(ColumnContainer)`
  margin: 0 20%;
  padding: 2rem;
  border: 5px solid teal;
  border-radius: 1rem;
`;

const CustomCenteredContainer = styled(CenteredContainer)`
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;
  border-bottom: 2px solid teal;

  & > * {
    flex-grow: 1;
    max-width: 100px;
    display: flex;
    justify-content: center;
  }
`;

interface DailyForecast {
  day: number;
  avgTemp: number;
  sky: number;
  rain: string;
  wind: number;
}

const NextDays: React.FC = () => {
  const [dailyForecasts, setDailyForecasts] =
    useState<DailyForecast[] | null>(null);
  const { currentLocation } = useContext(LocationContext);

  useEffect(() => {
    if (currentLocation) {
      getDailyForecast(currentLocation.lat, currentLocation.long).then(
        (forecasts) => {
          if (forecasts) {
            const dailyForecasts = forecasts.map<DailyForecast>((frc) => ({
              day: frc.dt,
              avgTemp: frc.temp.max,
              sky: frc.clouds,
              rain: `${frc.rain ? frc.rain : "No rain"}`,
              wind: frc.wind_speed,
            }));

            setDailyForecasts(dailyForecasts);
          }
        }
      );
    }
  }, [currentLocation]);

  if (!dailyForecasts) return null;

  return (
    <NextDaysContainer>
      <CustomCenteredContainer>
        <div>
          <b>Day</b>
        </div>
        <div>
          <b>Avg Temp</b>
        </div>
        <div>
          <b>Sky</b>
        </div>
        <div>
          <b>Rain</b>
        </div>
        <div>
          <b>Wind</b>
        </div>
      </CustomCenteredContainer>
      {dailyForecasts.map((df) => {
        return (
          <CustomCenteredContainer>
            <div>{df.day}</div>
            <div>{df.avgTemp}</div>
            <div>{df.sky}</div>
            <div>{df.rain}</div>
            <div>{df.wind}</div>
          </CustomCenteredContainer>
        );
      })}
    </NextDaysContainer>
  );
};

export default NextDays;
