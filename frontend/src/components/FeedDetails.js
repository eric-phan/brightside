import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { Text, useMantineTheme, Card, Image, Button } from "@mantine/core";

// allows you to be authorized when you delete, make a post, and at homepage
import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const FeedDetails = ({ post }) => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1];

  const handleDeleteClick = async () => {
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
            {/* link to get individual post */}
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
      </div>
    </Card>
  );
};

export default FeedDetails;
