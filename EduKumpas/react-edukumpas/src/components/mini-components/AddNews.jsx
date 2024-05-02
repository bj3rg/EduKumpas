import React, { useState } from "react";
import axios from "axios";
import FieldInput from "../../components/mini-components/FieldInput";
export const AddNews = ({ school_id, school_name }) => {
  const [correct, setCorrect] = useState(false);
  const [invalid, setInvalid] = useState("");
  const [newNews, setNewNews] = useState({
    school: school_id || "",
    news_header: "",
    news_description: "",
    news_image: null,
  });
  const [errMsg, setErrMsg] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setErrMsg("no image selected");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!image) {
      setErrMsg("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("school", newNews.school);
    formData.append("news_header", newNews.news_header);
    formData.append("news_description", newNews.news_description);
    formData.append("news_image", image);
    console.log("FormData:", formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/news/0",
        formData,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setCorrect(false);
      alert("Added Successfully");
      window.location.reload();
    } catch (error) {
      setInvalid("Complete the fields");
      setCorrect(true);
      console.log(error);
    }
  };
  return (
    <div className=" w-full lg:w-[750px] bg-orange-400 mt-500 px-[30px] py-[30px]  rounded-[15px] z-[99]">
      <div className="text-white mb-[10px] flex flex-col gap-[3px]">
        <h1 className="font-bold border-b-2 border-solid border-white text-[16px]">
          Add News
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
            inputDisplay={"News Header"}
            type={"text"}
            handleChange={(e) => {
              setNewNews((prev) => ({
                ...prev,
                news_header: e.target.value,
              }));
            }}
          />
        </div>
        {/* second row */}
        <div className="w-full flex justify-between ">
          <FieldInput
            inputDisplay={"News Body"}
            type={"text"}
            handleChange={(e) => {
              setNewNews((prev) => ({
                ...prev,
                news_description: e.target.value,
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
            <h1>{invalid}</h1>
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

export default AddNews;
