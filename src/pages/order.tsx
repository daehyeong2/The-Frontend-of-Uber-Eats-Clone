import { gql, useQuery, useSubscription } from "@apollo/client";
import { useParams } from "react-router-dom";
import { getOrder, getOrderVariables } from "../__generated__/getOrder";
import { Helmet } from "react-helmet-async";
import { ORDER_FRAGMENT } from "../fragments";
import {
  orderUpdates,
  orderUpdatesVariables,
} from "../__generated__/orderUpdates";
import { useEffect } from "react";
import useMe from "../hooks/useMe";

const GET_ORDER_QUERY = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        ...OrderParts
      }
    }
  }
  ${ORDER_FRAGMENT}
`;

const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
      ...OrderParts
    }
  }
  ${ORDER_FRAGMENT}
`;

interface IParams {
  id: string;
}

const Order = () => {
  const params = useParams<IParams>();
  const { data: userData } = useMe();
  const { data, subscribeToMore } = useQuery<getOrder, getOrderVariables>(
    GET_ORDER_QUERY,
    {
      variables: {
        input: {
          id: +params.id,
        },
      },
    }
  );
  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: {
          input: {
            id: +params.id,
          },
        },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: orderUpdates } }
        ) => {
          if (!data) return prev;
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...data.orderUpdates,
              },
            },
          };
        },
      });
    }
  }, [data]);
  return (
    <div className="flex justify-center mt-32 px-3">
      <Helmet>
        <title>Order #{params.id} | Nuber Eats</title>
      </Helmet>
      <div className="max-w-lg w-full border border-gray-800">
        <header className="bg-gray-800 py-4 text-center text-white text-lg">
          Order #{params.id}
        </header>
        <div className="p-3 mt-3">
          <h4 className="text-center text-2xl">
            Total: ${data?.getOrder.order?.total}
          </h4>
          <ul className="grid gap-1 mt-8">
            <li className="text-lg border-t border-gray-800 py-4 font-freesentation">
              Prepared By:{" "}
              <span className="font-semibold">
                {data?.getOrder.order?.restaurant?.name}
              </span>
            </li>
            <li className="text-lg border-t border-gray-800 py-4 font-freesentation">
              Deliver To:{" "}
              <span className="font-semibold">
                {data?.getOrder.order?.customer?.email}
              </span>
            </li>
            <li className="text-lg border-t border-gray-800 py-4 font-freesentation">
              Prepared By:{" "}
              <span className="font-semibold">
                {data?.getOrder.order?.driver?.email ?? "Not yet."}
              </span>
            </li>
          </ul>
          {userData?.me.role === "Client" && (
            <h5 className="text-lime-600 text-xl text-center my-4 font-freesentation font-semibold">
              Status: {data?.getOrder.order?.status}
            </h5>
          )}
          {userData?.me.role === "Owner" && (
            <>
              {data?.getOrder.order?.status === "Pending" && (
                <button className="text-lg flex justify-center mx-auto mt-3 font-freesentation bg-lime-600 text-white rounded-sm px-4 py-2 hover:opacity-95 w-full">
                  Accept Order
                </button>
              )}
              {data?.getOrder.order?.status === "Cooking" && (
                <button className="text-lg flex justify-center mx-auto mt-3 font-freesentation bg-lime-600 text-white rounded-sm px-4 py-2 hover:opacity-95 w-full">
                  Order Cooked
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
