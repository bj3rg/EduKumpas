import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import editIcon from "../../assets/icons8-edit-50.png";
export const Admin = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/school-by-id/2")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div>
        <div className="flex justify-center mt-12">
          <table className="table-auto">
            <thead>
              <tr className="header-row text-left">
                <th className="p-2">name</th>
                <th className="p-2">website</th>
                <th className="p-2">public/private</th>
                <th className="p-2">number</th>
                <th className="p-2">address</th>
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
      </div>
    </div>
  );
};

export default Admin;
