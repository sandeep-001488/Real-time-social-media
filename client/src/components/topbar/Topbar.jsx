import "./topbar.scss";
import { CiSearch } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

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
            placeholder="search for friends,posts.."
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
            {/* done extra on my own  */}
            <Link to="/messenger" style={{ textDecoration: "none" }}>
              
              <IoChatbubbleOutline />
            </Link>
            {/* <IoChatbubbleOutline  /> */}
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <MdNotificationsActive />
            <span className="topbarIconBadge">3</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "nocover.jpg"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
