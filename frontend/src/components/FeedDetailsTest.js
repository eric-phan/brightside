import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// allows you to be authorized when you delete, make a post, and at homepage

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const FeedDetailsTest = ({ post }) => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/posts/" + post._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };
  // grab posts from homepage (API call)
  const getPosts = async () => {
    const response = await fetch("http://localhost:4000/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${user.token}` },
      //   authorizes the action
    });
    const data = await response.json();
    dispatch({ type: "SET_POST", payload: data });
  };
  useEffect(() => {
    {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //   em

  return (
    <div className="post-details">
      <Link to={`/post/:${post._id}`}>
        {/* link to get individual post */}
        <h4>{post.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {post.image}
        </p>
        <p>
          <strong>Reps: </strong>
          {post.reps}
        </p>
        <p>
          <strong>Caption: </strong>
          {post.caption}
        </p>
        <p>
          {formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
          })}
        </p>
      </Link>
      {/* <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span> */}
      {/* leave open the delete button to delete and not link to post */}
    </div>
  );
};

export default FeedDetailsTest;
