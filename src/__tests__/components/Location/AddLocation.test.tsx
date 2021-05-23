import renderer from "react-test-renderer";
import AddLocation from "../../../components/Location/AddLocation";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Add location component", () => {
  it("renders correctly", () => {
    const component = renderer
      .create(<AddLocation closeModal={jest.fn()} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it("has button disabled", () => {
    render(<AddLocation closeModal={jest.fn()} />);

    expect(screen.getByRole("heading")).toHaveTextContent("New location");

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Add");
    expect(button).toBeDisabled();
  });

  it("has button enabled", () => {
    render(<AddLocation closeModal={jest.fn()} />);

    screen.queryAllByDisplayValue("").forEach((elem) => {
      fireEvent.change(elem, {
        target: { value: "Text" },
      });
    });

    screen.queryAllByDisplayValue(0).forEach((elem) => {
      fireEvent.change(elem, {
        target: { value: "10.010101" },
      });
    });

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });
});
