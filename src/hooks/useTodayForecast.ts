import { useEffect, useContext, useState } from "react";
import LocationContext from "../store/location-context";
import getCurrentForecast from "../api/getCurrentForecast";

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

const useTodayForecast = () => {
  const { currentLocation } = useContext(LocationContext);
  const [todayForecast, setTodayForecast] =
    useState<TodayForecast | null>(null);

  const [isLoading, setIsLoading] = useState(true);

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

  return { todayForecast, isLoading };
};

export default useTodayForecast;
