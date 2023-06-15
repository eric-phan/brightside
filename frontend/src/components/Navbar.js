import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Card, Text } from "@mantine/core";
import {
  ActionIcon,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

const Navbar = () => {
  const { logout } = useLogout();
  // imported logout function
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1];
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <header style={{ borderBottom: "1px solid #F1F3F5" }}>
      <Card
        shadow="sm"
        // style={{
        //   backgroundColor: secondaryColor,
        // }}
        size="xl"
        className="headerContainer"
      >
        {/* <Link to="/">
          <Text size="xl">Brightside</Text>
        </Link> */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <Text size="xl" weight={700} color="green" tt="uppercase">
            Brightside
          </Text>
        </Link>

        <nav>
          {user && (
            <div className="navContainer">
              <Text>{user.email}</Text>
              <Link to="/" color="blue">
                Home
              </Link>
              <Link to="/about">About</Link>
              <Link to="/feed">Feed</Link>
              <Button onClick={handleClick}>Log out</Button>
            </div>
          )}
          <ActionIcon
            variant="outline"
            color={dark ? "green" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </ActionIcon>
          {!user && (
            <div>
              <Link to="/login" size="sm">
                Login
              </Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </Card>
    </header>
  );
};

export default Navbar;
