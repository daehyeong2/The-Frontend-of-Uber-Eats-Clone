import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { getOrder, getOrderVariables } from "../__generated__/getOrder";

const GET_ORDER_QUERY = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        id
        status
        total
        driver {
          email
        }
        customer {
          email
        }
        restaurant {
          name
        }
      }
    }
  }
`;

interface IParams {
  id: string;
}

const Order = () => {
  const params = useParams<IParams>();
  const { data } = useQuery<getOrder, getOrderVariables>(GET_ORDER_QUERY, {
    variables: {
      input: {
        id: +params.id,
      },
    },
  });
  console.log(data);
  return <div>{params.id}</div>;
};

export default Order;
