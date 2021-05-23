import renderer from "react-test-renderer";
import SelectLocation from "../../../components/Location/SelectLocation";
import { render, screen } from "@testing-library/react";

describe("Select location component", () => {
  it("renders correctly", () => {
    const component = renderer
      .create(<SelectLocation closeModal={jest.fn()} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  it("has elements", () => {
    const localStorageMock = (function () {
      var store: any = {
        locations:
          '[{"city":"Porto","country":"Portugal","lat":41.1496,"long":-8.611}]',
      };

      return {
        getItem: function (key: string) {
          return store[key] || null;
        },
      };
    })();

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });

    render(<SelectLocation closeModal={jest.fn()} />);

    expect(screen.getByRole("heading")).toHaveTextContent("Saved locations");
  });
});
