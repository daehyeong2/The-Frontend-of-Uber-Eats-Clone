import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: number;
  name: string;
  coverImg: string;
  categoryName?: string;
}

const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  name,
  coverImg,
  categoryName,
}) => {
  return (
    <Link className="flex flex-col" to={`/restaurants/${id}`}>
      <div
        className="bg-cover bg-center py-28 mb-3"
        style={{
          backgroundImage: `url(${coverImg})`,
        }}
      />
      <h3 className="text-xl font-freesentation font-semibold">{name}</h3>
      <span className="border-t pt-2 mt-3 border-gray-200 text-xs text-gray-400">
        {categoryName}
      </span>
    </Link>
  );
};

export default Restaurant;
