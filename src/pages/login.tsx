import { useForm } from "react-hook-form";
import FormError from "../components/form-error";
import { gql, useMutation } from "@apollo/client";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
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
    formState: { errors },
  } = useForm<ILoginForm>();
  const [loginMutation, { data, loading, error }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION);
  const onSubmit = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };
  console.log(data?.login);
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-md pt-8 pb-7 rounded-2xl text-center">
        <h3 className="text-3xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-2 px-5 mt-7"
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

          <button className="btn w-full mt-3">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
