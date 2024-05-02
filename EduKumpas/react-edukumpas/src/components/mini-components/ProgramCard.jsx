import React from "react";
import { NavLink } from "react-router-dom";
export const ProgramCard = ({
  school_name,
  program_name,
  program_description,
  tuition_start,
  tuition_end,
  id,
  index,
}) => {
  return (
    <div className="flex flex-col gap-10 items-center">
      <div
        key={index}
        className=" flex flex-col justify-center border rounded-2xl p-2 border-black h-[100%] border-2 w-[100%]"
      >
        <div className="flex flex-col w-[100%]">
          <h1 className="font-bold text-xl">{program_name}</h1>
          <h1 className="font-bold text-md">{school_name}</h1>
          <h5 className="text-sm ">{program_description}</h5>
          <h5 className="text-sm">
            Tuition per year:{" "}
            <span className="text-red-600">
              {" "}
              Php.{tuition_start}-{tuition_end}
            </span>
          </h5>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 m-2">
          <NavLink to={`/schools/${school_name}/${id}`}>
            <button className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 font-medium rounded-full text-lg px-8 py-2 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 me-2 mb-2">
              Browse
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
