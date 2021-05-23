import renderer from "react-test-renderer";
import Today from "../../pages/Today";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { LocationContextProvider } from "../../store/location-context";
import { act } from "react-dom/test-utils";

jest.mock("axios");

describe("Today page", () => {
  it("renders correctly", () => {
    const component = renderer.create(<Today />).toJSON();

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
          current: {
            dt: 1621788483,
            sunrise: 1621768260,
            sunset: 1621818912,
            temp: 26.98,
            feels_like: 27.65,
            pressure: 1023,
            humidity: 54,
            dew_point: 16.89,
            uvi: 9.08,
            clouds: 20,
            visibility: 10000,
            wind_speed: 2.68,
            wind_deg: 142,
            wind_gust: 3.58,
            weather: [
              {
                id: 801,
                main: "Clouds",
                description: "few clouds",
                icon: "02d",
              },
            ],
          },
        },
      })
    );

    await act(async () => {
      render(
        <LocationContextProvider>
          <Today />
        </LocationContextProvider>
      );
    });

    const headings = screen.queryAllByRole("heading");

    expect(headings[0]).toHaveTextContent(
      new Date(1621788483 * 1000).toDateString()
    );
    expect(headings[1]).toHaveTextContent("26.98 ºC");
  });
});
