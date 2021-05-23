import renderer from "react-test-renderer";
import ColumnContainer from "../../../components/Container/ColumnContainer";

describe("Column container component", () => {
  it("renders correctly", () => {
    const component = renderer.create(<ColumnContainer />).toJSON();

    expect(component).toMatchSnapshot();
  });
});
