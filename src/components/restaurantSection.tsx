import React from "react";
import { restaurantsPageQuery } from "../__generated__/restaurantsPageQuery";
import Restaurant from "./Restaurant";

interface IRestaurantSectionProps {
  data?: restaurantsPageQuery;
}

const RestaurantSection: React.FC<IRestaurantSectionProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-x-5 gap-y-8 mt-14">
      {data?.allRestaurants.results?.map((restaurant) => (
        <Restaurant
          id={restaurant.id}
          name={restaurant.name}
          coverImg={restaurant.coverImg}
          categoryName={restaurant.category?.name}
        />
      ))}
    </div>
  );
};

export default RestaurantSection;
