import React from "react";
import { Routes, Route, useNavigation } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Layout from "./layout";
import MyShops from "./pages/my-shops";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import SingleShop from "./pages/single-shop";

export default function App(): React.ReactElement {
  return (
    <div className="">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/my-shops" element={<MyShops />}></Route>
          <Route path="/my-shops/:shop_id" element={<SingleShop />} />
          {/* </Route> */}
        </Routes>
      </Layout>
    </div>
  );
}
