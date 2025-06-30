import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import SearchList from "../searchList/SearchList";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/logout", {}, {
        withCredentials: true,
      });
      setCurrentUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const { isPending, error, data } = useQuery({
    queryKey: ['userSearch', searchQuery], // будет заново запускаться при изменении searchQuery
    queryFn: () =>
      makeRequest
        .get(`/users/searchUsers?search=${searchQuery}`)
        .then((res) => res.data),
    enabled: !!searchQuery // чтобы не вызывался при пустом значении
  });

  const searchTimeout = useRef(null);

  const handleInputBlur = () => {
    // Даем небольшой таймаут, чтобы можно было кликнуть по результатам поиска
    searchTimeout.current = setTimeout(() => {
      setSearchQuery("");
    }, 200);
  };

  const handleInputFocus = () => {
    // Если ввели фокус снова — отменяем сброс
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Media Social News</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: 'black' }}>
          <HomeOutlinedIcon />
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon style={{ opacity: 0.5, cursor: 'not-allowed' }} titleAccess="В разработке" />
        <div className="search">
          <SearchOutlinedIcon />
          <input
            onChange={(e) => {setSearchQuery(e.target.value)}}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            type="text"
            placeholder="Search..."
            value={searchQuery}
          />
          {searchQuery && <SearchList users={data} isLoading={isPending} error={error} />}
        </div>
      </div>
      <div className="right">
        <Link
          to={`/usersList`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <PersonOutlinedIcon />
        </Link>
        <EmailOutlinedIcon style={{ opacity: 0.5, cursor: 'not-allowed' }} titleAccess="В разработке" />
        <NotificationsOutlinedIcon style={{ opacity: 0.5, cursor: 'not-allowed' }} titleAccess="В разработке" />
        <div className="user" style={{ cursor: 'pointer' }}>
          {currentUser ? <>
            <img
              src={currentUser.profilePic ? "/upload/" + currentUser.profilePic
                : "https://cdn-icons-png.flaticon.com/512/149/149452.png"}
              alt=""
            />
            <span onClick={() => setMenuOpen(!menuOpen)}>{currentUser.name}</span>
            {menuOpen && <div className="userMenu">
              <Link
                to={`/profile/${currentUser.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>profile</span>
              </Link>
              <span onClick={handleLogout} className="exit">exit</span>
            </div>}
          </> : <span>Not logged in</span>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;