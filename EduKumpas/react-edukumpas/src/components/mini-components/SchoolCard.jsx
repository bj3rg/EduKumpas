import React from "react";
import { NavLink } from "react-router-dom";
export const SchoolCard = ({
  index,
  school_name,
  school_location,
  public_private,
  school_type,
  school_logo,
  id,
}) => {
  return (
    <div className="flex flex-col gap-10 items-center">
      <div
        key={index}
        className=" flex flex-col justify-center border rounded-2xl p-2 border-black h-[100%] border-2 w-[100%]"
      >
        <div className="flex flex-col w-[100%]">
          <h1 className="font-bold text-xl">{school_name}</h1>
          <h5 className="text-sm ">{school_location}</h5>
          <h5 className="text-sm">
            {public_private} - {school_type}
          </h5>
          {/* <h5>{school_type}</h5> */}
        </div>
        <div className="flex flex-col justify-center items-center gap-5 m-2">
          {/* <p>{school.school_logo}</p> */}
          <img
            className="w-16 h-16"
            src={`http://127.0.0.1:8000${school_logo}`}
            alt="Image"
          />

          <NavLink to={`/schools/${school_name}/${id}`}>
            <button className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 font-medium rounded-full text-lg px-12 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 me-2 mb-2">
              Browse
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
