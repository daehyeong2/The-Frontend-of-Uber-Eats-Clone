import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import useQueryParams from "../../hooks/useQueryParams";
import useMe from "../../hooks/useMe";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($code: String!) {
    verifyEmail(code: $code) {
      ok
      error
    }
  }
`;

const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
    }
  };
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted,
    }
  );
  const param = useQueryParams();
  useEffect(() => {
    const code = param.get("code");
    if (!code) return;
    verifyEmail({
      variables: {
        code,
      },
    });
  }, [param, verifyEmail]);
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
