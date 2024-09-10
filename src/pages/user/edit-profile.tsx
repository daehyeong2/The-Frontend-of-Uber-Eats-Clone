import { useForm } from "react-hook-form";
import useMe from "../../hooks/useMe";
import Button from "../../components/button";

const EditProfile = () => {
  const { data: userData } = useMe();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: userData?.me.email,
      password: "",
    },
  });
  return (
    <div className="absolute top-0 h-screen w-screen -z-10 flex flex-col justify-center items-center">
      <h4 className="text-3xl font-freesentation mb-3">Edit Profile</h4>
      <form className="grid gap-2 mt-7 mb-5 max-w-screen-sm w-full font-freesentation">
        <input
          {...register("email", {
            required: "이메일은 필수입니다.",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "올바른 이메일을 입력해 주세요.",
            },
          })}
          className="input"
          type="email"
          placeholder="이메일을 입력해 주세요."
        />
        <input
          {...register("password", { required: "비밀번호는 필수입니다." })}
          className="input"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
        />
        <Button className="mt-3" text="Save Profile" canClick loading={false} />
      </form>
    </div>
  );
};

export default EditProfile;
