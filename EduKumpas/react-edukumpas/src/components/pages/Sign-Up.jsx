import React, { useState } from "react";
import axios from "axios";
import imgTest from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Sign_Up = () => {
  const navigate = useNavigate();
  const [option, selectedOption] = useState("");
  const [correct, setCorrect] = useState(false);
  const [newAccount, setNewAccount] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
    school: "",
    contact_number: "",
  });
  const handleChange = (e) => {
    selectedOption(e.target.value);
  };
  // new line here
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log("SCHOOL TYPE", option);
    const formData = new FormData();
    formData.append("username", newAccount.username);
    formData.append("first_name", newAccount.first_name);
    formData.append("last_name", newAccount.last_name);
    formData.append("email_address", newAccount.email_address);
    formData.append("password", newAccount.password);
    formData.append("school", newAccount.school);
    formData.append("contact_number", newAccount.contact_number);
    formData.append("school_type", option);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/representative",
        formData
      );
      console.log(response.data);
      if (response.data !== "Email already registered") {
        setCorrect(false);
        console.log("Successfully added", response.data);
        navigate("/login");
      } else {
        setCorrect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full md:w-3/5 items-center flex flex-col xl:flex-row justify-center gap-10 bg-white p-8 rounded-lg">
        <div className="flex flex-col  w-80">
          <NavLink to="/home">
            <img src={imgTest} alt="" />
          </NavLink>
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            debitis rerum saepe cupiditate, voluptatem distinctio aliquam
            inventore adipisci quam quod eius maiores ab voluptas, numquam
            suscipit alias dolores dolor modi.{" "}
            <NavLink to="/home">
              <span className="underline text-sm">
                Click here to visit page
              </span>
            </NavLink>
          </h1>
        </div>
        <div className="flex  justify-center flex-col rounded-md p-2 gap-2">
          <form action="" className="flex flex-col items-end border gap-2 p-8">
            <div className="flex items-center gap-2">
              {correct && (
                <div className="bg-[#F5656561] text-sm border-[1px] border-[#FF000061] px-[20px] py-[5px] rounded-md">
                  <h1>Incorrect username or password</h1>
                </div>
              )}
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                placeholder="Enter your username"
                className="form-control border-2 border rounded-md w-60 p-2"
                onChange={(e) =>
                  setNewAccount((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your First Name"
                className="form-control border-2 border rounded-md w-60 p-2"
                onChange={(e) =>
                  setNewAccount((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your Last Name"
                className="form-control border-2 border rounded-md w-60 p-2"
                onChange={(e) =>
                  setNewAccount((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter email:"
                className="form-control border-2 border rounded-md w-60 p-2"
                onChange={(e) =>
                  setNewAccount((prev) => ({
                    ...prev,
                    email_address: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="email">Contact No.</label>
              <input
                type="text"
                placeholder="Enter contact number:"
                className="form-control border-2 border rounded-md w-60 p-2"
                onChange={(e) =>
                  setNewAccount((prev) => ({
                    ...prev,
                    contact_number: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="schoolName">School Name</label>
              <input
                type="text"
                id="schoolName"
                placeholder="Enter school name"
                className="form-control border-2 border rounded-md w-60 p-2"
                onChange={(e) =>
                  setNewAccount((prev) => ({
                    ...prev,
                    school: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                className="form-control border-2 border rounded-md w-60 p-2"
                onChange={handleChange}
              >
                <option value="College">College</option>
                <option value="Senior High School">Senior High School</option>
                <option value="Junior High School">Junior High School</option>
                <option value="Elementary">Elementary</option>
                <option value="Preschool">Preschool</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter password:"
                className="form-control border-2 border w-60 p-2 rounded-md"
                onChange={(e) =>
                  setNewAccount((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <div className="text-center">
              <NavLink to="/login">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded "
                  formAction=""
                  onClick={handleAdd}
                >
                  Create
                </button>
              </NavLink>
            </div>
          </form>
          <div className="flex flex-row gap-1 items-center">
            <p className="text-xs">Already have an account?</p>
            <NavLink to="/login">
              <button className="underline flex-end text-xs">Login</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
