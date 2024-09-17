import { gql, useMutation } from "@apollo/client";
import { getOrder_getOrder_order } from "../__generated__/getOrder";
import { OrderStatus, UserRole } from "../__generated__/globalTypes";
import { meQuery_me } from "../__generated__/meQuery";
import { editOrder, editOrderVariables } from "../__generated__/editOrder";
import { useParams } from "react-router-dom";
import React from "react";

const EDIT_ORDER_MUTATION = gql`
  mutation editOrder($input: EditOrderInput!) {
    editOrder(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

interface IOrderButtonProps {
  me: meQuery_me;
  order: getOrder_getOrder_order;
}

const OrderButton: React.FC<IOrderButtonProps> = ({ me, order }) => {
  const params = useParams<IParams>();
  const [editOrderMutation] = useMutation<editOrder, editOrderVariables>(
    EDIT_ORDER_MUTATION
  );
  const onButtonClick = (newStatus: OrderStatus) => {
    editOrderMutation({
      variables: {
        input: {
          id: +params.id,
          status: newStatus,
        },
      },
    });
  };
  const isClient = me.role === UserRole.Client;
  const isOwner = me.role === UserRole.Owner;
  const isDelivery = me.role === UserRole.Delivery;

  const showText =
    isClient ||
    (isOwner &&
      ![OrderStatus.Pending, OrderStatus.Cooking].includes(order.status)) ||
    (isDelivery &&
      ![OrderStatus.Cooked, OrderStatus.PickedUp].includes(order.status));
  return (
    <>
      {showText ? (
        <h5 className="text-lime-600 text-xl text-center my-4 font-freesentation font-semibold">
          Status: {order.status}
        </h5>
      ) : isOwner ? (
        <>
          {order.status === OrderStatus.Pending && (
            <button
              onClick={() => onButtonClick(OrderStatus.Cooking)}
              className="text-lg flex justify-center mx-auto mt-3 font-freesentation bg-lime-600 text-white rounded-sm px-4 py-2 hover:opacity-95 w-full"
            >
              Accept Order
            </button>
          )}
          {order.status === OrderStatus.Cooking && (
            <button
              onClick={() => onButtonClick(OrderStatus.Cooked)}
              className="text-lg flex justify-center mx-auto mt-3 font-freesentation bg-lime-600 text-white rounded-sm px-4 py-2 hover:opacity-95 w-full"
            >
              Order Cooked
            </button>
          )}
        </>
      ) : (
        isDelivery && (
          <>
            {order.status === OrderStatus.Cooked && (
              <button
                onClick={() => onButtonClick(OrderStatus.PickedUp)}
                className="text-lg flex justify-center mx-auto mt-3 font-freesentation bg-lime-600 text-white rounded-sm px-4 py-2 hover:opacity-95 w-full"
              >
                Picked Up
              </button>
            )}
            {order.status === OrderStatus.PickedUp && (
              <button
                onClick={() => onButtonClick(OrderStatus.Delivered)}
                className="text-lg flex justify-center mx-auto mt-3 font-freesentation bg-lime-600 text-white rounded-sm px-4 py-2 hover:opacity-95 w-full"
              >
                OrderDelivered
              </button>
            )}
          </>
        )
      )}
      {order.status === OrderStatus.Delivered && (
        <h5 className="text-lime-600 text-center my-4 font-freesentation font-semibold">
          Thank you for using Nuber Eats
        </h5>
      )}
    </>
  );
};

export default OrderButton;
