import React from "react";
import { NavLink } from "react-router-dom";

export const SchoolDetailBar = ({ onTabClick, activeTab }) => {
  const tabs = [
    { name: "Programs", value: "programs" },
    { name: "Admissions", value: "admissions" }, // Add this tab if needed
    { name: "Facilities", value: "facilities" },
    { name: "Activities", value: "activities" },
    { name: "Clubs", value: "clubs" },
    { name: "News", value: "news" },
    { name: "Features", value: "features" },
  ];

  return (
    <div className="w-[100%]">
      <ul className="flex flex-row flex-wrap border border-5 border-black w-full p-2 justify-around">
        {tabs.map((tab) => (
          <li key={tab.value} className=" sm:w-auto">
            <button
              className={`px-3 py-2 rounded-md ${
                activeTab === tab.value ? "bg-gray-200 font-bold" : "" // Add styling for active tab
              }`}
              onClick={() => onTabClick(tab.value)}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
