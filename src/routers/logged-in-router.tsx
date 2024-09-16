import nuberLogo from "../logo.svg";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Restaurants from "../pages/client/restaurants";
import Header from "../components/header";
import useMe from "../hooks/useMe";
import NotFound from "../pages/404";
import ConfirmEmail from "../pages/user/confirm-email";
import EditProfile from "../pages/user/edit-profile";
import Search from "../pages/client/search";
import Category from "../pages/client/category";
import RestaurantDetail from "../pages/client/restaurantDetail";
import React from "react";
import { UserRole } from "../__generated__/globalTypes";
import MyRestaurants from "../pages/owner/my-restaurants";
import AddRestaurant from "../pages/owner/add-restaurant";
import MyRestaurant from "../pages/owner/my-restaurant";
import AddDish from "../pages/owner/add-dish";
import Order from "../pages/order";
import Dashboard from "../pages/driver/dashboard";

interface IRoute {
  path: string;
  component: React.ReactNode;
  exact?: boolean;
}

const clientRoutes: IRoute[] = [
  {
    path: "/",
    component: <Restaurants />,
  },
  {
    path: "/search",
    component: <Search />,
  },
  {
    path: "/categories",
    component: <Category />,
  },
  {
    path: "/categories/:slug",
    component: <Category />,
  },
  {
    path: "/restaurants/:id",
    component: <RestaurantDetail />,
  },
];

const ownerRoutes: IRoute[] = [
  {
    path: "/",
    component: <MyRestaurants />,
  },
  {
    path: "/add-restaurant",
    component: <AddRestaurant />,
  },
  {
    path: "/restaurants/:id",
    component: <MyRestaurant />,
  },
  {
    path: "/restaurants/:id/add-dish",
    component: <AddDish />,
  },
];

const driverRoutes: IRoute[] = [
  {
    path: "/",
    component: <Dashboard />,
  },
];

const commonRoutes: IRoute[] = [
  {
    path: "/confirm",
    component: <ConfirmEmail />,
  },
  {
    path: "/edit-profile",
    component: <EditProfile />,
  },
  {
    path: "/orders/:id",
    component: <Order />,
  },
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex flex-col gap-10 justify-center items-center">
        <img src={nuberLogo} className="w-52" alt="logo" />
        <ul className="flex gap-4 *:size-2.5 *:bg-black *:rounded-full *:animate-bounce-10">
          <li />
          <li className="animation-delay-100" />
          <li className="animation-delay-200" />
        </ul>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {commonRoutes.map(({ path, component, exact = true }) => (
          <Route key={path} path={path} exact={exact}>
            {component}
          </Route>
        ))}
        {data.me.role === UserRole.Client &&
          clientRoutes.map(({ path, component, exact = true }) => (
            <Route key={path} path={path} exact={exact}>
              {component}
            </Route>
          ))}
        {data.me.role === UserRole.Owner &&
          ownerRoutes.map(({ path, component, exact = true }) => (
            <Route key={path} path={path} exact={exact}>
              {component}
            </Route>
          ))}
        {data.me.role === UserRole.Delivery &&
          driverRoutes.map(({ path, component, exact = true }) => (
            <Route key={path} path={path} exact={exact}>
              {component}
            </Route>
          ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
