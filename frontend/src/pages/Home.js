import { useEffect } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import PostDetails from "../components/PostDetails";
import PostForm from "../components/PostForm";
import { Card } from "@mantine/core";

const Home = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const backendUrl = "https://brightside-production.up.railway.app"
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${backendUrl}/api/posts`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: json });
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [dispatch, user]);

  return (
    <Card className="home">
      <div className="homeContainer">
        <PostForm />
        <div className="homePosts">
          {posts &&
            posts.map((post) =>
              post ? <PostDetails key={post._id} post={post} /> : null
            )}
        </div>
      </div>
    </Card>
  );
};

export default Home;
