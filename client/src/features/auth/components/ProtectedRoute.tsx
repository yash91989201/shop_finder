import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCheckAuthStatusQuery } from "../authApi";

export default function ProtectedRoute(): React.ReactElement {
  const { data, isLoading } = useCheckAuthStatusQuery("");
  if (isLoading) return <p>Loading</p>;
  if (data?.isAuthenticated)
    return (
      <div>
        <Outlet />
      </div>
    );
  else return <Navigate to="/" />;
}
