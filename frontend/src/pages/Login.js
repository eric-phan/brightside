import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { TextInput, Button, Card, Paper, BackgroundImage } from "@mantine/core";
import logo from "../assets/aboutBrightside.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <Card className="loginCard">
      <BackgroundImage className="loginWrapper" src={logo}>
        <Paper shadow="xl" className="loginContainer">
          <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <label>Email address:</label>
            <TextInput
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <label>Password:</label>
            <TextInput
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <Button disabled={isLoading} type="submit">
              Log in
            </Button>
            {error && <div className="error">{error}</div>}
          </form>
        </Paper>
      </BackgroundImage>
    </Card>
  );
};

export default Login;
