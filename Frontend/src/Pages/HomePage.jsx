import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Search from "../Components/Search";
import SortRepos from "../Components/SortRepos";
import ProfileInfo from "../Components/ProfileInfo";
import Repos from "../Components/Repos";
import Spinner from "../Components/Spinner";
function HomePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState([]);
  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndRepos = useCallback(async (username) => {
    setLoading(true);
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      const userProfile = await userRes.json();
      setUserProfile(userProfile);

      const repoRes = await fetch(userProfile.repos_url);
      const repos = await repoRes.json();
      console.log(userProfile);

      setRepos(repos);
      return { userProfile, repos };
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  //Search functionality

  const handleSearchSubmit = async (e, username) => {
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);
    const { userProfile, repos } = await getUserProfileAndRepos(username);
    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
  };
  //Sort functionality
  const onSort = async (sorType) => {
    if (sorType === "recent") {
      //This is set to descending order or latest first
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    if (sorType === "stars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }

    if (sorType === "forks") {
      repos.sort((a, b) => b.forks_count - a.forks_count);
    }

    setSortType(sorType);
    setRepos([...repos]);
  };
  return (
    <div className="m-4">
      <Search handleSearchSubmit={handleSearchSubmit} />
      {repos.length > 0 && <SortRepos sortType={sortType} onSort={onSort} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
}

export default HomePage;
