// import React from 'react'

import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "px-2 py-2 bg-blue-400 hover:bg-blue-600  cursor-pointer text-white "
              : "px-2 py-2 bg-orange-400 hover:bg-orange-600  cursor-pointer text-black"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "px-2 py-2 bg-blue-400 hover:bg-blue-600  cursor-pointer text-white "
              : "px-2 py-2 bg-orange-400 hover:bg-orange-600  cursor-pointer text-black"
          }
        >
          About
        </NavLink>{" "}
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "px-2 py-2 bg-blue-400 hover:bg-blue-600  cursor-pointer text-white "
              : "px-2 py-2 bg-orange-400 hover:bg-orange-600  cursor-pointer text-black"
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? "px-2 py-2 bg-blue-400 hover:bg-blue-600  cursor-pointer text-white "
              : "px-2 py-2 bg-orange-400 hover:bg-orange-600  cursor-pointer text-black"
          }
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
