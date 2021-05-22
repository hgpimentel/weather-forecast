import axios from "axios";
import { components } from "../types/contract";
import { endpoint, token } from "../config/api";

const getDailyForecast = async (lat: number, long: number) => {
  try {
    const { data } = await axios.get<components["schemas"]["ForecastResponse"]>(
      `${endpoint}?lat=${lat}&lon=${long}&exclude=hourly,current,minutely&appid=${token}`
    );
    return data.daily;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default getDailyForecast;
