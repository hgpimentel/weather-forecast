import App from "../App";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Select location component", () => {
  it("renders correctly", () => {
    const component = renderer
      .create(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it("has header title", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading")).toHaveTextContent(
      "Weather Forecast App"
    );
  });

  it("has today page active", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText("Today")).toHaveClass("active");
  });
});
