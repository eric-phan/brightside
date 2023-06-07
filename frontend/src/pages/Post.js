import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Card, Container } from "@mantine/core";

// components
import PostDetails from "../components/PostDetails";

const Post = () => {
  const { id } = useParams();
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${id.substring(1)}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POST", payload: json });
      }
    };

    if (user) {
      fetchPost();
    }
  }, [dispatch, id, user]);

  // Find the matching post based on the id
  const post = posts.find((post) => post._id === id.substring(1));

  return (
    <Card>
      <Container>
      {/* <div className="Post"> */}
      {post && <PostDetails post={post} />}
      {/* </div> */}
      </Container>
    </Card>
  );
};

export default Post;
