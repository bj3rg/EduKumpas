import React from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
export const OfferedCard = ({ schoolID }) => {
  const [schoolsData, setSchoolsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/schools-offered",
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
    <div className="flex gap-10 w-[100%] grid grid-cols-1 md:grid-cols-2">
      {schoolsData.map((offered, index) => (
        <div className="flex flex-col gap-10 items-center">
          <div
            key={index}
            className="flex flex-col justify-center border border-2 border-black rounded-xl p-5 gap-3 w-[100%] md:w-[80%]"
          >
            <h4 className="font-bold">{offered.program_name}</h4>
            <p className="text-justify">
              Course Decsription: Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Iure sed, cum fugiat recusandae deleniti
              explicabo deserunt laudantium sunt, porro soluta architecto nemo
              facilis consectetur officiis, culpa aliquid adipisci doloremque
              quos.
            </p>
            <p className="text-red-600">Tuition Fee: {offered.tuition_fee}</p>
            <p className="text-red-600">Program Duration: {offered.duration}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfferedCard;
