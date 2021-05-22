import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { CenteredContainer, ColumnContainer } from "../components";
import LocationContext from "../store/location-context";
import getCurrentForecast from "../api/getCurrentForecast";

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

interface TodayForecast {
  time: string;
  temperature: number;
  sky: number;
  rain: number;
  avgtemp: number;
}

const Today: React.FC = () => {
  const { currentLocation } = useContext(LocationContext);
  const [todayForecast, setTodayForecast] =
    useState<TodayForecast | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentLocation) {
      setIsLoading(true);
      getCurrentForecast(currentLocation.lat, currentLocation.long)
        .then((forecast) => {
          if (forecast) {
            setTodayForecast({
              time: forecast.sunrise,
              rain: forecast.pressure,
              sky: forecast.humidity,
              temperature: forecast.temp,
              avgtemp: forecast.wind_speed,
            });
            return;
          }
          setTodayForecast(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentLocation]);

  if (isLoading) return null;

  if (!todayForecast)
    return (
      <div>
        <h1>No current forecast found!</h1>
      </div>
    );

  return (
    <TodayContainer>
      <ColumnContainer>
        <div>{todayForecast.time}</div>
        <div>
          <h2>{todayForecast.time}</h2>
        </div>
        <div>
          <h3>{todayForecast.sky}</h3>
        </div>
        <div>{todayForecast.rain}</div>
      </ColumnContainer>
      <CustomCenteredContainer>
        <div>{todayForecast.avgtemp}</div>
      </CustomCenteredContainer>
    </TodayContainer>
  );
};

export default Today;
