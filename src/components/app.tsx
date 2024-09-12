import { LoggedOutRouter } from "../routes/logged-out-router";
import { LoggedInRouter } from "../routes/logged-in-router";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import "../styles/tailwind.css";

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};

export default App;
