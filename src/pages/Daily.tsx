import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { CenteredContainer, ColumnContainer } from "../components";
import getDailyForecast from "../api/getDailyForecast";
import LocationContext from "../store/location-context";

const DailyContainer = styled(ColumnContainer)`
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
    max-width: 150px;
    display: flex;
    justify-content: center;
  }
`;

interface DailyForecast {
  day: Date;
  minTemp: number;
  maxTemp: number;
  description: string;
  humidity: number;
  wind: number;
}

const Daily: React.FC = () => {
  const [dailyForecasts, setDailyForecasts] =
    useState<DailyForecast[] | null>(null);
  const { currentLocation } = useContext(LocationContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentLocation) {
      setIsLoading(true);
      getDailyForecast(currentLocation.lat, currentLocation.long)
        .then((forecasts) => {
          if (forecasts) {
            const dailyForecasts = forecasts.map<DailyForecast>((frc) => ({
              day: new Date(frc.dt * 1000),
              minTemp: frc.temp.min,
              maxTemp: frc.temp.max,
              humidity: frc.clouds,
              description: frc.weather[0].main,
              wind: frc.wind_speed,
            }));

            setDailyForecasts(dailyForecasts);
            return;
          }
          setDailyForecasts(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentLocation]);

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
