import React, { useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Card,
  Button,
  FileInput,
  TextInput,
  useMantineTheme,
} from "@mantine/core";

const PostForm = () => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  let navigate = useNavigate();

  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1];
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("reps", reps);
    formData.append("caption", caption);
    formData.append("image", image);
    console.log(formData);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        setTitle("");
        setReps("");
        setCaption("");
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_POST", payload: json });
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  return (
    <Card
      shadow="xs"
      padding="lg"
      style={{
        backgroundColor: secondaryColor,
        height: "32rem",
        marginTop: "1rem",
      }}
    >
      <form className="create" onSubmit={handleSubmit}>
        <Text size="lg">Add a New Post</Text>

        <Text size="md">Title:</Text>
        <TextInput
          className="postFormInput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={emptyFields.includes("title")}
        />

        <Text size="md">Upload Image:</Text>

        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          // trigger the image state saving fx above
          className="postFormInput"
        />

        <Text size="md">Reps:</Text>
        <TextInput
          type="number"
          className="postFormInput"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          error={emptyFields.includes("reps")}
        />

        <Text size="md">Caption:</Text>
        <TextInput
          type="text"
          className="postFormInput"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          error={emptyFields.includes("caption")}
        />

        <Button type="submit">Add post</Button>

        {error && <div className="error">{error}</div>}
      </form>
    </Card>
  );
};

export default PostForm;
