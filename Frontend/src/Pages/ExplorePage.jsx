import { FaJava } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";
import { SiTypescript } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";

const ExplorePage = () => {
  return (
    <div className="px-4">
      <div className="bg-glass max-w-2xl mx-auto rounded-md p-4">
        <h1 className="text-xl font-bold text-center">
          Explore Popular Repositories
        </h1>
        <div className="flex flex-wrap gap-2 my-2 justify-center">
          <IoLogoJavascript size={30} className=" cursor-pointer" />
          <SiTypescript size={30} className=" cursor-pointer" />
          <TbBrandCpp size={30} className=" cursor-pointer" />
          <FaPython size={30} className=" cursor-pointer" />
          <FaJava size={30} className=" cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
export default ExplorePage;
