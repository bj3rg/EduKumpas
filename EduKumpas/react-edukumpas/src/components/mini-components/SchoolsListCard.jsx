import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
function SchoolsListCard({ school_type }) {
  const [schoolsData, setSchoolsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/schools", {
          params: { school_type: school_type },
        });
        console.log(response.data); // Log the fetched data to the console
        setSchoolsData(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array to run this effect only once
  return (
    // <div className="border border-2 border-black rounded-2xl w-[60%] lg:w-[25%] m-20">
    <div className="flex gap-10 w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {schoolsData.map((school, index) => (
        <div className="flex flex-col gap-10 items-center">
          <div
            key={index}
            className=" flex flex-col justify-center border rounded-2xl p-2 border-black h-[100%] border-2 w-[100%]"
          >
            <div>
              <h1 className="font-bold text-2xl">{school.school_name}</h1>
              <h5>{school.school_location}</h5>
              <h5>{school.public_private}</h5>
            </div>
            <div className="flex flex-col justify-center items-center gap-5 m-2">
              {/* <p>{school.school_logo}</p> */}
              <img
                className="w-24 h-24"
                src={`http://127.0.0.1:8000/media/${school.school_logo}`}
                alt="Image"
              />

              <NavLink to={`/schools/${school.school_name}/${school.id}`}>
                <button className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 font-medium rounded-full text-lg px-12 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 me-2 mb-2">
                  Browse
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { SchoolsListCard };
