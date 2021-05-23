import renderer from "react-test-renderer";
import Layout from "../../../components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";

describe("Layout component", () => {
  it("renders correctly", () => {
    const component = renderer
      .create(
        <BrowserRouter>
          <Layout></Layout>
        </BrowserRouter>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
