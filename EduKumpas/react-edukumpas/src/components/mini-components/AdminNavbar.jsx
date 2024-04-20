import React, { useState } from "react";
import navIcon from "../../assets/icons8-nav-50.png";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
export const Admin_Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function onToggleMenu() {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  }

  return (
    <header className="bg-white flex justify-between items-center w-[92%] mx-auto">
      <NavLink to="/home">
        <img src={logo} alt="edukumpas-logo" className="w-32 md:w-52" />
      </NavLink>

      <nav
        className={`md:static bg-gray-100 md:bg-white absolute left-0 top-[8%] md:top-0 md:w-auto w-full items-center px-5 ${
          isMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 py-4 text-xl">
          <li>
            <NavLink
              to="/representative/view-data"
              className="hover:text-gray-500"
            >
              View Data
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/representative/add-data"
              className="hover:text-gray-500"
            >
              Add Data
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/" className="hover:text-gray-500">
              Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="hover:text-gray-500">
              Schools
            </NavLink>
          </li> */}
        </ul>
      </nav>
      <div className="flex items-center gap-6 py-2">
        <NavLink to="/sign-up">
          <button className="bg-[#87ac] text-white px-5 py-2 rounded-full hover:bg-[#F22222]">
            Logout
          </button>
        </NavLink>
        <img
          src={navIcon}
          alt=""
          onClick={onToggleMenu}
          className={`cursor-pointer w-8 h-8 md:hidden transform duration-300 ${
            isMenuOpen ? "rotate-45" : ""
          }`}
        />
        <i></i>
      </div>
    </header>
  );
};

export default Admin_Navbar;
