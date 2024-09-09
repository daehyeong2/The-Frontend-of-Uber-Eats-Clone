import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "../pages/login";
import CreateAccount from "../pages/create-account";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
