import { gql, useQuery } from "@apollo/client";
import nuberLogo from "../logo.svg";
import { meQuery } from "../__generated__/meQuery";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Restaurants from "../pages/client/restaurants";
import Header from "../components/header";

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  console.log(data, error);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex flex-col gap-10 justify-center items-center">
        <img src={nuberLogo} className="w-52" alt="logo" />
        <ul className="flex gap-5">
          <li className="h-3 w-3 bg-black rounded-full animate-bounce-big" />
          <li className="h-3 w-3 bg-black rounded-full animate-bounce-big animation-delay-100" />
          <li className="h-3 w-3 bg-black rounded-full animate-bounce-big animation-delay-200" />
        </ul>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Client" && ClientRoutes}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
