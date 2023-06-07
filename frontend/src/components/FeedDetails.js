import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { Text, Input, Button, Card } from "@mantine/core";

// allows you to be authorized when you delete, make a post, and at homepage

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const FeedDetails = ({ post }) => {
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

  return (
    <Card className="post-details" shadow="xs">
      <Link
        to={`/post/:${post._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {/* link to get individual post */}
        <Text>
          <h4>{post.title}</h4>
        </Text>

        <div>
          {/* image */}
          {<img src={post.image} alt="Post Image" />}
        </div>
        <Text>
          <strong>Reps: </strong>
          {post.reps}
        </Text>
        <Text>
          <strong>Caption: </strong>
          {post.caption}
        </Text>
        <p>
          {formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
          })}
        </p>
      </Link>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
      {/* leave open the delete button to delete and not link to post */}
    </Card>
  );
};

export default FeedDetails;
