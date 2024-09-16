/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myRestaurant
// ====================================================

export interface myRestaurant_myRestaurant_restaurant_category {
  __typename: "Category";
  slug: string;
  name: string;
}

export interface myRestaurant_myRestaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface myRestaurant_myRestaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: myRestaurant_myRestaurant_restaurant_menu_options_choices[] | null;
}

export interface myRestaurant_myRestaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: myRestaurant_myRestaurant_restaurant_menu_options[] | null;
}

export interface myRestaurant_myRestaurant_restaurant_orders {
  __typename: "Order";
  id: number;
  total: number | null;
  createdAt: any;
}

export interface myRestaurant_myRestaurant_restaurant {
  __typename: "Restaurant";
  category: myRestaurant_myRestaurant_restaurant_category | null;
  menu: myRestaurant_myRestaurant_restaurant_menu[];
  orders: myRestaurant_myRestaurant_restaurant_orders[];
  id: number;
  name: string;
  coverImg: string;
  address: string;
  isPromoted: boolean;
}

export interface myRestaurant_myRestaurant {
  __typename: "MyRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: myRestaurant_myRestaurant_restaurant | null;
}

export interface myRestaurant {
  myRestaurant: myRestaurant_myRestaurant;
}

export interface myRestaurantVariables {
  input: MyRestaurantInput;
}
