import React, { useState, useEffect } from "react";
import SchoolCard from "../mini-components/SchoolCard";
import SidePanel from "../mini-components/SidePanel";
import axios from "axios";
import ProgramCard from "../mini-components/ProgramCard";

export const Search = () => {
  const [concatenatedResult, setConcatenatedResult] = useState("");
  const [school, setSchool] = useState([]);
  const [program, setProgram] = useState([]);
  const [backUpSchool, setBackUpSchool] = useState([]);
  const [backUpProgram, setBackUpProgram] = useState([]);
  const [noMatch, setNoMatch] = useState(false);
  const [search, setSearch] = useState("");
  const [showSchool, doShowSchool] = useState(false);
  const [showProgram, doShowProgram] = useState(false);
  const [form, setForm] = useState({
    school_type: "",
  });
  const updateConcatenatedResult = (result) => {
    setConcatenatedResult(result);
  };
  useEffect(() => {
    fetchData(); // Fetch initial data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/schools-search"
      );
      console.log(response.data);
      setSchool(response.data);
      setBackUpSchool(response.data); // Update backup data
    } catch (error) {
      console.log(error);
    }

    try {
      const response2 = await axios.get(
        "http://127.0.0.1:8000/api/schools-offered"
      );
      console.log(response2.data);
      setProgram(response2.data);
      setBackUpProgram(response2.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();

    // If search value is empty, reset to initial data
    if (!searchValue) {
      setSchool(backUpSchool);
      setProgram(backUpProgram);
      setNoMatch(false);
      return;
    }

    const matches = backUpSchool.filter((element) => {
      const to_search = `${element.school_name} ${element.school_type} ${element.public_private} ${element.school_location}`;
      return to_search.toLowerCase().includes(searchValue);
    });
    const matches2 = backUpProgram.filter((element) => {
      const to_search2 = `${element.program_name} ${element.program_description} ${element.school_name}`;
      return to_search2.toLowerCase().includes(searchValue);
    });

    const searchNum = parseFloat(searchValue);
    const rangeMatches = backUpProgram.filter((program) => {
      const tuitionFeeStart = parseFloat(program.tuition_fee_start_range);
      const tuitionFeeEnd = parseFloat(program.tuition_fee_end_range);
      return searchNum >= tuitionFeeStart && searchNum <= tuitionFeeEnd;
    });

    if (matches.length < 1 && matches2.length < 1 && rangeMatches.length < 1) {
      setNoMatch(true);
    } else {
      setNoMatch(false);
    }
    const combinedMatches = matches2.concat(rangeMatches);
    setSchool(matches);
    setProgram(combinedMatches);
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      school_type: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { school_type } = form;

    if (school_type === "School") {
      doShowSchool(true);
      console.log("HERE");
    } else {
      doShowSchool(false);
    }

    if (school_type === "Program") {
      doShowProgram(true);
    } else {
      doShowProgram(false);
    }
    updateConcatenatedResult(concatenatedResult);
    console.log("Concatenated Result:", concatenatedResult);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col w-[60%] lg:w-[30%] mt-10 mb-10">
        <h1 className="text-center text-3xl">SEARCH YOUR DREAM SCHOOL</h1>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed modi
          magni quos itaque? Recusandae, dignissimos iure! Iste maxime, omnis
          soluta officia pariatur dolorem adipisci, optio corporis, obcaecati
          temporibus velit neque?
        </p>
      </div>

      <div className="flex-col md:flex-row items-center justify-between md:items-start w-[90%] lg:w-[70%] border-b-4 flex border-gray-500">
        <h1 className=" rounded-t-xl text-4xl w-[102%] lg:w-[25%] md:w-[30%] sm:w-[35%] p-1 text-center bg-gray-500 text-bold text-white">
          FILTER
        </h1>
        {/* <div className="flex flex-col self-end"> */}
        <input
          type="text"
          name="type"
          onChange={handleSearch}
          placeholder="Search"
          className="w-full md:w-[300px] px-2 h-12 border-solid border-2 border-gray-500 rounded-md"
        />
        {/* </div> */}
      </div>
      <div className="w-[70%] flex items-center ">
        <div className="flex items-center justify-center w-full">
          {/* <div className="w-full mt-3 p-4 gap-20 flex flex-row border-solid border-b-4 border-gray-500"> */}
          <form
            className="w-full mt-3 p-4 gap-1 lg:gap-20 flex flex-col md:flex-row items-center justify-center border-solid border-b-4 border-gray-500"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center mb-6  h-[10%] w-[100%] lg:w-[30%]">
              <label htmlFor="type" className="self-start">
                View Type:
              </label>
              <select
                id="type"
                className="form-control border-2 border rounded-md w-[100%] p-2"
                onChange={handleOptionChange}
              >
                <option value=""></option>
                <option value="School">School</option>
                <option value="Program">Program</option>
              </select>
            </div>

            <div className=" w-[100%] lg:w-[30%] h-[10%] self-center">
              <button
                type="submit"
                value="tite"
                className="hover:bg-orange-400 w-[100%] p-2 border border-solid border-black-500 bg-orange-500 rounded-md"
              >
                Search
              </button>
            </div>
          </form>

          {/* </div> */}
        </div>
      </div>
      {noMatch && (
        <h1 className=" text-black w-full text-center font-semibold py-[30px] text-[25px]">
          No Match Found
        </h1>
      )}
      {showSchool && (
        <div className="flex flex-row justify-between items-center gap-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] mt-10">
          {school.map((schoolItem, i) => (
            <SchoolCard
              key={i}
              id={schoolItem.id}
              school_location={schoolItem.school_location}
              public_private={schoolItem.public_private}
              school_name={schoolItem.school_name}
              school_logo={schoolItem.school_logo}
              school_type={schoolItem.school_type}
            />
          ))}
        </div>
      )}
      {showProgram && (
        <div className="flex flex-row justify-between items-center gap-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] mt-10">
          {program.map((programItem, i) => (
            <ProgramCard
              key={i}
              id={programItem.school}
              school_name={programItem.school_name}
              program_name={programItem.program_name}
              program_description={programItem.program_description}
              tuition_start={programItem.tuition_fee_start_range}
              tuition_end={programItem.tuition_fee_end_range}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
