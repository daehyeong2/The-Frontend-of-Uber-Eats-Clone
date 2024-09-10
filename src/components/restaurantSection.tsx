import React from "react";
import { restaurantsPageQuery } from "../__generated__/restaurantsPageQuery";

interface IRestaurantSectionProps {
  data?: restaurantsPageQuery;
}

const RestaurantSection: React.FC<IRestaurantSectionProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-x-5 gap-y-8 mt-10">
      {data?.allRestaurants.results?.map((restaurant) => (
        <div>
          <div
            className="bg-cover bg-center py-28 mb-3"
            style={{
              backgroundImage: `url(${restaurant.coverImg})`,
            }}
          />
          <h3 className="text-xl font-freesentation font-semibold">
            {restaurant.name}
          </h3>
          <span className="border-t-2 border-gray-200">
            {restaurant.category?.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RestaurantSection;
