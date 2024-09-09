import { useForm } from "react-hook-form";

interface ILoginForm {
  email?: string;
  password?: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ILoginForm>();
  const onSubmit = () => {
    console.log(getValues());
  };
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
          {errors.email && (
            <span className="text-left text-red-600">
              {errors.email.message}
            </span>
          )}
          <input
            {...register("password", {
              required: "비밀번호는 필수입니다.",
              minLength: 8,
              maxLength: 24,
            })}
            name="password"
            type="password"
            placeholder="Password"
            className="input"
            required
          />
          {["minLength", "maxLength"].includes(errors.password?.type ?? "") ? (
            <span className="text-left text-red-600">
              비밀번호는 8~24자 길이로 작성해 주세요.
            </span>
          ) : (
            errors.password && (
              <span className="text-left text-red-600">
                {errors.password.message}
              </span>
            )
          )}

          <button className="btn w-full mt-3">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
