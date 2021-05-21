import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { LocationContextProvider } from "./store/location-context";

ReactDOM.render(
  <LocationContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LocationContextProvider>,
  document.getElementById("root")
);
