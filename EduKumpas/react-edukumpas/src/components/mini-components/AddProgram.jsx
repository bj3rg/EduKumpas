import React, { useState } from "react";
import axios from "axios";
import FieldInput from "../../components/mini-components/FieldInput";
export const AddProgram = () => {
  const [newProgram, setNewProgram] = useState({
    school: "",
    program_name: "",
    program_description: "",
    tuition_fee: "",
    duration: "",
  });

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("school", newProgram.school);
    formData.append("program_name", newProgram.program_name);
    formData.append("program_description", newProgram.program_description);
    formData.append("tuition_fee", newProgram.tuition_fee);
    formData.append("duration", newProgram.duration);

    console.log("FormData", formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/schools-offered",
        formData
      );

      console.log("Program Added Successfully", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[750px] bg-blue-600 px-[30px] py-[30px]  rounded-[15px] z-[99]">
      <div className="text-white mb-[10px] flex flex-col gap-[3px]">
        <h1 className="font-bold border-b-2 border-solid border-white text-[16px]">
          Add Programs Offer
        </h1>
        <p className="text-[12px]">
          Fill out the following fields. Use “N/A” if not applicable.
        </p>
      </div>
      <div className="flex flex-col gap-[10px]">
        {/* first row */}
        <div className="w-full flex justify-between ">
          <FieldInput
            inputDisplay={"Program Name"}
            type={"text"}
            width={"w-[340px]"}
            handleChange={(e) => {
              setNewProgram((prev) => ({
                ...prev,
                program_name: e.target.value,
              }));
            }}
          />
          <FieldInput
            inputDisplay={"School"}
            type={"text"}
            width={"w-[340px]"}
            handleChange={(e) => {
              setNewProgram((prev) => ({
                ...prev,
                school: e.target.value,
              }));
            }}
          />
        </div>
        {/* second row */}
        <div className="w-full flex justify-between ">
          <FieldInput
            inputDisplay={"Program Description"}
            type={"text"}
            width={"w-[690px]"}
            handleChange={(e) => {
              setNewProgram((prev) => ({
                ...prev,
                program_description: e.target.value,
              }));
            }}
          />
        </div>
        {/* third row */}
        <div className="w-full flex justify-between ">
          <FieldInput
            inputDisplay={"Tuition Fee"}
            type={"number"}
            width={"w-[340px]"}
            handleChange={(e) => {
              setNewProgram((prev) => ({
                ...prev,
                tuition_fee: e.target.value,
              }));
            }}
          />
          <FieldInput
            inputDisplay={"Duration"}
            type={"text"}
            width={"w-[320px]"}
            handleChange={(e) => {
              setNewProgram((prev) => ({
                ...prev,
                duration: e.target.value,
              }));
            }}
          />
        </div>
        {/* fourth row */}

        <div className="w-full flex gap-[20px] mt-5 justify-between">
          <button className="p-[5px] bg-white rounded-[10px] text-black min-w-[70px] cursor-pointer">
            Clear
          </button>
          <button
            onClick={handleAdd}
            className="p-[5px] bg-white rounded-[10px] text-black min-w-[70px] cursor-pointer"
          >
            Add
          </button>
          {/* <ButtonComp2
            text="Add"
            otherStyle={"p-[5px] rounded-[10px]"}
            handleClick={handleClick}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default AddProgram;
