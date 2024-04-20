import React from "react";
import imageTest from "../../assets/test.jpg";
import style from "../css/AboutUs.module.css";
import angelo from "../../assets/image.jpg";
import { Footer } from "../Footer";
import { CompanyCard } from "../mini-components/CompanyCard";
export const AboutUs = () => {
  return (
    <body className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row md:justify-center text-justify items-center max-w-screen-lg w-[100%] md:w-[80%] xl:w-[60%] mt-20">
        <div className="w-[92%]">
          <h1 className="text-center text-4xl text-blue-800 font-semibold">
            Our Mission
          </h1>
          <p className="p-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
            sapiente ratione unde sed dolores quam totam repellendus, assumenda
            aperiam quidem quod non cum, quaerat illo recusandae? Sed quia
            blanditiis cum! Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Natus sapiente ratione unde sed dolores quam totam
            repellendus, assumenda aperiam quidem quod non cum, quaerat illo
            recusandae? Sed quia blanditiis cum!
          </p>
        </div>
        <img
          src={imageTest}
          alt=""
          className="object-scale-down h-[50%] w-[50%] rounded-md"
        />
      </div>

      <div className="flex flex-col md:flex-row md:justify-center text-justify items-center max-w-screen-lg w-[100%] md:w-[80%] xl:w-[60%] mt-20">
        <img
          src={imageTest}
          alt=""
          className="object-scale-down h-[50%] w-[50%] rounded-md"
        />
        <div className="w-[92%]">
          <h1 className="text-center mt-5 md:mt-0 text-4xl text-blue-800 font-semibold">
            Our People
          </h1>
          <p className="p-5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            aliquid eos consequatur? Tenetur ea labore in ipsam, nam quae?
            Aliquid cum cupiditate et qui assumenda veritatis repellendus quo a
            accusantium! Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Nostrum aliquid eos consequatur? Tenetur ea labore in ipsam,
            nam quae? Aliquid cum cupiditate et qui assumenda veritatis
            repellendus quo a accusantium!
          </p>
        </div>
      </div>

      <div className=" w-[80%] sm:w-[50%] lg:w-[25%] mt-20">
        <div className="text-center ">
          <h1 className="text-4xl text-blue-800 font-semibold">Our Team</h1>
          <p className="text-justify">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
            natus veritatis ratione ad, ipsa delectus doloribus sequi! Nostrum
            voluptates, delectus et harum labore itaque laudantium ut fugiat
            voluptate aut dicta?
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-10 w-[80%]">
        <div className=" flex flex-col md:flex-row justify-around items-center">
          <CompanyCard
            employeeName="Ray Allen Manalo"
            employeeDescription="He is an aspiring fullstack developer. He is an aspiring fullstack developer. He is an aspiring fullstack developer."
            employeePosition="Chief Executive Officer"
            imageUrl={angelo}
          ></CompanyCard>
          <CompanyCard
            employeeName="Juvylyn Hernandez"
            employeeDescription="He is an aspiring fullstack developer. He is an aspiring fullstack developer. He is an aspiring fullstack developer."
            employeePosition="Chief Marketing Officer"
            imageUrl={angelo}
          ></CompanyCard>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <CompanyCard
            employeeName="Benett Mission"
            employeeDescription="He is an aspiring fullstack developer. He is an aspiring fullstack developer. He is an aspiring fullstack developer."
            employeePosition="Chief Financial Officer"
            imageUrl={angelo}
          ></CompanyCard>
          <CompanyCard
            employeeName="Angelo Burog"
            employeeDescription="He is an aspiring fullstack developer. He is an aspiring fullstack developer. He is an aspiring fullstack developer."
            employeePosition="Chief Technical Officer"
            imageUrl={angelo}
          ></CompanyCard>
          <CompanyCard
            employeeName="Renz Lacsamana"
            employeeDescription="He is an aspiring fullstack developer. He is an aspiring fullstack developer. He is an aspiring fullstack developer."
            employeePosition="Chief Information Officer"
            imageUrl={angelo}
          ></CompanyCard>
        </div>
      </div>

      <div className="flex flex-col md:flex-col w-[80%] m-20 sm:w-[50%] lg:w-[25%] items-center ">
        <div className=" flex flex-col text-center items-center">
          <h1 className="text-4xl text-blue-800 font-semibold">Get in Touch</h1>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            pariatur deserunt illo, velit ipsa molestias vitae ducimus eveniet
            omnis, repellat quas ipsum dolores maxime totam iusto perspiciatis
            aperiam ad quod!
          </p>
        </div>
        <button className=" mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-8 rounded transition duration-300 ease-in-out focus:outline-none">
          Mail Us
        </button>
      </div>
      <Footer></Footer>
    </body>
  );
};

export default AboutUs;
