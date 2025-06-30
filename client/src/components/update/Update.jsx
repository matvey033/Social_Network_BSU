import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Update = ({ setOpenUpdate, user }) => {

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  // let oldCoverPic = currentUser.coverPic;
  // let oldProfilePic = currentUser.profilePic;

  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const safeText = (text) => text == null ? "" : text;

  const [texts, setTexts] = useState({
    email: safeText(user.email),
    password: safeText(user.password),
    name: safeText(user.name),
    city: safeText(user.city),
    direction: safeText(user.direction),
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/users", user);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();

    const [uploadedCoverUrl, uploadedProfileUrl] = await Promise.all([
      cover ? upload(cover) : Promise.resolve(user.coverPic),
      profile ? upload(profile) : Promise.resolve(user.profilePic),
    ]);

    const updatedUser = {
      ...texts,
      coverPic: uploadedCoverUrl,
      profilePic: uploadedProfileUrl,
    };

    mutation.mutate(updatedUser, {
      onSuccess: () => {
        setCurrentUser({ ...currentUser, ...updatedUser });
        queryClient.invalidateQueries({ queryKey: ['user'] });
        setOpenUpdate(false);
        setCover(null);
        setProfile(null);
      }
    });
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={texts.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Direction</label>
          <input
            type="text"
            name="direction"
            value={texts.direction}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
}
export default Update;
