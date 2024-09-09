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
    watch,
    formState: { errors, isValid },
  } = useForm<ILoginForm>();
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    variables: {
      loginInput: {
        email: watch("email"),
        password: watch("password"),
      },
    },
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      loginMutation();
    }
  };
  return (
    <div className="flex items-center flex-col mt-10 lg:mt-24">
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
            {...register("email", { required: "이메일은 필수입니다." })}
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
