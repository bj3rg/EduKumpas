import React, { useState } from "react";
import axios from "axios";
import FieldInput from "../../components/mini-components/FieldInput";
export const AddClub = () => {
  const [errMsg, setErrMsg] = useState("");
  const [image, newImage] = useState(null);
  const [newClub, setNewClub] = useState({
    school: "",
    club_name: "",
    club_description: "",
    club_image: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.values[0];
    if (file) {
      newImage(file);
    } else {
      setErrMsg("No image selected");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!image) {
      setErrMsg("no image selected");
    }

    const formData = new FormData();
    formData.append("school", newClub.school);
    formData.append("school", newClub.club_name);
    formData.append("school", newClub.club_description);
    formData.append("school", newClub.club_image);
    console.log("FormData: ", formData);

    try {
      const response = await axios.post("", formData);
      console.log("Added Successfully", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <div className="w-[750px] bg-blue-600 mt-500 px-[30px] py-[30px]  rounded-[15px] z-[99]">
        <div className="text-white mb-[10px] flex flex-col gap-[3px]">
          <h1 className="font-bold border-b-2 border-solid border-white text-[16px]">
            Add School Clubs or Organization Available
          </h1>
          <p className="text-[12px]">
            Fill out the following fields. Use “N/A” if not applicable.
          </p>
        </div>
        <div className="flex flex-col gap-[10px]">
          {/* first row */}
          <div className="w-full flex justify-between ">
            <FieldInput
              inputDisplay={"Club Name"}
              type={"text"}
              width={"w-[340px]"}
              handleChange={(e) => {
                setNewClub((prev) => ({
                  ...prev,
                  club_name: e.target.value,
                }));
              }}
            />
          </div>
          {/* second row */}
          <div className="w-full flex justify-between ">
            <FieldInput
              inputDisplay={"Club Description"}
              type={"text"}
              width={"w-[690px]"}
              handleChange={(e) => {
                setNewClub((prev) => ({
                  ...prev,
                  club_description: e.target.value,
                }));
              }}
            />
          </div>
          {/* third row */}
          <div className="w-full flex justify-between ">
            <input
              type="file"
              accept="image/jpeg, image/jpg, image/jpg"
              className="px-[5px] text-black h-[28px] bg-white rounded-[8px] w-[250px"
              onChange={handleFileChange}
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
    </div>
  );
};

export default AddClub;
