import React from "react";

interface IDishProps {
  name: string;
  price: number;
  description: string;
  photo: string;
}

const Dish: React.FC<IDishProps> = ({ name, price, description, photo }) => {
  return (
    <div className="p-4 grid grid-cols-3 border border-gray-300 hover:border-gray-500 transition-colors group">
      <div className="col-span-2 p-1.5 flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-freesentation font-medium">{name}</h4>
          <h5 className="font-freesentation tracking-wide">{description}</h5>
        </div>
        <span className="font-freesentation">${price}</span>
      </div>
      <img
        className="object-cover object-center size-32 group-[:not(:hover)]:rounded-tr-2xl group-[:not(:hover)]:rounded-bl-2xl group-hover:rounded-tl-3xl group-hover:rounded-br-3xl transition-all duration-[400ms]"
        src={photo}
        alt={name}
      />
    </div>
  );
};

export default Dish;
