import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import FormError from "../../components/form-error";
import {
  createRestaurant,
  createRestaurantVariables,
} from "../../__generated__/createRestaurant";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

const AddRestaurant = () => {
  const client = useApolloClient();
  const [imageUrl, setImageUrl] = useState("");
  const onCompleted = (data: createRestaurant) => {
    const { name, categoryName, address } = getValues();
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      setUploading(false);
      const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
      if (queryResult) {
        client.writeQuery({
          query: MY_RESTAURANTS_QUERY,
          data: {
            myRestaurants: {
              ...queryResult?.myRestaurants,
              restaurants: [
                {
                  id: restaurantId,
                  name: name,
                  coverImg: imageUrl,
                  category: {
                    name: categoryName,
                    __typename: "Category",
                  },
                  isPromoted: false,
                  address,
                  __typename: "Restaurant",
                },
                ...queryResult?.myRestaurants.restaurants,
              ],
            },
          },
        });
      }
      window.location.href = "/";
    }
  };
  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    const { name, categoryName, address, file } = getValues();
    try {
      setUploading(true);
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url } = await (
        await fetch("http://localhost:4000/uploads", {
          method: "POST",
          body: formBody,
        })
      ).json();
      const coverImg = encodeURI(url);
      setImageUrl(coverImg);
      createRestaurantMutation({
        variables: {
          input: {
            name,
            address,
            categoryName,
            coverImg,
          },
        },
      });
    } catch (e) {
      setUploading(false);
      console.log(e);
    }
  };
  return (
    <div className="container flex flex-col items-center">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h1 className="text-2xl font-medium font-freesentation">
        Add Restaurant
      </h1>
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
        {errors.name?.message && (
          <FormError errorMessage={errors.name?.message} />
        )}
        <input
          {...register("address", { required: "주소는 필수입니다." })}
          placeholder="주소를 입력해 주세요."
          type="text"
          className="input"
        />
        {errors.address?.message && (
          <FormError errorMessage={errors.address?.message} />
        )}
        <input
          {...register("categoryName", {
            required: "카테고리 이름은 필수입니다.",
          })}
          placeholder="카테고리 이름을 입력해 주세요."
          type="text"
          className="input"
        />
        {errors.categoryName?.message && (
          <FormError errorMessage={errors.categoryName?.message} />
        )}
        <div>
          <input
            {...register("file", { required: "배경 사진은 필수입니다." })}
            type="file"
            accept="image/*"
            className="input w-full"
          />
          {errors.file?.message && (
            <FormError errorMessage={errors.file?.message} />
          )}
        </div>
        <Button
          className="mt-3"
          canClick={isValid}
          text="Create Restaurant"
          loading={uploading}
        />
        {data?.createRestaurant.error && (
          <FormError errorMessage={data.createRestaurant.error} />
        )}
      </form>
    </div>
  );
};

export default AddRestaurant;
