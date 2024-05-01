import React from "react";
import testImage from "../../assets/test.jpg";
import style from "../css/Home.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center mt-15 lg:mt-40">
      <div className="flex flex-col w-[80%] lg:w-[80%] lg:flex-row justify-center">
        <div className="">
          <div className="mt-10">
            <h1 className="text-5xl sm:text-7xl text-center lg:text-start">
              Your next
            </h1>
            <h1 className="text-5xl sm:text-7xl text-center">Navi-Gateway</h1>
          </div>
          <p className="mt-5 mb-5 text-justify ml-5 mr-5 lg:ml-0 lg:mr-0">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. At qui
            itaque ipsa illo laboriosam, fuga et, necessitatibus assumenda optio
            voluptatibus alias non asperiores. Corporis similique delectus
            magni, eos accusantium voluptatum!
          </p>
          <div className="flex flex-col justify-center items-center md:flex-row  gap-5 md:gap-10">
            <NavLink to="/search">
              <button className={style.searchButton}>FIND SCHOOL</button>
            </NavLink>
            <button
              className={style.addButton}
              onClick={() => navigate("/login")}
            >
              ADD YOUR SCHOOL
            </button>
          </div>
        </div>

        <img src={testImage} alt="" className="w-full lg:w-2/4  p-5" />
      </div>
    </div>
  );
};

export default Home;
1;
