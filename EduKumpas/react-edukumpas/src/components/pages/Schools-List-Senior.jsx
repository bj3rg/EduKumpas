import { SchoolsListCard } from "../mini-components/SchoolsListCard";

const School_List_Senior = () => {
  // Define state to hold the fetched data
  const schoolType = "Senior High School";
  return (
    <div className="flex flex-col justify-center items-center mb-20 grid ">
      <h1>{schoolType} in Batangas</h1>
      <div className="mt-20 w-[80%] flex justify-around">
        <SchoolsListCard school_type={schoolType}></SchoolsListCard>
      </div>
    </div>
  );
};

export default School_List_Senior;
