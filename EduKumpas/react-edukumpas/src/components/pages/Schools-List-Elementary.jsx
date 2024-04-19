import { SchoolsListCard } from "../mini-components/SchoolsListCard";

const School_List_Elementary = () => {
  // Define state to hold the fetched data
  const schoolType = "Elementary";
  return (
    <div className="flex flex-col justify-center items-center mb-20">
      <h1>{schoolType} in Batangas</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
        voluptatem ducimus libero possimus adipisci. Quis tempore aliquid magni!
        Vel unde rem magni? Quibusdam repellat aliquam, necessitatibus beatae
        ullam mollitia sint!
      </p>
      <div className="mt-20 w-[80%] flex justify-around">
        <SchoolsListCard school_type={schoolType}></SchoolsListCard>
      </div>
    </div>
  );
};

export default School_List_Elementary;
