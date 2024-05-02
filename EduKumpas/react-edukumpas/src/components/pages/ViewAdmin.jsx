import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import editIcon from "../../assets/icons8-edit-50.png";
import Admin_Navbar from "../mini-components/AdminNavbar";
export const Admin = () => {
  const [data, setData] = useState([]);
  const [exp, setExp] = useState([]);
  const [schoolId, setSchoolId] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { email } = useParams();
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get(`http://127.0.0.1:8000/api/admin/schools/${email}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const schoolData = res.data[0];
        const school_id = schoolData.id;
        const school_name = schoolData.school_name;
        console.log(schoolName);
        setSchoolName(school_name);
        setSchoolId(school_id);

        setData(res.data);
      });
    axios
      .get("http://127.0.0.1:8000/api/admin/admission/0", {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const expensesData = res.data[0];
        const school_id = expensesData.id;
        console.log("Here");
        console.log(school_id);
        setExp(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (admissionId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/admin/admission/${admissionId}`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      alert("Admission deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting admission:", error);
      alert("Error deleting admission");
    }
  };

  return (
    <div>
      <Admin_Navbar
        email={email}
        school_id={schoolId}
        school_name={schoolName}
      />
      <div>
        <div className="flex justify-center mt-12">
          <table className="table-auto border">
            <thead>
              <tr className="header-row text-left">
                <th className="p-2 border border-slate-600">name</th>
                <th className="p-2 border border-slate-600">website</th>
                <th className="p-2 border border-slate-600">public/private</th>
                <th className="p-2 border border-slate-600">number</th>
                <th className="p-2 border border-slate-600">address</th>
                <th className="p-2 border border-slate-600"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td className="p-2">{d.school_name}</td>
                  <td className="p-2">{d.school_website}</td>
                  <td className="p-2">{d.public_private}</td>
                  <td className="p-2">{d.school_type}</td>
                  <td className="p-2">{d.school_location}</td>
                  <td className="p-2">
                    <button className="w-8">
                      <img src={editIcon} alt="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-12">
          <table className="table-auto border border-collapse">
            <thead>
              <tr className="header-row text-left">
                <th className="p-2 border border-slate-600">Expenses Name</th>
                <th className="p-2 border border-slate-600">Description</th>
                <th className="p-2 border border-slate-600">Cost</th>
                <th className="border border-slate-600"></th>
              </tr>
            </thead>
            <tbody>
              {exp.map((d, i) => (
                <tr key={i}>
                  <td className="p-2">{d.name}</td>
                  <td className="p-2">{d.description}</td>
                  <td className="p-2">{d.fee}</td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(d.id)} className="w-8">
                      <img src={editIcon} alt="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
