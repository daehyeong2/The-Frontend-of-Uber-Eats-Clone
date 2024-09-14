import { useForm } from "react-hook-form";
import useMe from "../../hooks/useMe";
import Button from "../../components/button";
import { Helmet } from "react-helmet-async";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  editProfile,
  editProfileVariables,
} from "../../__generated__/editProfile";
import FormError from "../../components/form-error";

export const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

const EditProfile = () => {
  const client = useApolloClient();
  const { data: userData } = useMe();
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
              verified
            }
          `,
          data: {
            email: newEmail,
            verified: false,
          },
        });
      }
    }
  };
  const [editProfile, { data, loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });
  const onSubmit = () => {
    if (loading) return;
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          ...(email && { email }),
          ...(password !== "" && { password }),
        },
      },
    });
  };
  return (
    <div className="absolute top-0 h-screen w-screen -z-10 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile | Nuber Eats</title>
      </Helmet>
      <h4 className="text-3xl font-freesentation mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-2 mt-7 mb-5 max-w-screen-sm w-full font-freesentation"
      >
        <input
          {...register("email", {
            required: "이메일을 입력해 주세요.",
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
        {formState.errors.email?.message && (
          <FormError errorMessage={formState.errors.email.message} />
        )}
        <input
          {...register("password")}
          className="input"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
        />
        <Button
          className="mt-3"
          text="Save Profile"
          canClick={formState.isValid}
          loading={loading}
        />
        {data?.editProfile.error && (
          <FormError errorMessage={data?.editProfile.error} />
        )}
      </form>
    </div>
  );
};

export default EditProfile;
