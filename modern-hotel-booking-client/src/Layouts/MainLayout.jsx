import React from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router";
import Footer from '../Components/Footer'

const MainLayout = () => {
  return (
    <div>
      <Header></Header>
      <main className="">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
