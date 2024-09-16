import React, { useEffect, useState } from "react";
import { restaurant_restaurant_restaurant_menu_options } from "../__generated__/restaurant";
import { cn } from "../utils/cn";
import { useForm } from "react-hook-form";
import { CreateOrderItemInput } from "../__generated__/globalTypes";

interface IDishProps {
  id: number;
  name: string;
  price: number;
  description: string;
  photo: string;
  isCustomer?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[];
  orderStarted?: boolean;
  addItemToOrder?: (dish: CreateOrderItemInput) => void;
  removeItemFromOrder?: (dishId: number) => void;
}

interface ISelection {
  id: string;
  extra: number;
  index?: number;
}

const Dish: React.FC<IDishProps> = ({
  id,
  name,
  price,
  description,
  photo,
  options,
  isCustomer = false,
  orderStarted = false,
  addItemToOrder,
  removeItemFromOrder,
}) => {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const [selections, setSelections] = useState<ISelection[]>([]);
  const [quantity, setQuantity] = useState(0);
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
    if (
      addItemToOrder &&
      itemOptions.length >=
        (options?.filter((option) => option.choices?.length ?? 0 > 0)?.length ??
          999999)
    ) {
      addItemToOrder({
        dishId: id,
        options: itemOptions,
      });
      setQuantity((prev) => prev + 1);
    }
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
  const onRemoveItemFromOrder = () => {
    removeItemFromOrder!(id);
    setQuantity((prev) => prev - 1);
  };
  useEffect(() => {
    if (!orderStarted) {
      setSelections([]);
      setQuantity(0);
    }
  }, [orderStarted]);

  const totalExtra = selections
    ?.map((selection) => +selection.extra ?? 0)
    .reduce((partialSum, a) => partialSum + a, 0);

  return (
    <div
      className={cn(
        "p-4 grid grid-cols-3 border border-gray-300 hover:border-gray-400 transition-all group hover:shadow-md",
        isCustomer && orderStarted && "grid-rows-2"
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
      {isCustomer && orderStarted && (
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
                        ? "flex-col order-1"
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
                <div className="flex flex-col order-2">
                  <h4 className="text-end font-freesentation">
                    Total:{" "}
                    <span className="font-semibold">${price + totalExtra}</span>
                  </h4>
                  <div className="ml-auto mt-2">
                    {quantity !== 0 && (
                      <button
                        onClick={onRemoveItemFromOrder}
                        type="button"
                        className="w-fit px-3 py-1.5 font-freesentation bg-red-500 text-white rounded-md mr-2"
                      >
                        Remove from Cart
                      </button>
                    )}
                    <button className="w-fit px-3 py-1.5 font-freesentation bg-blue-500 text-white rounded-md">
                      Add to Cart{quantity !== 0 && ` (${quantity})`}
                    </button>
                  </div>
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
