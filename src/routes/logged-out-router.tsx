import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    console.log("Cannot create account");
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <div>
            <input
              {...register("email", {
                required: "이메일은 필수 항목입니다.",
                validate: (email: string) => email.includes("@gmail.com"),
              })}
              name="email"
              placeholder="email"
              type="email"
            />
            {errors.email?.message && (
              <span className="font-semibold text-red-600">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === "validate" && (
              <span className="font-semibold text-red-600">
                @gmail.com 만 사용 가능합니다.
              </span>
            )}
          </div>
          <div>
            <input
              {...register("password", { required: true })}
              name="password"
              placeholder="password"
              type="password"
              required
            />
          </div>
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
};
