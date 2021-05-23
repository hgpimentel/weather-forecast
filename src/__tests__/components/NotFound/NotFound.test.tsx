import renderer from "react-test-renderer";
import { NotFound } from "../../../components";

describe("Not found component", () => {
  it("renders correctly", () => {
    const component = renderer
      .create(<NotFound message="Not Found!" />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
