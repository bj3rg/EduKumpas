import React from "react";
// import style from "../css/CompanyCard.module.css";

function CompanyCard({
  employeePosition,
  employeeDescription,
  employeeName,
  imageUrl,
}) {
  return (
    <div className="w-[100%] sm:w-[70%] md:w-[50%] lg:w-[25%] rounded-2xl border border-black border-2 m-10 shadow-md hover:shadow-lg flex flex-col items-center p-4">
      <img src={imageUrl} alt="" className="w-20 h-20 rounded-full mx-auto" />
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold mb-1 mt-2">{employeeName}</h1>
        <h4 className="text-gray-600 mb-1 text-center text-sm ">
          {employeePosition}
        </h4>
        <p className="text-justify">{employeeDescription}</p>
      </div>
    </div>
  );
}

export { CompanyCard };
