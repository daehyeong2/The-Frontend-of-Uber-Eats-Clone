import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  restaurant,
  restaurantVariables,
} from "../../__generated__/restaurant";
import { Helmet } from "react-helmet-async";

export const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        category {
          slug
        }
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
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
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
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
    </div>
  );
};

export default RestaurantDetail;
