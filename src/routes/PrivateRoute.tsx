import { Navigate, Outlet } from "react-router-dom";
import { useEffect, type FC, type PropsWithChildren } from "react";

interface NavbarSidebarLayoutProps {
  isAuthenticated ?: any;
}

const PrivateRoute:  FC<PropsWithChildren<NavbarSidebarLayoutProps>> = ({ isAuthenticated }) => {
  return isAuthenticated == true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
