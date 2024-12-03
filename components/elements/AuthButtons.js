import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { fetchProfileData } from "../../util/api";

const AuthButtons = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialized to false
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchProfileData(token)
        .then((data) => {
          setProfileData(data);
          setIsLoggedIn(true);
          setUserType(localStorage.getItem("userType"));
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userType");
    Cookies.remove("token");
    setIsLoggedIn(false);
    setProfileData(null);
    setUserType(null);
    router.push("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
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
                onClick={toggleSidebar}
              >
                <FaCog className="mr-2" style={{ fontSize: "1.2rem" }} />
                My Account
              </div>
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
