import React, { useState } from "react";
import axios from "axios"; // Import Axios

import FieldInput from "./FieldInput";

function AddActivity({ school_id, school_name }) {
  const [correct, setCorrect] = useState(false);
  const [exist, errorExist] = useState("");
  const [invalid, setInvalid] = useState("");
  const [image, setImage] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [newActivity, setNewActivity] = useState({
    school: school_id || "",
    activity_name: "",
    activity_description: "",
    activity_image: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setErrMsg("no Image Selected");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!image) {
      setErrMsg("No image selected");
      return;
    }
    const formData = new FormData();
    formData.append("school", newActivity.school);
    formData.append("activity_name", newActivity.activity_name);
    formData.append("activity_description", newActivity.activity_description);
    formData.append("activity_image", image); // Add image data to FormData

    console.log("FormData:", formData); // Log the FormData before sending the request
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/activities/0",
        formData,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log("Added successfully", response.data);
      setCorrect(false);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 406) {
        errorExist("Program already Listed");
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
    <div className="w-full lg:w-[750px] bg-orange-400 mt-500 px-[30px] py-[30px] rounded-[15px] z-[99]">
      <div className="text-white mb-[10px] flex flex-col gap-[3px]">
        <h1 className="font-bold border-b-2 border-solid border-white text-[16px]">
          Add activity
        </h1>
      </div>
      <div className="flex flex-col gap-[10px] ">
        {/* first row */}
        <div className="w-full flex justify-between">
          <FieldInput
            inputDisplay={"School"}
            type={"text"}
            value={school_name}
          />
        </div>
        <div className="w-full flex justify-between">
          <FieldInput
            inputDisplay={"Activity Name"}
            type={"text"}
            handleChange={(e) =>
              setNewActivity((prev) => ({
                ...prev,
                activity_name: e.target.value,
              }))
            }
          />
        </div>
        {/* second row */}
        <div className="w-full flex justify-between">
          <FieldInput
            inputDisplay={"Activity Description"}
            type={"text"}
            handleChange={(e) =>
              setNewActivity((prev) => ({
                ...prev,
                activity_description: e.target.value,
              }))
            }
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
        {correct && (
          <div className="bg-[#F5656561] w-[200px] mt-2 text-sm border-[1px] border-[#FF000061] px-[20px] py-[5px] rounded-md">
            <h1>
              {exist}
              {invalid}
            </h1>
          </div>
        )}
        {/* fourth row */}
        <div className="w-full flex gap-[20px] mt-5 justify-between">
          <button
            className="p-[5px] bg-white rounded-[10px] text-black min-w-[70px] cursor-pointer"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddActivity;
