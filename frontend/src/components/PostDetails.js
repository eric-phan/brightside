import { useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { Text, Image, Input, Button, Card, useMantineTheme } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const PostDetails = ({ post }) => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: post.title,
    reps: post.reps,
    caption: post.caption,
  });
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1];
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prevEditedPost) => ({
      ...prevEditedPost,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const { title, reps, caption } = editedPost;

    const updatedFields = {
      title,
      reps,
      caption,
    };

    try {
      const response = await fetch("/api/posts/" + post._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedFields),
      });

      const json = await response.json();
      console.log(json); // Log the response

      if (response.ok) {
        dispatch({ type: "UPDATE_POST", payload: json });
        setEditMode(false);
        setEditedPost(updatedFields);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async () => {
    if (!user) {
      return;
    }

    // if (post.user_id !== user._id) {
    //   console.log("You are not authorized to delete this post.");
    //   return;
    // }
    console.log("post.user_id:", post);
    console.log("user._id:", user);
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      shadow="xs"
      className="post-details"
      style={{
        backgroundColor: secondaryColor,
        display: "flex",
      }}
    >
      {editMode ? (
        // Edit mode form
        <form onSubmit={handleEditSubmit}>
          <div style={{ marginRight: "1rem" }}>
            <Text size="md">Title:</Text>
            <Input
              type="text"
              name="title"
              value={editedPost.title}
              onChange={handleInputChange}
            />
            {/* <input
                  type="text"
                  name="image"
                  value={editedPost.image}
                  onChange={handleInputChange}
                /> */}
            {/* <Text size="md">Reps:</Text>
                <Input
                  type="text"
                  name="reps"
                  value={editedPost.reps}
                  onChange={handleInputChange}
                /> */}
            <Text size="md">Caption:</Text>
            <Input
              type="text"
              name="caption"
              value={editedPost.caption}
              onChange={handleInputChange}
            />
            <button type="submit">Save</button>
          </div>
        </form>
      ) : (
        // Display mode
        <div style={{ display: "flex" }}>
          <div style={{ flex: "0 0 auto", marginRight: "1rem" }}>
            <Link
              to={`/post/:${post._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {/* Display the image on the left */}
              <div>
                <img
                  src={post.image}
                  alt="Post Image"
                  style={{ width: "100%" }}
                />
              </div>
            </Link>
          </div>
          <div style={{ flex: "1 1 auto" }}>
            <Link
              to={`/post/:${post._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {/* Display the caption on the right */}
              <div>
                <Text>
                  <h4>{post.title}</h4>
                </Text>
                {/* <Text>
                      <strong>Reps: </strong>
                      {post.reps}
                    </Text> */}
                <Text>
                  <strong>Caption: </strong>
                  {post.caption}
                </Text>
                <Text>
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </Text>
              </div>
            </Link>
            <span>
              <ActionIcon
                variant="outline"
                className="material-symbols-outlined "
                onClick={handleDeleteClick}
                title="Delete"
              >
                <IconTrash size="1.1rem" />
              </ActionIcon>
            </span>
            <Button style={{ marginTop: "23.4rem" }} onClick={handleEditClick}>
              Edit
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PostDetails;
