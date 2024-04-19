import React from "react";
import { SchoolTypeCard } from "../mini-components/SchoolTypeCard";
import style from "../css/School.module.css";
import sampleLogo from "../../assets/test.jpg";
import { NavLink } from "react-router-dom";
export const Schools = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-[60%] lg:w-[30%] mt-10 mb-10">
        <h1 className="text-center text-3xl">FIND YOUR DREAM SCHOOL NOW</h1>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed modi
          magni quos itaque? Recusandae, dignissimos iure! Iste maxime, omnis
          soluta officia pariatur dolorem adipisci, optio corporis, obcaecati
          temporibus velit neque?
        </p>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row gap-10 items-center ">
          <NavLink to="/schools/list-college" className={style.navLinkCustom}>
            <SchoolTypeCard
              imageUrl={sampleLogo}
              schoolType="COLLEGE"
            ></SchoolTypeCard>
          </NavLink>
          <NavLink to="/schools/list-senior" className={style.navLinkCustom}>
            <SchoolTypeCard
              imageUrl={sampleLogo}
              schoolType="SENIOR HIGH SCHOOL"
            ></SchoolTypeCard>
          </NavLink>
          <NavLink to="/schools/list-junior" className={style.navLinkCustom}>
            <SchoolTypeCard
              imageUrl={sampleLogo}
              schoolType="JUNIOR HIGH SCHOOL"
            ></SchoolTypeCard>
          </NavLink>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-10 mb-10">
          <NavLink
            to="/schools/list-elementary"
            className={style.navLinkCustom}
          >
            {" "}
            <SchoolTypeCard
              imageUrl={sampleLogo}
              schoolType="ELEMENTARY"
            ></SchoolTypeCard>
          </NavLink>
          <NavLink to="/schools/list-preschool" className={style.navLinkCustom}>
            {" "}
            <SchoolTypeCard
              imageUrl={sampleLogo}
              schoolType="PRESCHOOL"
            ></SchoolTypeCard>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Schools;
