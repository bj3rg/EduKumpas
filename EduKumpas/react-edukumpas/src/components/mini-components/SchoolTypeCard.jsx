import React from "react";
function SchoolTypeCard({ imageUrl, schoolType }) {
  return (
    <div className="border-solid border-2 border-black rounded-xl w-60 h-52 md:w-72 flex justify-center items-center transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-md">
      <div className="flex justify-center flex-col content-between">
        <img src={imageUrl} alt="icon" className="w-24 h-24 mx-auto mb-5" />
        <h1 className="text-2xl text-center font-semibold">{schoolType}</h1>
      </div>
    </div>
  );
}

export { SchoolTypeCard };
