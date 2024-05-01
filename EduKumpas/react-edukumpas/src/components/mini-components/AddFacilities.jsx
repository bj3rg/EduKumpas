import React, { useState } from "react";
import axios from "axios";
import FieldInput from "../../components/mini-components/FieldInput";
export const AddFacilities = ({ school_id, school_name }) => {
  const [correct, setCorrect] = useState(false);
  const [exist, errorExist] = useState("");
  const [invalid, setInvalid] = useState("");
  const [newFacility, setNewFacility] = useState({
    school: school_id || "",
    facility_name: "",
    facility_description: "",
    facility_image: null,
  });
  const [errMsg, setErrMsg] = useState("");
  const [image, newImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      newImage(file);
    } else {
      setErrMsg("No image selected");
    }
  };
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!image) {
      setErrMsg("No image selected");
    }

    const formData = new FormData();
    formData.append("school", newFacility.school);
    formData.append("facility_name", newFacility.facility_name);
    formData.append("facility_description", newFacility.facility_description);
    formData.append("facility_image", image);
    console.log("FormData:", formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/facilities",
        formData,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log("added successfully", response.data);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 406) {
        errorExist("Facility already listed");
        setInvalid("");
        setCorrect(true);
      } else {
        setInvalid("Complete the fields");
        errorExist("");
        setCorrect(true);
        console.log("Error:", error);
      }
    }
  };
  return (
    <div className="w-full lg:w-[750px] bg-orange-400 mt-500 px-[30px] py-[30px]  rounded-[15px] z-[99]">
      <div className="text-white mb-[10px] flex flex-col gap-[3px]">
        <h1 className="font-bold border-b-2 border-solid border-white text-[16px]">
          Add New Facilities
        </h1>
      </div>
      <div className="flex flex-col gap-[10px]">
        {/* first row */}
        <div className="w-full flex justify-between">
          <FieldInput
            inputDisplay={"School"}
            type={"text"}
            value={school_name}
          />
        </div>
        <div className="w-full flex justify-between ">
          <FieldInput
            inputDisplay={"Facility Name"}
            type={"text"}
            handleChange={(e) => {
              setNewFacility((prev) => ({
                ...prev,
                facility_name: e.target.value,
              }));
            }}
          />
        </div>
        {/* second row */}
        <div className="w-full flex justify-between ">
          <FieldInput
            inputDisplay={"Facility Description"}
            type={"text"}
            handleChange={(e) => {
              setNewFacility((prev) => ({
                ...prev,
                facility_description: e.target.value,
              }));
            }}
          />
        </div>
        {/* third row */}
        <div className="w-full flex justify-between mt-2">
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/jpg"
            className="px-[5px] text-black h-[28px] bg-white rounded-[8px] w-[250px"
            onChange={handleFileChange}
          />
        </div>
        {/* fourth row */}
        {correct && (
          <div className="bg-[#F5656561] w-[200px] mt-2 text-sm border-[1px] border-[#FF000061] px-[20px] py-[5px] rounded-md">
            <h1>
              {invalid}
              {exist}
            </h1>
          </div>
        )}

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

export default AddFacilities;
