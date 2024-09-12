import { gql, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { category, categoryVariables } from "../../__generated__/category";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useState } from "react";
import RestaurantSection from "../../components/restaurantSection";
import Categories from "../../components/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";
import { RESTAURANTS_QUERY } from "./restaurants";
import Loading from "../../components/loading";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      category {
        ...CategoryParts
      }
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${RESTAURANT_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

interface IFormProps {
  searchTerm: string;
}

const Category = () => {
  const [page, setPage] = useState(1);
  const params = useParams<ICategoryParams>();
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: params.slug,
        },
      },
    }
  );
  const { data: restaurantsPageData } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const history = useHistory();
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
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
        <title>
          {data?.category.category?.name ?? "Category"} | Nuber Eats
        </title>
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
          <Categories data={restaurantsPageData} />
          <RestaurantSection data={data?.category.restaurants ?? []} />
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
              Page {page} of {data?.category.totalPages}
            </span>
            {page < (data?.category.totalPages ?? 0) ? (
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

export default Category;
