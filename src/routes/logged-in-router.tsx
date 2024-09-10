import { gql, useQuery } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import nuberLogo from "../logo.svg";
import { meQuery } from "../__generated__/meQuery";

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
  const onClick = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    isLoggedInVar(false);
  };
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
    <div>
      <h1>{data.me.email}</h1>
    </div>
  );
};
