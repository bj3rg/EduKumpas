import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export const Features = ({ schoolID }) => {
  const [schoolsData, setSchoolsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/schools-features",
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
  }, []);
  return (
    <div className=" flex grid grid-cols-1 md:grid-cols-2 gap-10 ">
      {schoolsData.map((info, index) => (
        <div key={index} className="flex justify-center">
          <img
            className="w-96 h-48 object-fill rounded-xl"
            src={`http://127.0.0.1:8000/media/${info.feature_image}`}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default Features;
