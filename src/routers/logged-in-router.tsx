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

interface IRoutes {
  path: string;
  component: React.ReactNode;
}

const clientRoutes: IRoutes[] = [
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

const ownerRoutes: IRoutes[] = [
  {
    path: "/",
    component: <MyRestaurants />,
  },
];

const commonRoutes = [
  {
    path: "/confirm",
    component: <ConfirmEmail />,
  },
  {
    path: "/edit-profile",
    component: <EditProfile />,
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
        {commonRoutes.map(({ path, component }) => (
          <Route key={path} path={path}>
            {component}
          </Route>
        ))}
        {data.me.role === UserRole.Client &&
          clientRoutes.map(({ path, component }) => (
            <Route key={path} path={path}>
              {component}
            </Route>
          ))}
        {data.me.role === UserRole.Owner &&
          ownerRoutes.map(({ path, component }) => (
            <Route key={path} path={path}>
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
