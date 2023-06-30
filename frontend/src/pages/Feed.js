import React, { useEffect, useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import FeedDetails from "../components/FeedDetails";
import PostForm from "../components/PostForm";
import { Card } from "@mantine/core";

const Feed = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const [editPostId, setEditPostId] = useState(null);
  const backendUrl = "https://brightside-production.up.railway.app";

  useEffect(() => {
    const fetchPostsFeed = async () => {
      const response = await fetch(`${backendUrl}/api/posts/feed`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: json });
      }
    };

    fetchPostsFeed();
  }, [dispatch, user]);

  const handleEditPost = (id) => {
    setEditPostId(id);
  };

  return (
    <Card className="feed">
      <div className="feedContainer">
        {editPostId ? (
          <PostForm postId={editPostId} setEditPostId={setEditPostId} />
        ) : (
          <PostForm />
        )}
        <div className="feedPosts">
          {posts &&
            posts.map((post) => (
              <FeedDetails
                key={post._id}
                post={post}
                onEditPost={handleEditPost}
              />
            ))}
        </div>
      </div>
    </Card>
  );
};

export default Feed;
