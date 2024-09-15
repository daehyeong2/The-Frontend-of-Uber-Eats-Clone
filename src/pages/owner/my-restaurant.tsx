import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";

const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IParams {
  id: string;
}

const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );
  console.log(data);
  return <div>My Restaurant</div>;
};

export default MyRestaurant;
