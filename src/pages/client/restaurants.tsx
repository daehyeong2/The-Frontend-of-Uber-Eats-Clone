import { gql, useQuery } from "@apollo/client";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";

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
        <div className="max-w-screen-2xl mt-5">
          <div className="flex justify-around max-w-sm mx-auto">
            {data?.allCategories.categories?.map((category, idx) => (
              <div
                className="flex flex-col gap-1 items-center cursor-pointer"
                key={idx}
              >
                <div
                  className="rounded-full size-14 flex flex-col justify-center items-center bg-contain hover:bg-gray-100"
                  style={{
                    backgroundImage: `url("${category.icon}")`,
                  }}
                />
                <span className="text-sm font-semibold font-freesentation">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
