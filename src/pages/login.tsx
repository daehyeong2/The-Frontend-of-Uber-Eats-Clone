import { useForm } from "react-hook-form";
import FormError from "../components/form-error";
import { gql, useMutation } from "@apollo/client";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import nuberLogo from "../logo.svg";

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
    formState: { errors },
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
        <img src={nuberLogo} className="w-52 mb-10" alt="logo" />
        <h4 className="w-full font-medium font-freesentation text-3xl text-gray-800 mb-5">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-2 mt-7 w-full"
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

          <button className="btn mt-3">
            {loading ? "Loading.." : "Log In"}
          </button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
