import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Feed from "./pages/Feed";
import Post from "./pages/Post";
// import the login and sign up forms
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuthContext();
  const [colorScheme, setColorScheme] = useState("light");

  const toggleColorScheme = (value) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  // keyboard shortcut

  return (
    <div className="App">
      <BrowserRouter>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{
              colorScheme,
              primaryShade: 7,
              colors: {
                brand: [
                  "#F4FCE3",

                  "#E9FAC8",

                  "#D8F5A2",

                  "#C0EB75",

                  "#A9E34B",

                  "#94D82D",

                  "#82C91E",

                  "#74B816",

                  "#66A80F",

                  "#5C940D",
                ],
              },
              primaryColor: "brand",
            }}
            withColorScheme
          >
            <Navbar />
            {/* <div className="pages"> */}
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              {/* route protecting: */}
              {/* if there is a user, go to the homepage, if not go to login */}

              <Route
                path="/about"
                element={user ? <About /> : <Navigate to="/" />}
              />
              <Route
                path="/feed"
                element={user ? <Feed /> : <Navigate to="/" />}
              />
              <Route
                path="/post/:id"
                element={user ? <Post /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
                // if not user, go to login, else, go to the homepage
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
                // ibid
              />
            </Routes>
            {/* </div> */}
          </MantineProvider>
        </ColorSchemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
