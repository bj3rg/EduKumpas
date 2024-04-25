import React, { useState } from "react";
import axios from "axios"; // Import Axios

import FieldInput from "./FieldInput";

function AddActivity() {
  const [image, setImage] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [newActivity, setNewActivity] = useState({
    school: "",
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
        "http://127.0.0.1:8000/api/schools-activities",
        formData
      );
      console.log("Added successfully", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <div className="w-[750px] bg-blue-600 mt-500 px-[30px] py-[30px] rounded-[15px] z-[99]">
        <div className="text-white mb-[10px] flex flex-col gap-[3px]">
          <h1 className="font-bold border-b-2 border-solid border-white text-[16px]">
            Add ACTIVITY
          </h1>
          <p className="text-[12px]">
            Fill out the following fields. Use “N/A” if not applicable.
          </p>
        </div>
        <div className="flex flex-col gap-[10px]">
          {/* first row */}
          <div className="w-full flex justify-between">
            <FieldInput
              inputDisplay={"Activity Name"}
              type={"text"}
              width={"w-[340px]"}
              handleChange={(e) =>
                setNewActivity((prev) => ({
                  ...prev,
                  activity_name: e.target.value,
                }))
              }
            />
            <FieldInput
              inputDisplay={"School"}
              type={"text"}
              width={"w-[340px]"}
              handleChange={(e) =>
                setNewActivity((prev) => ({
                  ...prev,
                  school: e.target.value,
                }))
              }
            />
          </div>
          {/* second row */}
          <div className="w-full flex justify-between">
            <FieldInput
              inputDisplay={"Activity Description"}
              type={"text"}
              width={"w-[690px]"}
              handleChange={(e) =>
                setNewActivity((prev) => ({
                  ...prev,
                  activity_description: e.target.value,
                }))
              }
            />
          </div>
          {/* third row */}
          <div className="w-full flex justify-between">
            <input
              type="file"
              accept="image/jpeg, image/jpg, image/jpg"
              className="px-[5px] text-black h-[28px] bg-white rounded-[8px] w-[250px"
              onChange={handleFileChange}
            />
          </div>
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
    </div>
  );
}

export default AddActivity;
