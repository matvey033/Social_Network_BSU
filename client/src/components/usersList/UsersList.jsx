import "./usersList.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

const UsersList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      makeRequest.get("/users").then((res) => res.data),
  });

  if (isPending) return <div>Loading users...</div>;
  if (error) return <div>Error loading users.</div>;

  return (
    <div className="usersList">
      <h2>All Users</h2>
      <ul>
        {data.map((user) => (
          <li key={user.id} className="userItem">
            <Link to={`/profile/${user.id}`} className="userLink">
              <img
                src={
                  user.profilePic
                    ? `upload/${user.profilePic}`
                    : "https://cdn-icons-png.flaticon.com/512/149/149452.png"
                }
                alt={user.name}
              />
              <span>{user.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;