import React from "react";

export const SidePanel = () => {
  return (
    <div className="w-full mt-3 p-4 gap-20 flex flex-row border-solid border-b-4 border-gray-500">
      <div className="flex flex-col items-start gap-1 w-[30%]">
        <div className="flex gap-5 text-xl justify-center ">
          <input type="checkbox" name="checkbox1" value="College" />
          <label htmlFor="checkbox1">College</label>
        </div>
        <div className="flex gap-5 text-xl justify-center ">
          <input type="checkbox" name="checkbox1" value="Senior High School" />
          <label htmlFor="checkbox1">Senior High School</label>
        </div>
        <div className="flex gap-5 text-xl justify-center ">
          <input type="checkbox" name="checkbox1" value="Junior High School" />
          <label htmlFor="checkbox1">Junior High School</label>
        </div>
        <div className="flex gap-5 text-xl justify-center ">
          <input type="checkbox" name="checkbox1" value="Elementary" />
          <label htmlFor="checkbox1">Elementary</label>
        </div>
        <div className="flex gap-5 text-xl justify-center ">
          <input type="checkbox" name="checkbox1" value="Preschool" />
          <label htmlFor="checkbox1">Preschool</label>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8  h-[10%] w-[30%]">
        <label htmlFor="type" className="self-start">
          Private or Public:
        </label>
        <select
          id="type"
          className="form-control border-2 border rounded-md w-[100%] p-2"
          // onChange={handleChange}
        >
          <option value="Private">Private</option>
          <option value="Public">Public</option>
        </select>
      </div>
      {/* <div className="flex flex-col items-center  mt-5">
        <label htmlFor="type" className="self-start">
          Search
        </label>
        <input
          type="text"
          name="type"
          className="w-[100%] px-2 h-8 border-solid border border-gray-500 rounded-md"
        />
      </div> */}
      <div className=" w-[30%] h-[10%] self-center">
        <button className="hover:bg-orange-400 w-[100%] p-2 border border-solid border-black-500 bg-orange-500 rounded-md">
          Search
        </button>
      </div>
    </div>
  );
};
export default SidePanel;
