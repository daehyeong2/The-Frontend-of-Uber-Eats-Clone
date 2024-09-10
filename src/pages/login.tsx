import { useForm } from "react-hook-form";
import FormError from "../components/form-error";
import { gql, useMutation } from "@apollo/client";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import nuberLogo from "../logo.svg";
import Button from "../components/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { authToken, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<ILoginForm>();
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authToken(token);
      isLoggedInVar(true);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    const { email, password } = getValues();
    if (!loading) {
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="flex items-center flex-col mt-10 lg:mt-24">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={nuberLogo} className="w-52 mb-12" alt="logo" />
        <h4 className="w-full font-medium font-freesentation text-3xl text-gray-800 mb-3">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-2 mt-7 mb-5 w-full"
        >
          <input
            {...register("email", {
              required: "이메일은 필수입니다.",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "올바른 이메일을 입력해 주세요.",
              },
            })}
            name="email"
            type="email"
            placeholder="Email"
            className="input"
            required
          />
          {errors.email && <FormError errorMessage={errors.email.message!} />}
          <input
            {...register("password", {
              required: "비밀번호는 필수입니다.",
            })}
            name="password"
            type="password"
            placeholder="Password"
            className="input"
            required
          />
          {errors.password && (
            <FormError errorMessage={errors.password.message!} />
          )}
          <Button
            className="mt-3"
            canClick={isValid}
            loading={loading}
            text="Log In"
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to Nuber?{" "}
          <Link className="text-lime-600 hover:underline" to="/create-account">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
