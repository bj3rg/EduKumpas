import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import navIcon from "../assets/icons8-nav-50.png";

function Navbar() {
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
            <NavLink to="/home" className="hover:text-gray-500">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-us" className="hover:text-gray-500">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className="hover:text-gray-500">
              Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/schools" className="hover:text-gray-500">
              Schools
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-6 py-2">
        <NavLink to="/sign-up">
          <button className="bg-[#87ac] text-white px-5 py-2 rounded-full hover:bg-[#F22222]">
            Add School
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
}

export { Navbar };
