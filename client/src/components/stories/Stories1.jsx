import { useContext } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext"

const Stories = () => {

  const { currentUser } = useContext(AuthContext)

  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "Li Nikita",
      img: "https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg",
    },
    {
      id: 2,
      name: "Li Nikita",
      img: "https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg",
    },
    {
      id: 3,
      name: "Li Nikita",
      img: "https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg",
    },
    {
      id: 4,
      name: "Li Nikita",
      img: "https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        {currentUser ? <>
          <img src={currentUser.profilePic ? "/upload/" + currentUser.profilePic
            : "https://cdn-icons-png.flaticon.com/512/149/149452.png"} alt="" />
          <span>{currentUser.name}</span>
          <button>+</button>
        </> : <span>Not logged in</span>}
      </div>
      {stories.map(story => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories