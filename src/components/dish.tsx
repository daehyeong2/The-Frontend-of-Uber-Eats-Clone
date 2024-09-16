import React, { useState } from "react";
import { restaurant_restaurant_restaurant_menu_options } from "../__generated__/restaurant";
import { cn } from "../utils/cn";
import { useForm } from "react-hook-form";

interface IDishProps {
  restaurantId?: number;
  id: number;
  name: string;
  price: number;
  description: string;
  photo: string;
  isCustomer?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[];
  orderStarted?: boolean;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
  isSelected?: boolean;
}

interface ISelection {
  id: string;
  extra: number;
  index?: number;
}

const Dish: React.FC<IDishProps> = ({
  restaurantId,
  id,
  name,
  price,
  description,
  photo,
  options,
  isCustomer = false,
  orderStarted = false,
  addItemToOrder,
  removeFromOrder,
  isSelected,
}) => {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const [selections, setSelections] = useState<ISelection[]>([]);
  const onSubmit = () => {
    const itemOptions: { name: string; choice?: string }[] = [];
    selections.map((selection) => {
      const option = options![+selection.id.split("-")[1]];
      if (option.choices && option.choices.length > 0) {
        const choice = option.choices[selection.index!]?.name;
        itemOptions.push({ name: option.name, choice });
      } else {
        itemOptions.push({ name: option.name });
      }
    });
    const input = {
      restaurantId,
      items: [
        {
          dishId: id,
          options: itemOptions,
        },
      ],
    };
    console.log(input);
  };
  const onChange = (data: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, alt, id },
    } = data;
    if (alt) {
      if (selections.findIndex((selection) => selection.id === id) !== -1) {
        setSelections((prev) =>
          prev.filter((selection) => selection.id !== id)
        );
      } else {
        setSelections((prev) => [...prev, { id, extra: +alt }]);
      }
    } else {
      setSelections((prev) => prev.filter((selection) => selection.id !== id));
      setSelections((prev) => [
        ...prev,
        { id, extra: +value.split("-")[1], index: +value.split("-")[0] },
      ]);
    }
  };
  const onClick = () => {
    if (orderStarted) {
      if (isSelected && removeFromOrder) {
        removeFromOrder(id);
      } else if (addItemToOrder) {
        addItemToOrder!(id);
      }
    }
  };
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 grid grid-cols-3 border cursor-pointer border-gray-300 hover:border-gray-500 transition-colors group",
        isCustomer && "grid-rows-2",
        isSelected && "border-gray-800 hover:border-gray-800"
      )}
    >
      <div
        className={cn(
          "col-span-2 p-1.5 flex flex-col justify-between",
          !isCustomer && "justify-between"
        )}
      >
        <div>
          <h4 className="text-xl font-freesentation font-medium">{name}</h4>
          <h5 className="font-freesentation text-sm tracking-wide">
            {description}
          </h5>
        </div>
        <span className="font-freesentation">${price}</span>
      </div>
      <img
        className="object-cover object-center size-32 group-[:not(:hover)]:rounded-tr-2xl group-[:not(:hover)]:rounded-bl-2xl group-hover:rounded-tl-3xl group-hover:rounded-br-3xl transition-all duration-[400ms]"
        src={photo}
        alt={name}
      />
      {isCustomer && (
        <div className="col-span-3 flex flex-col">
          {options?.length !== 0 && (
            <>
              <h5 className="font-semibold font-freesentation mt-4 mb-2">
                Dish Options:
              </h5>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2 ml-3 h-full justify-between"
              >
                {options?.map((option, idx) => (
                  <li
                    key={idx}
                    className={cn(
                      "flex gap-1",
                      (option?.choices?.length ?? 0) > 0
                        ? "flex-col"
                        : "justify-between"
                    )}
                  >
                    {(option?.choices?.length ?? 0) > 0 ? (
                      <>
                        <span className="mb-0.5 text-sm font-freesentation font-medium">
                          {option.name}
                          {option.extra !== 0 && ` (+$${option.extra})`}:
                        </span>
                        <select
                          className="ml-3 text-sm border px-1.5 py-1 font-freesentation font-light"
                          defaultValue={0}
                          id={`${id}-${idx}`}
                          required
                          {...register(idx + "", {
                            required: true,
                            onChange,
                          })}
                        >
                          <option disabled value={0}>
                            Please Select an Option
                          </option>
                          {option.choices?.map((choice, idx) => (
                            <option
                              key={idx}
                              value={
                                typeof choice.extra === "number"
                                  ? `${idx}-${choice.extra + option.extra!}`
                                  : ""
                              }
                            >
                              {choice.name} (
                              {choice.extra === 0
                                ? "Free"
                                : `+$${choice.extra}`}
                              )
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <>
                        <label
                          htmlFor={`${id}-${idx}`}
                          className="font-freesentation text-sm w-full"
                        >
                          {option.name} (
                          {option.extra === 0 ? "Free" : `+$${option.extra}`})
                        </label>
                        <input
                          alt={option.extra + "" ?? ""}
                          {...register(idx + "", { onChange })}
                          id={`${id}-${idx}`}
                          type="checkbox"
                        />
                      </>
                    )}
                  </li>
                ))}
                <div className="flex flex-col">
                  <h4 className="text-end font-freesentation">
                    Total:{" "}
                    <span className="font-semibold">
                      $
                      {price +
                        selections
                          ?.map((selection) => +selection.extra ?? 0)
                          .reduce((partialSum, a) => partialSum + a, 0)}
                    </span>
                  </h4>
                  <button className="w-fit px-3 py-1.5 ml-auto font-freesentation bg-blue-500 text-white rounded-md mt-2">
                    Add to Cart
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dish;
