import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import editIcon from "../../assets/icons8-edit-50.png";
import Admin_Navbar from "../mini-components/AdminNavbar";
export const Admin = () => {
  const [data, setData] = useState([]);
  const [exp, setExp] = useState([]);
  const [offer, setOffer] = useState([]);
  const [facility, setFacility] = useState([]);
  const [activity, setActivity] = useState([]);
  const [news, setNews] = useState([]);
  const [club, setClub] = useState([]);
  const [feature, setFeature] = useState([]);
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
    // SCHOOL
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
    // Admission GET
    axios
      .get("http://127.0.0.1:8000/api/admin/admission/0", {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setExp(res.data);
      });
    // Offer GET
    axios
      .get("http://127.0.0.1:8000/api/admin/offered/0", {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setOffer(res.data);
      });
    // Activity GET
    axios
      .get("http://127.0.0.1:8000/api/admin/activities/0", {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setActivity(res.data);
      });
    // Facility GET
    axios
      .get("http://127.0.0.1:8000/api/admin/facilities/0", {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const expensesData = res.data[0];
        const school_id = expensesData.id;
        setFacility(res.data);
      });
    //Club GET
    axios
      .get("http://127.0.0.1:8000/api/admin/clubs/0", {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const expensesData = res.data[0];
        const school_id = expensesData.id;
        console.log("Here");
        console.log(school_id);
        setClub(res.data);
      });
    //Features GET
    axios
      .get("http://127.0.0.1:8000/api/admin/features/0", {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const expensesData = res.data[0];
        const school_id = expensesData.id;
        console.log("Here");
        console.log(school_id);
        setFeature(res.data);
      });
    //News GET
    axios
      .get("http://127.0.0.1:8000/api/admin/news/0", {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const expensesData = res.data[0];
        const school_id = expensesData.id;
        console.log("Here");
        console.log(school_id);
        setNews(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteAdm = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/admission/${id}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      });
      alert("Admission deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting admission:", error);
      alert("Error deleting admission");
    }
  };
  const handleDeleteActi = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/activities/${id}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      });
      alert("Activity deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert("Error deleting activity");
    }
  };
  const handleDeletePro = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/offered/${id}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      });
      alert("Program deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting program:", error);
      alert("Error deleting program");
    }
  };
  const handleDeleteFaci = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/facilities/${id}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      });
      alert("Facilities deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting facility:", error);
      alert("Error deleting facility");
    }
  };
  const handleDeleteNews = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/news/${id}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      });
      alert("News deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Error deleting news");
    }
  };
  const handleDeleteClub = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/clubs/${id}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      });
      alert("Activity deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert("Error deleting activity");
    }
  };
  const handleDeleteFeat = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/features/${id}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      });
      alert("Feature deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting feature:", error);
      alert("Error deleting feature");
    }
  };

  return (
    <div>
      <Admin_Navbar
        email={email}
        school_id={schoolId}
        school_name={schoolName}
      />
      <div className="flex flex-col justify-center items-center">
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
        {/* EXPENSES */}
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
                    <button
                      onClick={() => handleDeleteAdm(d.id)}
                      className="w-8"
                    >
                      <img src={editIcon} alt="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* PROGRAM OFFERED */}
        <div className="flex justify-center w-[60%] mt-12">
          <table className="table-auto border border-collapse">
            <thead>
              <tr className="header-row text-left">
                <th className="p-2 border border-slate-600">Program Name</th>
                <th className="p-2 border border-slate-600">
                  Program Description
                </th>
                <th className="p-2 border border-slate-600">Start Range</th>
                <th className="p-2 border border-slate-600">End Range</th>
                <th className="p-2 border border-slate-600">Duration</th>
                <th className="border border-slate-600"></th>
              </tr>
            </thead>
            <tbody>
              {offer.map((d, i) => (
                <tr key={i}>
                  <td className="p-2">{d.program_name}</td>
                  <td className="p-2">{d.program_description}</td>
                  <td className="p-2">{d.tuition_fee_start_range}</td>
                  <td className="p-2">{d.tuition_fee_end_range}</td>
                  <td className="p-2">{d.duration}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeletePro(d.id)}
                      className="w-8"
                    >
                      <img src={editIcon} alt="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* FACILITIES */}
        <div className="flex justify-center w-[60%] mt-12">
          <table className="table-auto border border-collapse">
            <thead>
              <tr className="header-row text-left">
                <th className="p-2 border border-slate-600">Facility Name</th>
                <th className="p-2 border border-slate-600">
                  Facility Description
                </th>
                <th className="p-2 border border-slate-600">Image</th>

                <th className="border border-slate-600"></th>
              </tr>
            </thead>
            <tbody>
              {facility.map((d, i) => (
                <tr key={i}>
                  <td className="p-2">{d.facility_name}</td>
                  <td className="p-2">{d.facility_description}</td>
                  <td className="p-2">
                    <img
                      className="w-42 h-32"
                      src={`http://127.0.0.1:8000/media/${d.facility_image}`}
                      alt=""
                    />
                  </td>

                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteFaci(d.id)}
                      className="w-8"
                    >
                      <img src={editIcon} alt="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ACTIVITIES */}
        <div className="flex justify-center w-[60%] mt-12">
          <table className="table-auto border border-collapse">
            <thead>
              <tr className="header-row text-left">
                <th className="p-2 border border-slate-600">Activity Name</th>
                <th className="p-2 border border-slate-600">
                  Activity Description
                </th>
                <th className="p-2 border border-slate-600">Activity Image</th>
              </tr>
            </thead>
            <tbody>
              {activity.map((d, i) => (
                <tr key={i}>
                  <td className="p-2">{d.activity_name}</td>
                  <td className="p-2">{d.activity_description}</td>
                  <td className="p-2">
                    <img
                      className="w-42 h-32"
                      src={`http://127.0.0.1:8000/media/${d.activity_image}`}
                      alt=""
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteActi(d.id)}
                      className="w-8"
                    >
                      <img src={editIcon} alt="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* NEWS */}
        <div className="flex justify-center w-[60%] mt-12">
          <table className="table-auto border border-collapse">
            <thead>
              <tr className="header-row text-left">
                <th className="p-2 border border-slate-600">News Header</th>
                <th className="p-2 border border-slate-600">News Body</th>
                <th className="p-2 border border-slate-600">News Image</th>
                <th className="border border-slate-600"></th>
              </tr>
            </thead>
            <tbody>
              {news.map((d, i) => (
                <tr key={i}>
                  <td className="p-2">{d.news_header}</td>
                  <td className="p-2">{d.news_description}</td>
                  <td className="p-2">
                    <img
                      className="w-42 h-32"
                      src={`http://127.0.0.1:8000/media/${d.news_image}`}
                      alt=""
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteNews(d.id)}
                      className="w-8"
                    >
                      <img src={editIcon} alt="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* CLUBS */}
        <div className="flex justify-center w-[60%] mt-12">
          <table className="table-auto border border-collapse">
            <thead>
              <tr className="header-row text-left">
                <th className="p-2 border border-slate-600">Club Name</th>
                <th className="p-2 border border-slate-600">
                  Club Description
                </th>
                <th className="p-2 border border-slate-600">Club Image</th>
                <th className="border border-slate-600"></th>
              </tr>
            </thead>
            <tbody>
              {club.map((d, i) => (
                <tr key={i}>
                  <td className="p-2">{d.club_name}</td>
                  <td className="p-2">{d.club_description}</td>
                  <td className="p-2">
                    <img
                      className="w-48 h-32"
                      src={`http://127.0.0.1:8000/media/${d.club_image}`}
                      alt=""
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteClub(d.id)}
                      className="w-8"
                    >
                      <img src={editIcon} alt="" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Features */}
        <div className="flex justify-center w-[60%] mt-12">
          <table className="table-auto border border-collapse">
            <thead>
              <tr className="header-row text-left">
                <th className="p-2 border border-slate-600">Features</th>
                <th className="border border-slate-600"></th>
              </tr>
            </thead>
            <tbody>
              {feature.map((d, i) => (
                <tr key={i}>
                  <td className="p-2">
                    <img
                      className="w-42 h-32"
                      src={`http://127.0.0.1:8000/media/${d.feature_image}`}
                      alt=""
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteFeat(d.id)}
                      className="w-8"
                    >
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
