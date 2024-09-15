import { gql, useMutation } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import {
  createDish,
  createDishVariables,
} from "../../__generated__/createDish";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import FormError from "../../components/form-error";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IAddDishProps {
  id: string;
}

interface IForm {
  name: string;
  price: string;
  photo: FileList;
  description: string;
}

const AddDish = () => {
  const { id: restaurantId } = useParams<IAddDishProps>();
  const [createDishMutation, { data, loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: { input: { id: +restaurantId } },
      },
    ],
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<IForm>({
    mode: "onChange",
  });
  const history = useHistory();
  const onSubmit = () => {
    const { name, description, price } = getValues();
    try {
      createDishMutation({
        variables: {
          input: {
            name,
            description,
            price: +price,
            photo: "",
            restaurantId: +restaurantId,
          },
        },
      });
      history.push(`/restaurants/${restaurantId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <form
        className="max-w-screen-sm w-full mx-auto grid gap-2 mt-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-medium font-freesentation mx-auto mb-5">
          Add Dish
        </h2>
        <input
          className="input"
          {...register("name", { required: "이름은 필수입니다." })}
          type="text"
          placeholder="name"
        />
        {errors.name?.message && (
          <FormError errorMessage={errors.name.message} />
        )}
        <input
          className="input"
          {...register("description", { required: "설명은 필수입니다." })}
          type="text"
          placeholder="description"
        />
        {errors.description?.message && (
          <FormError errorMessage={errors.description.message} />
        )}
        <input
          className="input"
          {...register("price", {
            required: "가격은 필수입니다.",
            min: { value: 1, message: "가격은 1달러부터입니다." },
          })}
          min={1}
          type="number"
          placeholder="price"
        />
        {errors.price?.message && (
          <FormError errorMessage={errors.price.message} />
        )}
        <input
          className="input"
          {...register("photo", { required: "사진은 필수입니다." })}
          type="file"
          accept="image/*"
        />
        {errors.photo?.message && (
          <FormError errorMessage={errors.photo.message} />
        )}
        <Button
          className="mt-2"
          canClick={isValid}
          loading={loading}
          text="Add Dish"
        />
        {data?.createDish.error && (
          <FormError errorMessage={data?.createDish.error} />
        )}
      </form>
    </div>
  );
};

export default AddDish;
