import renderer from "react-test-renderer";
import Location from "../../../components/Location/Location";
import { render, screen } from "@testing-library/react";
import { LocationContextProvider } from "../../../store/location-context";

describe("Location component", () => {
  it("renders correctly", () => {
    const component = renderer.create(<Location />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it("has heading and button enabled", () => {
    render(
      <LocationContextProvider>
        <Location />
      </LocationContextProvider>
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Current:");
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Change location");
    expect(button).not.toBeDisabled();
  });
});
