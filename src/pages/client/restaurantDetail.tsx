import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  restaurant,
  restaurantVariables,
} from "../../__generated__/restaurant";
import { Helmet } from "react-helmet-async";
import Dish from "../../components/dish";
import { useState } from "react";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";
import { cn } from "../../utils/cn";

export const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        category {
          slug
        }
        menu {
          ...DishParts
        }
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

interface IRestaurantDetailParams {
  id: string;
}

const RestaurantDetail = () => {
  const params = useParams<IRestaurantDetailParams>();
  const { data } = useQuery<restaurant, restaurantVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +params.id,
      },
    },
  });
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const triggetStopOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };
  const addItemToOrder = (dish: CreateOrderItemInput) => {
    setOrderItems((current) => [dish, ...current]);
  };
  const onRemoveItemFromOrder = (dishId: number) => {
    const index = orderItems.findIndex((order) => order.dishId === dishId);
    setOrderItems((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };
  console.log(orderItems);
  return (
    <div>
      <Helmet>
        <title>
          {data?.restaurant.restaurant?.name ?? "Loading.."} | Nuber Eats
        </title>
      </Helmet>
      <div
        className="bg-gray-800 py-44 bg-center bg-cover"
        style={{
          backgroundImage: `url(${
            data?.restaurant.restaurant?.coverImg
              ? encodeURI(data?.restaurant.restaurant?.coverImg)
              : ""
          })`,
        }}
      >
        <div className="bg-white w-1/4 py-8 pl-24">
          <h2 className="text-4xl mb-2.5">
            {data?.restaurant.restaurant?.name}
          </h2>
          <Link
            role="link"
            className="text-sm font-light text-gray-500 hover:underline font-freesentation"
            to={`/categories/${data?.restaurant.restaurant?.category?.slug}`}
          >
            {data?.restaurant.restaurant?.category?.name}
          </Link>
          <h4 className="text-sm font-freesentation mt-2">
            {data?.restaurant.restaurant?.address}
          </h4>
        </div>
      </div>
      <div className="container px-7 mb-20">
        <div className="flex justify-between">
          <h4 className="text-3xl font-freesentation font-medium mt-7">Menu</h4>
          <button
            onClick={orderStarted ? triggetStopOrder : triggerStartOrder}
            className={cn("btn rounded-xl", orderStarted && "bg-red-500")}
          >
            {orderStarted ? "Stop Order" : "Start Order"}
          </button>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-4 gap-y-5 mt-10">
          {data?.restaurant.restaurant?.menu.map((dish) => (
            <Dish
              orderStarted={orderStarted}
              key={dish.id}
              id={dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              photo={dish.photo ?? ""}
              options={dish.options ?? []}
              isCustomer={true}
              addItemToOrder={addItemToOrder}
              removeItemFromOrder={onRemoveItemFromOrder}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
