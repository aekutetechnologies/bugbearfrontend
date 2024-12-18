import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { fetchProfileData } from "../../util/api";

const AuthButtons = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const data = await fetchProfileData(token);
          setProfileData(data);
          setIsLoggedIn(true);
          setUserType(localStorage.getItem("userType"));
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Check auth status immediately
    checkAuthStatus();

    // Listen for storage events to sync auth state across tabs
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userType");
    Cookies.remove("token");
    
    // Trigger storage event to sync across tabs
    window.dispatchEvent(new Event('storage'));

    setIsLoggedIn(false);
    setProfileData(null);
    setUserType(null);
    router.push("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Render nothing during initial loading
  if (isLoading) {
    return null;
  }

  return (
    <>
      {isLoggedIn && userType === "3" && (
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-white font-semibold"
          >
            <button>Dashboard</button>
          </Link>
        </div>
      )}
      
      {isLoggedIn && (userType === "1" || userType === "2") && (
        <div className="flex gap-4">
          <Link
            href="/jobs-list"
            className="text-gray-700 hover:text-white font-semibold"
          >
            <button className="w-full">Search Jobs</button>
          </Link>

          <Link
            href="/applied-jobs"
            className="text-gray-700 hover:text-white font-semibold"
          >
            <button className="w-full">My Jobs</button>
          </Link>

          <Link
            href="/saved-jobs"
            className="text-gray-700 hover:text-white font-semibold"
          >
            <button className="w-full">Saved Jobs</button>
          </Link>
        </div>
      )}
      
      {isLoggedIn ? (
        <div className="relative">
          <button
            className="flex items-center gap-2 pr-10"
            onClick={toggleDropdown}
          >
            <img
              src={
                profileData?.profile_pic_url ||
                "/assets/imgs/default-profile-pic.png"
              }
              alt="Profile"
              width={45}
              className="rounded-full"
            />
            <span>
              <span>Hi, </span>
              {profileData?.first_name || "User"}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg z-10">
              <Link
                href={
                  userType === "1"
                    ? "/candidate-profile"
                    : userType === "2"
                    ? "/organization-profile"
                    : "/recruiter-profile"
                }
              >
                <div className="dropdown-item flex items-center p-2 cursor-pointer">
                  <FaUserCircle
                    className="mr-2"
                    style={{ fontSize: "1.2rem" }}
                  />
                  View Profile
                </div>
              </Link>
              
              <div
                className="dropdown-item flex items-center p-2 cursor-pointer"
                onClick={handleLogout}
              >
                <FaSignOutAlt
                  className="mr-2"
                  style={{ fontSize: "1.2rem" }}
                />
                Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center pr-10">
          <Link href="/choose-role" className="text-link-bd-btom hover-up">
            Register
          </Link>
          <Link
            href="/login"
            className="btn btn-default btn-shadow ml-40 hover-up"
          >
            Sign in
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthButtons;