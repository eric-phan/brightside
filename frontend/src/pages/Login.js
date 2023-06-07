import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { TextInput, Button, Card, Paper } from "@mantine/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <Card>
      <Paper shadow="xl" className="loginPaper">
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
    </Card>
  );
};

export default Login;
