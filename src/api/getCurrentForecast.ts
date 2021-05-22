import axios from "axios";
import { endpoint, token } from "../config/api";
import { components } from "../types/contract";

const getCurrentForecast = async (lat: number, long: number) => {
  try {
    const { data } = await axios.get<components["schemas"]["ForecastResponse"]>(
      `${endpoint}?lat=${lat}&lon=${long}&exclude=hourly,daily,minutely&appid=${token}`
    );
    return data.current;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default getCurrentForecast;
