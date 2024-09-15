import { gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  createDish,
  createDishVariables,
} from "../../__generated__/createDish";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IAddDishProps {
  id: string;
}

const AddDish = () => {
  const { id: restaurantId } = useParams<IAddDishProps>();
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION);
  return <div>Add Dish</div>;
};

export default AddDish;
