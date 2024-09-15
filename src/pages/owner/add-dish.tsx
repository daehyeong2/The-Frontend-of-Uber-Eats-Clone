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
import { useState } from "react";

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
  description: string;
  photo: FileList;
  [key: string]: string | FileList;
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
    setFocus,
    unregister,
  } = useForm<IForm>({
    mode: "onChange",
  });
  const history = useHistory();
  const onSubmit = () => {
    const { name, description, price, ...rest } = getValues();
    const optionObjects = optionsNumber.reverse().map((theId) => ({
      name: rest[`${theId}-optionName`] as string,
      extra: +rest[`${theId}-optionExtra`],
    }));
    try {
      createDishMutation({
        variables: {
          input: {
            name,
            description,
            price: +price,
            photo: "",
            options: optionObjects,
            restaurantId: +restaurantId,
          },
        },
      });
      history.push(`/restaurants/${restaurantId}`);
    } catch (e) {
      console.log(e);
    }
  };
  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const onAddOptionClick = () => {
    const id = Date.now();
    setOptionsNumber((current) => [id, ...current]);
    setTimeout(() => {
      setFocus(`${id}-optionName`);
    }, 0);
  };
  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber((current) => current.filter((id) => id !== idToDelete));

    unregister(`${idToDelete}-optionName`, { keepValue: false });
    unregister(`${idToDelete}-optionExtra`, { keepValue: false });
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
        <div className="my-5">
          <h4 className="font-medium font-freesentation">Dish Options</h4>
          <button
            type="button"
            onClick={onAddOptionClick}
            className="bg-black text-white rounded-sm p-1 text-xs mt-3"
          >
            Add Dish Option
          </button>
          {optionsNumber.length !== 0 &&
            optionsNumber.map((id) => (
              <div key={id} className="mt-5 grid grid-cols-9 gap-2">
                <input
                  {...register(`${id}-optionName`)}
                  className="focus:outline-none focus:border-gray-600 rounded-lg px-3 py-2 border-2 border-gray-300 col-span-4"
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  {...register(`${id}-optionExtra`)}
                  className="focus:outline-none focus:border-gray-600 rounded-lg px-3 py-2 border-2 border-gray-300 col-span-4"
                  type="number"
                  min={0}
                  placeholder="Option Extra"
                />
                <button
                  onClick={() => onDeleteClick(id)}
                  className="bg-red-500 rounded-xl text-white"
                  type="button"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
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
