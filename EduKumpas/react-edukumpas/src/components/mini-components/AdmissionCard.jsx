import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
export const AdmissionCard = ({ schoolID }) => {
  const [schoolsData, setSchoolsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/schools-admission",
          {
            params: { school: schoolID },
          }
        );
        console.log("SCHOOLID:" + schoolID);
        setSchoolsData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex gap-10 w-[100%] grid grid-cols-1 md:grid-cols-2">
      {schoolsData.map((admission, index) => (
        <div className="flex flex-col gap-10 items-center">
          <div
            // key={index}
            className="flex flex-col justify-center border border-2 border-black rounded-xl p-5 gap-3 w-[100%] md:w-[80%]"
          >
            <h4 className="font-bold">{admission.name}</h4>
            <p className="text-justify">{admission.description}</p>
            <p className="text-red-600">Cost: Php.{admission.fee}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AdmissionCard;
