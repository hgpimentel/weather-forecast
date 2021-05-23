import renderer from "react-test-renderer";
import CenteredContainer from "../../../components/Container/CenteredContainer";

describe("Centered container component", () => {
  it("renders correctly", () => {
    const component = renderer.create(<CenteredContainer />).toJSON();

    expect(component).toMatchSnapshot();
  });
});
