// import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPages from "../pages/ContactPages";
import NavBar from "../components/NavBar";
import UsersPage from "../pages/UsersPage";

const MainLayout = () => {
  return (
    <div className="flex flex-col gap-2">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPages />} />
        <Route path="/Users" element={<UsersPage />} />
      </Routes>
    </div>
  );
};

export default MainLayout;
