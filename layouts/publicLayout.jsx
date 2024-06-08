import React from "react";
import { useSelector } from "react-redux";
import { Route, Outlet, Navigate } from "react-router-dom";
import Header from "../components/layout/header";

function PublicLayout() {
  const isAuth = useSelector((state) => state.auth?.isAuth);
  if (isAuth !== true) {
    return <Navigate to="/login" replace />; // `replace` prevents going back to previous page
  }

  return (
    <>
      <Header />
      <div
        style={{ minHeight: "72.5vh" }}
        className="auth-modal body-style mt-3 px-1 px-md-3 px-lg-5 "
      >
        <Outlet />
      </div>
    </>
  );
}

export default PublicLayout;
