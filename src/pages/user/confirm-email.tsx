import { gql, useMutation } from "@apollo/client";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($code: String!) {
    verifyEmail(code: $code) {
      ok
      error
    }
  }
`;

const ConfirmEmail = () => {
  const [verifyEmail, { loading: verifyingEmail }] = useMutation<
    verifyEmail,
    verifyEmailVariables
  >(VERIFY_EMAIL_MUTATION);
  useEffect(() => {
    const code = window.location.href.split("?code=")[1];
    verifyEmail({
      variables: {
        code,
      },
    });
  }, []);
  return (
    <div className="absolute top-0 h-screen w-screen flex flex-col gap-4 justify-center items-center -z-10">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="text-7xl mb-3.5 animate-bounce-10 text-lime-700"
      />
      <h2 className="text-4xl font-freesentation font-semibold">
        Verifying Email..
      </h2>
      <h4 className="font-freesentation tracking-wider">
        Please wait, don't close this page.
      </h4>
    </div>
  );
};

export default ConfirmEmail;
