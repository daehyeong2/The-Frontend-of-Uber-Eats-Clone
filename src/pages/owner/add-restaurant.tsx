import { gql, useMutation } from "@apollo/client";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../../__generated__/createAccountMutation";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import { Helmet } from "react-helmet-async";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput) {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

const AddRestaurant = () => {
  const [createRestaurantMutation, { data, loading }] = useMutation<
    createAccountMutation,
    createAccountMutationVariables
  >(CREATE_RESTAURANT_MUTATION);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="container flex flex-col items-center">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h1>Add Restaurant</h1>
      <form
        className="grid gap-2 max-w-screen-sm w-full mt-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("name", { required: "이름은 필수입니다." })}
          placeholder="이름을 입력해 주세요."
          type="text"
          className="input"
        />
        <input
          {...register("address", { required: "주소는 필수입니다." })}
          placeholder="주소를 입력해 주세요."
          type="text"
          className="input"
        />
        <input
          {...register("categoryName", {
            required: "카테고리 이름은 필수입니다.",
          })}
          placeholder="카테고리 이름을 입력해 주세요."
          type="text"
          className="input"
        />
        <Button
          className="mt-3"
          canClick={isValid}
          text="Create Restaurant"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default AddRestaurant;
