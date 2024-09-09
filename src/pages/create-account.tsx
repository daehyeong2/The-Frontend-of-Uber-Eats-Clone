import { useForm } from "react-hook-form";
import FormError from "../components/form-error";
import { gql, useMutation } from "@apollo/client";
import nuberLogo from "../logo.svg";
import Button from "../components/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CreateAccountInput, UserRole } from "../__generated__/globalTypes";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateAccountInput>({
    defaultValues: {
      role: UserRole.Client,
    },
  });
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION
  );
  const onSubmit = () => {};
  console.log(watch());
  return (
    <div className="flex items-center flex-col mt-10 lg:mt-24">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={nuberLogo} className="w-52 mb-12" alt="logo" />
        <h4 className="w-full font-medium font-freesentation text-3xl text-gray-800 mb-3">
          Let's get started
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
          <select
            {...register("role", { required: true })}
            className="input"
            required
          >
            {Object.keys(UserRole).map((role, idx) => (
              <option key={idx}>{role}</option>
            ))}
          </select>
          <Button
            className="mt-3"
            canClick={isValid}
            loading={loading}
            text="Create Account"
          />
        </form>
        <div>
          Already have an account?{" "}
          <Link className="text-lime-600 hover:underline" to="/">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
