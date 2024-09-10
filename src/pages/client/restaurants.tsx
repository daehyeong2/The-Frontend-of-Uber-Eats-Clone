import { gql, useQuery } from "@apollo/client";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import Categories from "../../components/categories";
import RestaurantSection from "../../components/restaurantSection";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        slug
        icon
        restaurantCount
      }
    }
    allRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

const Restaurants = () => {
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  return (
    <div>
      <form className="bg-gray-800 w-full py-32 flex justify-center items-center relative overflow-hidden">
        <img
          src="/images/vegetables.png"
          className="object-cover object-center absolute w-full brightness-[60%]"
        />
        <input
          type="search"
          placeholder="Search restaurants.."
          className="input rounded-lg border-none w-1/4 z-10"
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mt-7 px-8 mx-auto">
          <Categories data={data} />
          <RestaurantSection data={data} />
        </div>
      )}
    </div>
  );
};

export default Restaurants;
