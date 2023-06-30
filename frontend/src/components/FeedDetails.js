import { useEffect, useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { Text, useMantineTheme, Card, Image } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const FeedDetails = ({ post }) => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1];
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const verifyResponse = await fetch("/api/user/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: user.token,
          }),
        });

        if (verifyResponse.ok) {
          const { userId } = await verifyResponse.json();
          setIsAuthorized(post.user_id === userId);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error(error);
        setIsAuthorized(false);
      }
    };

    verifyUser();
  }, [user.token, post.user_id]);

  const handleDeleteClick = async () => {
    if (!user || !isAuthorized) {
      return;
    }

    try {
      const deleteResponse = await fetch("/api/posts/" + post._id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (deleteResponse.ok) {
        console.log("Post deleted successfully.");

        // Remove the deleted post from the state
        dispatch({ type: "DELETE_POST", payload: post._id });
      } else {
        const errorResponse = await deleteResponse.json();
        console.log("Failed to delete post.");
        console.log("Error:", errorResponse.error);
        // Handle the error case as needed
      }
    } catch (error) {
      console.error(error);
      // Handle the error case as needed
    }
  };

  return (
    <Card
      className="post-details"
      shadow="xs"
      style={{
        backgroundColor: secondaryColor,
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "1rem",
          }}
        >
          <Link
            to={`/post/:${post._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ flex: 1 }}>
              <Text>
                <h4 style={{ maxWidth: "100%", overflowWrap: "break-word" }}>
                  {post.title}
                </h4>
              </Text>
              <Image src={post.image} alt="PostImage" />
            </div>

            <Text>
              <strong>Caption: </strong>
              <span
                style={{
                  display: "inline-block",
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                }}
              >
                {post.caption}
              </span>
            </Text>
            <Text>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </Text>
          </Link>
        </div>
        {isAuthorized && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ActionIcon
              variant="outline"
              className="material-symbols-outlined"
              onClick={handleDeleteClick}
              title="Delete"
            >
              <IconTrash size="1.1rem" />
            </ActionIcon>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FeedDetails;
