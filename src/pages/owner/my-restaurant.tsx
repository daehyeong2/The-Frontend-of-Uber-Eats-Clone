import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";
import { Helmet } from "react-helmet-async";
import Dish from "../../components/dish";

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
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

interface IParams {
  id: string;
}

const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data, loading } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>
          {data?.myRestaurant.restaurant?.name ?? "Loading.."} | Nuber Eats
        </title>
      </Helmet>
      <div
        className="bg-gray-800 py-16 bg-center bg-cover"
        style={{
          backgroundImage: `url(${
            loading
              ? ""
              : encodeURI(data?.myRestaurant.restaurant?.coverImg ?? "")
          })`,
        }}
      >
        <div className="bg-white w-3/4 sm:w-1/3 xl:w-1/4 py-4 pl-12 pr-12 xl:pl-24">
          <h2 className="text-2xl md:text-3xl mb-2.5">
            {data?.myRestaurant.restaurant?.name ?? "Loading.."}
          </h2>
          <Link
            role="link"
            className="text-sm font-light text-gray-500 hover:underline font-freesentation"
            to={`/categories/${data?.myRestaurant.restaurant?.category?.slug}`}
          >
            {data?.myRestaurant.restaurant?.category?.name}
          </Link>
          <h4 className="text-sm font-freesentation mt-2">
            {data?.myRestaurant.restaurant?.address}
          </h4>
        </div>
      </div>
      <div className="container">
        <div className="flex gap-5 mt-3 px-7 2xl:px-0">
          <Link
            to={`/restaurants/${id}/add-dish`}
            className="text-sm bg-slate-800 text-white font-freesentation tracking-wide font-medium px-5 py-2.5"
          >
            Add Dish&rarr;
          </Link>
          <Link
            to={``}
            className="text-sm bg-lime-800 text-white font-freesentation font-medium tracking-wide px-4 py-2"
          >
            Buy Promotion &rarr;
          </Link>
        </div>
        <div className="container px-7 2xl:px-0">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-lg mt-5">Please upload a dish!</h4>
          ) : (
            <>
              <h4 className="text-2xl font-freesentation font-medium mt-7">
                Menu
              </h4>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-4 gap-y-5 mt-4">
                {data?.myRestaurant.restaurant?.menu.map((dish) => (
                  <Dish
                    name={dish.name}
                    description={dish.description}
                    price={dish.price}
                    photo={dish.photo ?? ""}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRestaurant;
