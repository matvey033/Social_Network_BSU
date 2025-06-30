import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            {currentUser ? <>
              <img
                src={currentUser.profilePic ? "/upload/" + currentUser.profilePic
                  : "https://cdn-icons-png.flaticon.com/512/149/149452.png"}
                alt=""
              />
              <Link
                to={`/profile/${currentUser.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>{currentUser.name}</span>
              </Link>
            </> : <span>Not logged in</span>}
          </div>
          <div className="item">
            {currentUser ? <>
              <img src={Friends} alt="" />
              <Link
                to={`/friends/${currentUser.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>Friends</span>
              </Link>
            </> : <span>Not logged in</span>}
          </div>
          <div className="item" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="В разработке">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="В разработке">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="В разработке">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="В разработке">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="В разработке">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="В разработке">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
