import React from "react";
import AddProgram from "../mini-components/AddProgram";
import AddAdmission from "../mini-components/AddAdmission";
import AddClub from "../mini-components/AddClub";
import AddActivity from "../mini-components/AddActivity";
import AddNews from "../mini-components/AddNews";
import AddFeatures from "../mini-components/AddFeatures";
import AddFacilities from "../mini-components/AddFacilities";
import Admin_Navbar from "../mini-components/AdminNavbar";
import { useParams } from "react-router-dom";

export const AddDataAdmin = () => {
  const { email, school_id, school_name } = useParams();
  return (
    <div className="flex flex-col">
      <div className="flex">
        <Admin_Navbar
          email={email}
          school_id={school_id}
          school_name={school_name}
        />
      </div>
      <div className="text-center m-10 text-xl">
        <h1>Add the information of {school_name} here </h1>
      </div>
      <div className="flex flex-col items-center gap-10">
        <AddProgram
          school_id={school_id}
          school_name={school_name}
        ></AddProgram>
        <AddAdmission
          school_id={school_id}
          school_name={school_name}
        ></AddAdmission>
        <AddFacilities
          school_id={school_id}
          school_name={school_name}
        ></AddFacilities>
        <AddActivity
          school_id={school_id}
          school_name={school_name}
        ></AddActivity>
        <AddNews school_id={school_id} school_name={school_name}></AddNews>
        <AddClub school_id={school_id} school_name={school_name}></AddClub>
        <AddFeatures
          school_id={school_id}
          school_name={school_name}
        ></AddFeatures>
      </div>
    </div>
  );
};

export default AddDataAdmin;
