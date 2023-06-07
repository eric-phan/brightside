import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Card, Text } from "@mantine/core";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

const Navbar = () => {
  const { logout } = useLogout();
  // imported logout function
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <header style={{ borderBottom: "1px solid #F1F3F5" }}>
      <Card shadow="sm" size="xl" className="headerContainer">
        <Link to="/">
          <Text size="xl">Brightside</Text>
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
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </ActionIcon>
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </Card>
    </header>
  );
};

export default Navbar;

// const Navbar = () => {
//   const { logout } = useLogout();
//   // imported logout function
//   const { user } = useAuthContext();

//   const handleClick = () => {
//     logout();
//   };

//   return (
//     <header>
//       <div className="container">
//         <Link to="/">
//           <h1>Brightside</h1>
//         </Link>
//         <nav>
//           {/* if user is logged in show this */}
//           {user && (
//             <div>
//               <span>{user.email}</span>
//               <Link to="/">Home</Link>
//               <Link to="/about">About</Link>
//               <Link to="/feed">Feed</Link>
//               <button onClick={handleClick}>Log out</button>
//             </div>
//           )}
//           {/* if not logged in show this */}
//           {!user && (
//             <div>
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Signup</Link>
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
