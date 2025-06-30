import "./profile.scss";
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from "@mui/icons-material/Instagram";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import SchoolIcon from '@mui/icons-material/School';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

import { Icon36LogoVk } from '@vkontakte/icons';

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isPending, error, data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      })
  });

  const { isPending: rIsPending, data: relationshipData } = useQuery({
    queryKey: ['relationship'],
    queryFn: () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  });

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['relationship'] })
    },
  })

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id))
  }

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="profile">
      <div className="images">
        <img
          src={data.coverPic ? "/upload/" + data.coverPic : "https://www.proactivechannel.com/Files/BrandImages/Default.jpg"}
          alt=""
          className="cover"
        />
        <img
          src={data.profilePic ? "/upload/" + data.profilePic : "https://cdn-icons-png.flaticon.com/512/149/149452.png"}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <TelegramIcon fontSize="large" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
              <Icon36LogoVk />
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data.city}</span>
              </div>
              <div className="item">
                <SchoolIcon />
                <span>{data.direction}</span>
              </div>
            </div>
            {currentUser ? <>
            {rIsPending ? "Loading" : userId === currentUser.id
              ? <button onClick={() => setOpenUpdate(true)}>update</button>
              : <button onClick={handleFollow}>{relationshipData.includes(currentUser.id)
                ? "Following"
                : "Follow"}</button>}
            </> : <span>Not logged in</span>}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts userId={userId} />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
