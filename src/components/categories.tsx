import React from "react";
import { restaurantsPageQuery } from "../__generated__/restaurantsPageQuery";

interface ICategoriesProps {
  data?: restaurantsPageQuery;
}

const Categories: React.FC<ICategoriesProps> = ({ data }) => {
  return (
    <div className="flex justify-around max-w-sm mx-auto">
      {data?.allCategories.categories?.map((category) => (
        <div
          className="flex flex-col gap-1 items-center cursor-pointer group"
          key={category.id}
        >
          <div
            className="rounded-full size-14 flex flex-col justify-center items-center bg-contain group-hover:bg-gray-100"
            style={{
              backgroundImage: `url(${category.icon})`,
            }}
          />
          <span className="text-sm font-semibold font-freesentation">
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
