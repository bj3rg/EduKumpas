import React from "react";
import AddProgram from "../mini-components/AddProgram";
import AddAdmission from "../mini-components/AddAdmission";
import AddClub from "../mini-components/AddClub";
import AddActivity from "../mini-components/AddActivity";
import AddNews from "../mini-components/AddNews";
import AddFeatures from "../mini-components/AddFeatures";
import AddFacilities from "../mini-components/AddFacilities";

export const AddDataAdmin = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-10">
        <AddProgram></AddProgram>
        <AddAdmission></AddAdmission>
        <AddFacilities></AddFacilities>
        <AddActivity></AddActivity>
        <AddNews></AddNews>
        <AddClub></AddClub>
        <AddFeatures></AddFeatures>
      </div>
    </div>
  );
};

export default AddDataAdmin;
