import React from "react";
import Restaurant from "./Restaurant";
import { RestaurantParts } from "../__generated__/RestaurantParts";

interface IRestaurantSectionProps {
  data?: RestaurantParts[];
}

const RestaurantSection: React.FC<IRestaurantSectionProps> = ({ data }) => {
  return (
    <div className="grid md:grid-cols-3 gap-x-5 gap-y-8">
      {data?.map((restaurant) => (
        <Restaurant
          key={restaurant.id}
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
