import { gql, useQuery } from "@apollo/client";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import Categories from "../../components/categories";
import RestaurantSection from "../../components/restaurantSection";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { RESTAURANT_FRAGMENT } from "../../fragments";

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
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `term=${searchTerm}`,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-32 flex justify-center items-center relative overflow-hidden"
      >
        <img
          src="/images/vegetables.png"
          className="object-cover object-center absolute w-full brightness-[60%]"
          alt="background-image"
        />
        <input
          {...register("searchTerm", { required: true, minLength: 3 })}
          type="search"
          placeholder="Search restaurants.."
          className="input rounded-lg border-none w-3/4 md:w-1/2 xl:w-1/4 z-10"
          minLength={3}
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mt-7 px-8 mx-auto pb-20">
          <Categories data={data} />
          <RestaurantSection data={data} />
          <div className="grid grid-cols-3 place-items-center mt-10 max-w-sm mx-auto">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="text-xl bg-gray-50 border border-gray-200 rounded-md px-5 py-1"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            ) : (
              <div />
            )}
            <span>
              Page {page} of {data?.allRestaurants.totalPages}
            </span>
            {page < (data?.allRestaurants.totalPages ?? 0) ? (
              <button
                onClick={onNextPageClick}
                className="text-xl bg-gray-50 border border-gray-200 rounded-md px-5 py-1"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
