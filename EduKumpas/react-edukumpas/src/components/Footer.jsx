import React from "react";
import logo from "../assets/logo.png";
import twitter from "../assets/twitter.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";

import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="flex justify-center flex-col md:flex-row md:justify-between justify-center  w-[92%] mt-20">
      <div className="flex items-center">
        <img src={logo} alt="edukumpas-logo" className="w-48" />
        <p className=""></p>
      </div>
      <nav>
        <ul className="flex md:flex-row flex-col md:items-center justify-between py-8 gap-8 text-xl">
          <li>
            <NavLink to="">Home</NavLink>
          </li>
          <li>
            <NavLink to="">About Us</NavLink>
          </li>
          <li>
            <NavLink to="">Get A Quote</NavLink>
          </li>
          <li>
            <NavLink to="">FAQ</NavLink>
          </li>
        </ul>
      </nav>
      <ul className="flex flex-row py-4 gap-6">
        <li>
          <img src={facebook} alt="facebook-logo" className="w-12" />
        </li>
        <li>
          <img src={instagram} alt="ig-logo" className="w-12" />
        </li>
        <li>
          <img src={twitter} alt="twitter-logo" className="w-12" />
        </li>
      </ul>
    </footer>
  );
}

export { Footer };
