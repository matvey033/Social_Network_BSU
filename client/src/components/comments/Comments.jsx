import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import moment from "moment";
import { Link } from "react-router-dom";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isPending, error, data } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => {
        return res.data;
      })
  });

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })

  const handleClick = async e => {
    e.preventDefault()
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        {currentUser ? <>
          <img src={currentUser.profilePic ? "/upload/" + currentUser.profilePic : "https://cdn-icons-png.flaticon.com/512/149/149452.png"} alt="" />
          <input type="text" placeholder="write a comment"
            value={desc}
            onChange={e => setDesc(e.target.value)} />
          <button onClick={handleClick}>Send</button>
        </> : <span>Not logged in</span>}
      </div>
      {isPending ? "loading" : data.map((comment) => (
        <div className="comment" key={comment.id}>
          <Link
            to={`/profile/${comment.userId}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src={comment.profilePic ? "/upload/" + comment.profilePic : "https://cdn-icons-png.flaticon.com/512/149/149452.png"} alt="" />
          </Link>
          <div className="info">
            <Link
              to={`/profile/${comment.userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span>{comment.name}</span>
            </Link>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
