import React from "react";

export const SidePanel = () => {
  return (
    <div>
      <div className="flex flex-col items-start">
        <div className="flex gap-5 text-xl justify-center ">
          <input type="checkbox" name="checkbox1" value="College" />
          <label htmlFor="checkbox1">College</label>
        </div>
        <div className="flex gap-5 text-xl justify-center ">
          <input type="checkbox" name="checkbox1" value="College" />
          <label htmlFor="checkbox1">Senior High School</label>
        </div>
        <div className="flex gap-5 text-xl justify-center ">
          <input type="checkbox" name="checkbox1" value="College" />
          <label htmlFor="checkbox1">Junior High School</label>
        </div>
        <div className="flex gap-5 text-xl justify-center ">
          <input type="checkbox" name="checkbox1" value="College" />
          <label htmlFor="checkbox1">Elementary</label>
        </div>
        <div className="flex gap-5 text-xl justify-center ">
          <input type="checkbox" name="checkbox1" value="College" />
          <label htmlFor="checkbox1">Preschool</label>
        </div>
      </div>
    </div>
  );
};
export default SidePanel;
