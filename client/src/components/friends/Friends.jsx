import "./friends.scss";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";

const Friends = () => {
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const [tab, setTab] = useState("friends"); // 'friends' | 'following' | 'followed'

  const { data: friends, isPending: loadingFriends, error: errorFriends } = useQuery({
    queryKey: ['friends', userId],
    queryFn: () =>
      makeRequest.get(`/users/${userId}/friends`).then((res) => res.data),
  });

  const { data: following, isPending: loadingFollowing, error: errorFollowing } = useQuery({
    queryKey: ['following', userId],
    queryFn: () =>
      makeRequest.get(`/users/${userId}/following`).then((res) => res.data),
  });

  const { data: followed, isPending: loadingFollowed, error: errorFollowed } = useQuery({
    queryKey: ['followed', userId],
    queryFn: () =>
      makeRequest.get(`/users/${userId}/followed`).then((res) => res.data),
  });

  const renderUsers = (users) => (
    <div className="friend-list">
      {users.length === 0 && <p>No users found.</p>}
      {users.map((user) => (
        <Link
          to={`/profile/${user.id}`}
          className="friend"
          key={user.id}
        >
          <img
            src={user.profilePic ? `/upload/${user.profilePic}` : "https://cdn-icons-png.flaticon.com/512/149/149452.png"}
            alt={user.name}
          />
          <span>{user.name}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="friends">
      <div className="tabs">
        <button className={tab === "friends" ? "active" : ""} onClick={() => setTab("friends")}>
          Friends
        </button>
        <button className={tab === "following" ? "active" : ""} onClick={() => setTab("following")}>
          Following
        </button>
        <button className={tab === "followed" ? "active" : ""} onClick={() => setTab("followed")}>
          Followed
        </button>
      </div>

      {tab === "friends" && (
        <>
          {loadingFriends ? (
            <p>Loading friends...</p>
          ) : errorFriends ? (
            <p>Failed to load friends.</p>
          ) : (
            renderUsers(friends)
          )}
        </>
      )}

      {tab === "following" && (
        <>
          {loadingFollowing ? (
            <p>Loading following...</p>
          ) : errorFollowing ? (
            <p>Failed to load following.</p>
          ) : (
            renderUsers(following)
          )}
        </>
      )}

      {tab === "followed" && (
        <>
          {loadingFollowed ? (
            <p>Loading followed users...</p>
          ) : errorFollowed ? (
            <p>Failed to load followed users.</p>
          ) : (
            renderUsers(followed)
          )}
        </>
      )}
    </div>
  );
};

export default Friends;