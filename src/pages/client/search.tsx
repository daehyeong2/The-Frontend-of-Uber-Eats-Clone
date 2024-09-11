import { useHistory } from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";

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

const Search = () => {
  const queryParams = useQueryParams();
  const history = useHistory();
  const [queryReadyToStart, { data, loading, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);
  const query = queryParams.get("term");
  useEffect(() => {
    if (!query) {
      return history.replace("/");
    }
    queryReadyToStart({
      variables: {
        input: {
          query: query,
          page: 1,
        },
      },
    });
  }, [query, queryReadyToStart, history]);
  console.log(loading, data, called);
  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
    </div>
  );
};

export default Search;
