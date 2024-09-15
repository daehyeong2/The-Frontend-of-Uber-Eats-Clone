import { gql, useApolloClient, useQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { myRestaurants } from "../../__generated__/myRestaurants";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import RestaurantSection from "../../components/restaurantSection";
import { useEffect } from "react";

export const MY_RESTAURANTS_QUERY = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

const MyRestaurants = () => {
  const { data, loading } = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY);
  const client = useApolloClient();
  useEffect(() => {
    const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
    if (!queryResult) return;
    console.log(queryResult);
    client.writeQuery({
      query: MY_RESTAURANTS_QUERY,
      data: {
        ...queryResult,
        restaurants: [...(queryResult?.restaurants ?? [])],
      },
    });
  }, [loading]);
  return (
    <div>
      <Helmet>
        <title>My Restaurants | Nuber Eats</title>
      </Helmet>
      <div className="container px-8 mt-16">
        <h1 className="text-3xl font-semibold font-freesentation">
          My Restaurants
        </h1>
        {data?.myRestaurants.ok &&
        data.myRestaurants.restaurants?.length === 0 ? (
          <div className="flex flex-col items-center mt-36 gap-3">
            <h2 className="font-freesentation text-lg">No restaurants here.</h2>
            <Link to="/add-restaurant" className="hover:underline">
              🪄 Create one!
            </Link>
          </div>
        ) : (
          <div className="mt-8">
            <RestaurantSection data={data?.myRestaurants.restaurants ?? []} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRestaurants;
