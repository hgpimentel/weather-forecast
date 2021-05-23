import { useState, useContext, useEffect } from "react";
import getDailyForecast from "../api/getDailyForecast";
import LocationContext from "../store/location-context";

interface DailyForecast {
  day: Date;
  minTemp: number;
  maxTemp: number;
  description: string;
  humidity: number;
  wind: number;
}

const useDailyForecasts = () => {
  const [dailyForecasts, setDailyForecasts] =
    useState<DailyForecast[] | null>(null);
  const { currentLocation } = useContext(LocationContext);
  const [isLoading, setIsLoading] = useState(true);

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

  return { dailyForecasts, isLoading };
};

export default useDailyForecasts;
