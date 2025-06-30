import { Link } from "react-router-dom";
import "./searchList.scss";

const SearchList = ({ users, isLoading, error }) => {
  if (isLoading) return <div className="searchList">Загрузка...</div>;
  if (error) return <div className="searchList">Ошибка при загрузке</div>;
  if (!users?.length) return <div className="searchList">Пользователи не найдены</div>;

  return (
    <div className="searchList">
      {users.slice(0, 7).map((user) => (
        <div className="userItem" key={user.id}>
          <Link to={`/profile/${user.id}`} className="searchUserLink">
            <img
              src={user.profilePic ? `/upload/${user.profilePic}` : "https://cdn-icons-png.flaticon.com/512/149/149452.png"}
              alt={user.name}
            />
            <span>{user.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SearchList;