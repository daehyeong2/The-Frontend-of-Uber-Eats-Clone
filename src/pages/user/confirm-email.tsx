import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import useQueryParams from "../../hooks/useQueryParams";
import useMe from "../../hooks/useMe";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FormError from "../../components/form-error";
import { cn } from "../../utils/cn";

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
  const history = useHistory();
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
      history.push("/");
    }
  };
  const [verifyEmail, { data }] = useMutation<
    verifyEmail,
    verifyEmailVariables
  >(VERIFY_EMAIL_MUTATION, {
    onCompleted,
  });
  const param = useQueryParams();
  const code = param.get("code");
  useEffect(() => {
    if (!code) return;
    verifyEmail({
      variables: {
        code,
      },
    });
  }, [code, verifyEmail]);
  console.log(data);
  const isErrorOccurred = data?.verifyEmail.error;
  return (
    <div className="absolute top-0 h-screen w-screen flex flex-col gap-4 justify-center items-center -z-10">
      <Helmet>
        <title>Verify Email | Nuber Eats</title>
      </Helmet>
      <FontAwesomeIcon
        icon={isErrorOccurred ? faXmark : faMagnifyingGlass}
        className={cn(
          "text-7xl mb-3.5 animate-bounce-10",
          isErrorOccurred ? "text-red-500" : "text-lime-700"
        )}
      />
      <h2 className="text-4xl font-freesentation font-semibold">
        {isErrorOccurred ? "Couldn't Verify The Email" : "Verifying Email.."}
      </h2>
      {isErrorOccurred ? (
        <FormError errorMessage={data.verifyEmail.error as string} />
      ) : (
        <h4 className="font-freesentation tracking-wider">
          Please wait, don't close this page.
        </h4>
      )}
    </div>
  );
};

export default ConfirmEmail;
