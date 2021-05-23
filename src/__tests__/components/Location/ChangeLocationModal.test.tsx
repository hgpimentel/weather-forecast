import renderer from "react-test-renderer";
import ChangeLocationModal from "../../../components/Location/ChangeLocationModal";

describe("Change location modal component", () => {
  it("renders correctly", () => {
    const component = renderer
      .create(<ChangeLocationModal closeModal={jest.fn()} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
