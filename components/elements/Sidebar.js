import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaCog, FaPowerOff, FaClipboard, FaBell, FaFileAlt, FaRegLightbulb } from 'react-icons/fa';
import { IoMdSettings, IoMdDownload } from 'react-icons/io';

const Sidebar = ({ closeSidebar }) => {
  const [profilePic, setProfilePic] = useState('/default-profile-pic.jpg'); // default profile picture
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    // Fetch data from localStorage
    const storedProfilePic = localStorage.getItem('profile_pic_url');
    const storedFirstName = localStorage.getItem('first_name');
    const storedLastName = localStorage.getItem('last_name');

    // Set the state with the fetched values
    if (storedProfilePic) setProfilePic(storedProfilePic);
    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="profile-info">
          <img src={profilePic} alt="Profile Pic" className="profile-pic" />
          <h4>{firstName} {lastName}</h4>
          <p>Improve Profile Score</p>
          <div className="profile-score">
            <div className="progress-bar">
              <div className="progress" style={{ width: '90%' }}></div>
            </div>
            <span>90%</span>
          </div>
        </div>
        <button className="close-btn" onClick={closeSidebar}>X</button>
      </div>

      <div className="sidebar-body">
        <ul className="sidebar-menu">
          <li>
            <FaRegLightbulb />
            <a href="#">Auto Apply</a> <span className="new-label">New</span>
          </li>
          <li>
            <FaClipboard />
            <a href="#">Profile Performance</a>
          </li>
          <li>
            <FaBell />
            <a href="#">My Assessments</a>
          </li>
          <li>
            <FaFileAlt />
            <a href="#">My Subscriptions</a>
          </li>
          <li>
            <IoMdSettings />
            <a href="#">Settings</a>
          </li>
          <li>
            <FaRegLightbulb />
            <a href="#">Badminton World Federation</a> <span className="new-label">New</span>
          </li>
          <li>
            <FaClipboard />
            <a href="#">Feedback</a>
          </li>
          <li>
            <IoMdDownload />
            <a href="#">Download App</a>
          </li>
          <li>
            <FaPowerOff />
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
