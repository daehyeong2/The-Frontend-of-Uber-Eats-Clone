import { gql, useQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { myRestaurants } from "../../__generated__/myRestaurants";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MY_RESTAURANTS_QUERY = gql`
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
  const { data } = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY);
  console.log(data);
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
          data.myRestaurants.restaurants?.length === 0 && (
            <div className="flex flex-col items-center mt-36 gap-3">
              <h2 className="font-freesentation text-lg">
                No restaurants here.
              </h2>
              <Link to="/add-restaurant" className="text-sm hover:underline">
                🪄 Create one!
              </Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default MyRestaurants;
