import { Route, Switch, Redirect } from "react-router-dom";
import ROUTE from "./config/routes";
import { Today, NextDays, NotFound } from "./pages";
import { Layout } from "./components";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Redirect to={ROUTE.TODAY} />
        </Route>
        <Route path={ROUTE.TODAY}>
          <Today />
        </Route>
        <Route path={ROUTE.NEXT7DAYS}>
          <NextDays />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
