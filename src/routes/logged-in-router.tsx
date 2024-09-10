import nuberLogo from "../logo.svg";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Restaurants from "../pages/client/restaurants";
import Header from "../components/header";
import useMe from "../hooks/useMe";
import NotFound from "../pages/404";
import ConfirmEmail from "../pages/user/confirm-email";

const ClientRoutes = [
  <Route path="/" exact key="restaurants">
    <Restaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex flex-col gap-10 justify-center items-center">
        <img src={nuberLogo} className="w-52" alt="logo" />
        <ul className="flex gap-4 *:size-2.5 *:bg-black *:rounded-full *:animate-bounce-10">
          <li />
          <li className="animation-delay-100" />
          <li className="animation-delay-200" />
        </ul>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Client" && ClientRoutes}
        <Route path="/confirm">
          <ConfirmEmail />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
