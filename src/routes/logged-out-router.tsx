import { useForm } from "react-hook-form";

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    console.log("Cannot create account");
  };
  console.log(errors);
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <div>
            <input
              {...register("email", {
                required: true,
                validate: (email: string) => email.includes("@gmail.com"),
              })}
              name="email"
              placeholder="email"
              type="email"
              required
            />
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
