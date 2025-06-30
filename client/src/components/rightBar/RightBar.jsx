import "./rightBar.scss";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container" title="В разработке">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg"
                alt=""
              />
              <span>Nikita</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg"
                alt=""
              />
              <span>Mark</span>
            </div>
            <div className="buttons">
              <button >follow</button>
              <button >dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg"
                alt=""
              />
              <p>
                <span>Li Nikita</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg"
                alt=""
              />
              <p>
                <span>Li Nikita</span> changed their cover picture
              </p>
            </div>
            <span>5 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg"
                alt=""
              />
              <p>
                <span>Li Nikita</span> changed their cover picture
              </p>
            </div>
            <span>7 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg"
                alt=""
              />
              <p>
                <span>Li Nikita</span> changed their cover picture
              </p>
            </div>
            <span>10 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg"
                alt=""
              />
              <div className="online" />
              <span>Li Nikita</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg"
                alt=""
              />
              <div className="online" />
              <span>Li Nikita</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg"
                alt=""
              />
              <div className="online" />
              <span>Li Nikita</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://www.lostdogrescue.org/wp-content/uploads/2020/09/ava210.jpeg"
                alt=""
              />
              <div className="online" />
              <span>Li Nikita</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
