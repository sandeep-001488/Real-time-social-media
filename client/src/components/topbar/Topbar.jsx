import "./topbar.scss";
import { CiSearch } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext); // Assume you have a logout function
  const [popoverVisible, setPopoverVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="topbar">
      <div className="left-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social Media</span>
        </Link>
      </div>
      <div className="center-container">
        <div className="searchBar">
          <CiSearch className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="search for friends, posts..."
          />
        </div>
      </div>
      <div className="right-container">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <IoPersonSharp />
            <span className="topbarIconBadge">4</span>
          </div>
          <div className="topbarIconItem">
            <Link to="/messenger" style={{ textDecoration: "none" }}>
              <IoChatbubbleOutline />
            </Link>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <MdNotificationsActive />
            <span className="topbarIconBadge">3</span>
          </div>
        </div>
        <div className="profile-container">
          {/* <Link to={`/profile/${user.username}`}> */}
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "nocover.jpg"
            }
            alt=""
            className="topbarImg"
            onClick={() => setPopoverVisible(!popoverVisible)} // Toggle popover on click
          />
          {/* </Link> */}
          {popoverVisible && (
            <div className="popover">
              <div
                className="popover-option"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/profile/${user.username}`); // Navigate to profile
                  setPopoverVisible(false);
                }}
              >
                Profile
              </div>
              <div
                className="popover-option"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
