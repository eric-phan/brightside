// import React, { useState } from "react";
// import { usePostsContext } from "../hooks/usePostsContext";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { useNavigate } from "react-router-dom";

// const PostForm = () => {
//   const { dispatch } = usePostsContext();
//   const { user } = useAuthContext();
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState(null);
//   const [caption, setCaption] = useState("");
//   const [reps, setReps] = useState("");
//   const [error, setError] = useState(null);
//   const [emptyFields, setEmptyFields] = useState([]);
//   let navigate = useNavigate();

//   const handleFileInputChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };
//   // By using e.target.files[0], you're accessing the first file from the files array, assuming it's a single file upload.
//   // Storing it in the file variable allows you to use it later when submitting the form or performing other operations.

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       setError("You must be logged in");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("reps", reps);
//     formData.append("caption", caption);
//     formData.append("image", image); // image is the file object, it is being appended to formdata here

//     try {
//       const response = await fetch("/api/posts", {
//         method: "POST",
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       });

//       const json = await response.json();

//       if (!response.ok) {
//         setError(json.error);
//         setEmptyFields(json.emptyFields);
//       } else {
//         setTitle("");
//         setReps("");
//         setCaption("");
//         setError(null);
//         setEmptyFields([]);
//         dispatch({ type: "CREATE_POST", payload: json });
//         navigate("/");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong!");
//     }
//   };

//   return (
//     <form className="create" onSubmit={handleSubmit}>
//       <h3>Add a New Post</h3>

//       <label>Title:</label>
//       <input
//         type="text"
//         onChange={(e) => setTitle(e.target.value)}
//         value={title}
//         className={emptyFields.includes("title") ? "error" : ""}
//       />

//       <label>Upload Image:</label>
//       <input
//         id="fileInput"
//         type="file"
//         name="image"
//         onChange={handleFileInputChange}
//         // trigger the image state saving fx above
//         className="form-input"
//       />

//       <label>Reps:</label>
//       <input
//         type="number"
//         onChange={(e) => setReps(e.target.value)}
//         value={reps}
//         className={emptyFields.includes("reps") ? "error" : ""}
//       />

//       <label>Caption:</label>
//       <input
//         type="text"
//         onChange={(e) => setCaption(e.target.value)}
//         value={caption}
//         className={emptyFields.includes("caption") ? "error" : ""}
//       />

//       <button>Add post</button>

//       {error && <div className="error">{error}</div>}
//     </form>
//   );
// };

// export default PostForm;

// // mantine changes
// 












import React, { useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { Text, Card, Button, TextInput } from "@mantine/core";

const PostForm = () => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  let navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  // By using e.target.files[0], you're accessing the first file from the files array, assuming it's a single file upload.
  // Storing it in the file variable allows you to use it later when submitting the form or performing other operations.

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
    formData.append("image", image); // image is the file object, it is being appended to formdata here

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
    <Card shadow="xs" padding="xl">
      <form className="create" onSubmit={handleSubmit}>
        <Text size="lg">Add a New Post</Text>

        <Text size="md">Title:</Text>
        <TextInput
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
          className="form-input"
        />

        <Text size="md">Reps:</Text>
        <TextInput
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          error={emptyFields.includes("reps")}
        />

        <Text size="md">Caption:</Text>
        <TextInput
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          error={emptyFields.includes("caption")}
        />

        <Button>Add post</Button>

        {error && <div className="error">{error}</div>}
      </form>
    </Card>
  );
};
export default PostForm;
