import React from "react";
import SidePanel from "../mini-components/SidePanel";
export const Search = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-[60%] lg:w-[30%] mt-10 mb-10">
        <h1 className="text-center text-3xl">SEARCH YOUR DREAM SCHOOL</h1>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed modi
          magni quos itaque? Recusandae, dignissimos iure! Iste maxime, omnis
          soluta officia pariatur dolorem adipisci, optio corporis, obcaecati
          temporibus velit neque?
        </p>
      </div>

      <div className="w-[90%] lg:w-[70%] pr-5 border-b-4  border-gray-500">
        <h1 className="rounded-t-xl text-4xl w-[102%] lg:w-[25%] md:w-[30%] sm:w-[35%] p-3 text-center bg-gray-500 text-bold text-white">
          FILTER
        </h1>
      </div>
      <div className="self-start ml-[5%] lg:ml-[15%]">
        <SidePanel />
      </div>
    </div>
  );
};

export default Search;
