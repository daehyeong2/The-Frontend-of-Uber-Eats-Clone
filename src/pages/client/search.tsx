import { useHistory } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";
import { useForm } from "react-hook-form";
import RestaurantSection from "../../components/restaurantSection";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../components/loading";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

const Search = () => {
  const [page, setPage] = useState(1);
  const queryParams = useQueryParams();
  const history = useHistory();
  const [queryReadyToStart, { data, loading, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);
  const query = queryParams.get("term");
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { register, handleSubmit, getValues, setFocus } = useForm<IFormProps>({
    defaultValues: {
      searchTerm: query ?? "",
    },
  });
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `term=${searchTerm}`,
    });
  };
  useEffect(() => {
    setFocus("searchTerm");
  }, [setFocus]);
  useEffect(() => {
    if (!query) {
      return history.replace("/");
    }
    queryReadyToStart({
      variables: {
        input: {
          query,
          page,
        },
      },
    });
  }, [query, queryReadyToStart, history, page]);
  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-32 flex justify-center items-center relative overflow-hidden"
      >
        <img
          src="/images/vegetables.png"
          className="object-cover object-center absolute w-full brightness-[60%] pointer-events-none"
          alt="background-image"
        />
        <input
          {...register("searchTerm", { required: true })}
          type="search"
          placeholder="Search restaurants.."
          className="input rounded-lg border-none w-3/4 md:w-1/2 xl:w-1/4 z-10"
        />
      </form>
      {!loading ? (
        <div className="max-w-screen-2xl mt-7 px-8 mx-auto pb-20">
          <h2 className="text-2xl font-freesentation font-medium mb-7">
            "{query}" 검색 결과:
          </h2>
          <RestaurantSection data={data?.searchRestaurant.restaurants ?? []} />
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
              Page {page} of {data?.searchRestaurant.totalPages}
            </span>
            {page < (data?.searchRestaurant.totalPages ?? 0) ? (
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
      ) : (
        <Loading marginTop={56} />
      )}
    </div>
  );
};

export default Search;
