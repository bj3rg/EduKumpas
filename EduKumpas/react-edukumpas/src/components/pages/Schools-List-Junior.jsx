import { SchoolsListCard } from "../mini-components/SchoolsListCard";

const School_List_Junior = () => {
  // Define state to hold the fetched data
  const schoolType = "Junior High School";
  return (
    <div className="flex flex-col justify-center items-center mb-20 mt-5">
      <div className="flex flex-col w-[50%] text-center gap-3">
        <h1 className="text-2xl">{schoolType} in Batangas</h1>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quod
          reprehenderit perspiciatis qui nobis ut laudantium excepturi, numquam
          error, iure aspernatur deserunt unde. Fuga nulla nostrum, ad harum
          perspiciatis inventore?
        </p>
      </div>
      <div className="mt-20 w-[80%]">
        <SchoolsListCard school_type={schoolType} />
      </div>
    </div>
  );
};

export default School_List_Junior;
