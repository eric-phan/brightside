import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const EditPost = () => {
  const { id } = useParams(); // Retrieve the post ID from the URL params
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Find the post with the matching ID
    const post = posts.find((post) => post._id === id);

    if (post) {
      // Set the initial values of the input fields
      setTitle(post.title);
      setContent(post.content);
    }
  }, [id, posts]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!user) {
      // Redirect the user to the login page if not authenticated
      history.push("/login");
      return;
    }

    // Construct the updated post object
    const updatedPost = {
      _id: id,
      title,
      content,
    };

    // Dispatch an action to update the post in the context
    dispatch({ type: "UPDATE_POST", payload: updatedPost });

    // Redirect back to the post details page
    history.push(`/post/${id}`);
  };

  return (
    <div className="edit-post">
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
