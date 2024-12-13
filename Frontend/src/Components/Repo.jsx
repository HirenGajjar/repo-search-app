import { FaCodeBranch, FaCopy, FaRegStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";

import { formatDate } from "../utils/functions.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Repo = ({ repo }) => {
  const formattedDate = formatDate(repo.created_at);
  const [languages, setLanguages] = useState([]);

  // Fetch the languages of the repository
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(repo.languages_url);
        const languagesData = await response.json();
        setLanguages(Object.keys(languagesData)); // Get an array of language names
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, [repo.languages_url]);

  // Onclick clone
  const handleCloneClick = async (repo) => {
    try {
      await navigator.clipboard.writeText(repo.clone_url);
      toast.success("URL Copied!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <li className="mb-10 ms-7">
      <span
        className="absolute flex items-center justify-center w-6 h-6 bg-blue-100
        rounded-full -start-3 ring-8 ring-white"
      >
        <FaCodeBranch className="w-5 h-5 text-blue-800" />
      </span>
      <div className="flex gap-2 items-center flex-wrap">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          {repo.name}
        </a>
        <span
          className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5
          py-0.5 rounded-full flex items-center gap-1"
        >
          <FaRegStar /> {repo.stargazers_count}
        </span>
        <span
          className="bg-purple-100 text-purple-800 text-xs font-medium
          px-2.5 py-0.5 rounded-full flex items-center gap-1"
        >
          <FaCodeFork /> {repo.fork_count}
        </span>
        <span
          onClick={() => handleCloneClick(repo)}
          className="cursor-pointer bg-green-100 text-green-800 text-xs
          font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1"
        >
          <FaCopy /> Clone
        </span>
      </div>

      <time
        className="block my-1 text-xs font-normal leading-none
        text-gray-400"
      >
        Released on {formattedDate}
      </time>
      <p className="mb-4 text-base font-normal text-gray-500">
        {repo.description
          ? repo.description.slice(0, 200)
          : "No Description Available."}
      </p>
      {/* Displaying languages used in the repo */}
      <div className="mb-4 text-base font-normal text-gray-500">
        {languages.length > 0 ? (
          <>
            Languages:{" "}
            {languages.map((lang, index) => (
              <span key={index} className="text-green-500  mr-1">
                {lang},
              </span>
            ))}
          </>
        ) : (
          "No languages specified"
        )}
      </div>
    </li>
  );
};

export default Repo;
