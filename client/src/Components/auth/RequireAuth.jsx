import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ allowedRoles }) {
  const { role, isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" />
  ) : (
    <Navigate to="/login" />
  );
}
