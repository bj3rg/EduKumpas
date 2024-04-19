import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export const NewsCard = ({ schoolID }) => {
  const [schoolsData, setSchoolsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/schools-news",
          {
            params: { school: schoolID },
          }
        );
        console.log("SchoolID:" + schoolID);
        console.log(response.data); // Log the fetched data to the console
        setSchoolsData(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty depen
  return (
    <div className=" mb-10 ">
      {schoolsData.map((value, index) => (
        <div className="flex flex-col gap-10 items-center">
          <div
            key={index}
            className="flex items-center flex-col border border-2 border-black rounded-xl p-5 gap-3 w-[100%] sm:w-[70%]"
          >
            <h4 className="font-bold text-3xl">{value.news_header}</h4>
            <p className="text-red-600 text-justify mb-2">
              {value.news_description}
            </p>
            <div className="w-[100%] h-[100%] lg:w-[60%] lg:h-[60%] relative">
              <img
                className="w-full h-full object-cover object-center rounded-xl"
                src={`http://127.0.0.1:8000/media/${value.news_image}`}
                alt=""
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCard;
