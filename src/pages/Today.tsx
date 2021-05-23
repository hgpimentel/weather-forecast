import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { ColumnContainer } from "../components";
import LocationContext from "../store/location-context";
import getCurrentForecast from "../api/getCurrentForecast";

const TodayContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20%;
  padding: 2rem;
  border: 5px solid teal;
  border-radius: 1rem;
  align-items: center;

  @media (max-width: 991.98px) {
    margin: 0 5%;
  }

  @media (max-width: 767.98px) {
    flex-direction: column;
  }

  h1 {
    font-size: 4rem;
    margin: 0;
  }

  h2 {
    font-size: 3rem;
    margin: 0;
  }

  h3 {
    font-size: 2rem;
    margin: 0;
  }
`;

const CustomColumnContainer = styled(ColumnContainer)`
  width: 100%;
  & > * {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
  }
`;

interface TodayForecast {
  time: Date;
  temperature: number;
  weather: string;
  weatherDesc: string;
  feelsLike: number;
  humidity: number;
  clouds: number;
  windSpeed: number;
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
              time: new Date(forecast.dt * 1000),
              temperature: forecast.temp,
              weather: forecast.weather[0].main,
              weatherDesc: forecast.weather[0].description,
              feelsLike: forecast.feels_like,
              humidity: forecast.humidity,
              clouds: forecast.clouds,
              windSpeed: forecast.wind_speed,
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
      <CustomColumnContainer>
        <div>
          <h3>{todayForecast.time.toDateString()}</h3>
        </div>
        <div>
          <h1>{todayForecast.temperature} ºC</h1>
        </div>
        <div>
          <h2>{todayForecast.weather}</h2>
        </div>
        <div>
          <h3>{todayForecast.weatherDesc}</h3>
        </div>
      </CustomColumnContainer>
      <CustomColumnContainer>
        <div>
          <h3>Feel: {todayForecast.feelsLike} ºC</h3>
        </div>
        <div>
          <h3>Humidity: {todayForecast.humidity}%</h3>
        </div>
        <div>
          <h3>Clouds: {todayForecast.clouds}%</h3>
        </div>
        <div>
          <h3>Wind: {todayForecast.windSpeed} m/s</h3>
        </div>
      </CustomColumnContainer>
    </TodayContainer>
  );
};

export default Today;
