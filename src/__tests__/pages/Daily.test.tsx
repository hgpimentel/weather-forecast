import renderer from "react-test-renderer";
import Daily from "../../pages/Daily";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { LocationContextProvider } from "../../store/location-context";
import { act } from "react-dom/test-utils";

jest.mock("axios");

describe("Daily page", () => {
  it("renders correctly", () => {
    const component = renderer.create(<Daily />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it("has elements", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          lat: 33.44,
          lon: -94.04,
          timezone: "America/Chicago",
          timezone_offset: -18000,
          daily: [
            {
              dt: 1621792800,
              sunrise: 1621768260,
              sunset: 1621818912,
              moonrise: 1621808040,
              moonset: 1621761480,
              moon_phase: 0.39,
              temp: {
                day: 27.79,
                min: 19.03,
                max: 28.16,
                night: 19.63,
                eve: 22.96,
                morn: 19.08,
              },
              feels_like: {
                day: 28.39,
                night: 19.69,
                eve: 23.3,
                morn: 19.52,
              },
              pressure: 1022,
              humidity: 52,
              dew_point: 17.04,
              wind_speed: 3.58,
              wind_deg: 136,
              wind_gust: 7.44,
              weather: [
                {
                  id: 801,
                  main: "Clouds",
                  description: "few clouds",
                  icon: "02d",
                },
              ],
              clouds: 20,
              pop: 0.04,
              uvi: 10.17,
            },
          ],
        },
      })
    );

    await act(async () => {
      render(
        <LocationContextProvider>
          <Daily />
        </LocationContextProvider>
      );
    });

    expect(screen.getByText("Day")).not.toBeNull();

    expect(screen.getByText("Temperature")).not.toBeNull();
  });
});
