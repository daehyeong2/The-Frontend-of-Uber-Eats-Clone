import { isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const LoggedInRouter = () => {
  const onClick = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    isLoggedInVar(false);
  };
  return (
    <div>
      <h1>Logged In</h1>
      <button onClick={onClick} className="btn">
        Log Out
      </button>
    </div>
  );
};
