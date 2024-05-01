import React, { useState } from "react";
import axios from "axios";
import FieldInput from "../../components/mini-components/FieldInput";
export const AddClub = ({ school_id, school_name }) => {
  const [correct, setCorrect] = useState(false);
  const [exist, errorExist] = useState("");
  const [invalid, setInvalid] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [image, newImage] = useState(null);
  const [newClub, setNewClub] = useState({
    school: school_id || "",
    club_name: "",
    club_description: "",
    club_image: null,
  });

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
      setErrMsg("no image selected");
    }

    const formData = new FormData();
    formData.append("school", newClub.school);
    formData.append("club_name", newClub.club_name);
    formData.append("club_description", newClub.club_description);
    formData.append("club_image", image);
    console.log("FormData: ", formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/clubs",
        formData,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log("Added Successfully", response.data);
      setCorrect(false);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 406) {
        errorExist("Club already Listed");
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
          Add School Clubs or Organization Available
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
            inputDisplay={"Club Name"}
            type={"text"}
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
            handleChange={(e) => {
              setNewClub((prev) => ({
                ...prev,
                club_description: e.target.value,
              }));
            }}
          />
        </div>
        {/* third row */}
        <div className="w-full flex justify-between mt-2 ">
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
              {exist}
              {invalid}
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
        </div>
      </div>
    </div>
  );
};

export default AddClub;
